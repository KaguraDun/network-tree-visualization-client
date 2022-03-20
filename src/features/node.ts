/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import NodeInfoType from '@/models/NodeInfoType';
import NodeApi from '@/services/NodeApi';

const api = new NodeApi();

export const getRootNode = createAsyncThunk(
  'node/getRootNode',
  async (_, { rejectWithValue }) => {
    const response = await api.getRootNode();

    if (response?.status === 404) {
      return rejectWithValue(response?.message);
    }

    return response;
  }
);

export const getChildNodes = createAsyncThunk(
  'node/getChildNodes',
  api.getChildNodes
);

export const addNode = createAsyncThunk(
  'node/addNode',
  async (properties, { dispatch, rejectWithValue }) => {
    const response = await api.addNode(properties);

    if (response?.length > 0) {
      const { id } = response[0];

      dispatch(selectNode({ id }));
      return response;
    }

    return rejectWithValue({ message: "Node don't added" });
  }
);

export const removeNodeFromServer = createAsyncThunk(
  'node/removeNodeFromServer',
  async ({ id }, { dispatch }) => {
    const response = await api.removeNode({ id });

    if (response?.status === 200) {
      dispatch(removeChildNodes({ parentID: id }));
      dispatch(removeNode({ id }));
    }
  }
);

export const updateNodeDataOnServer = createAsyncThunk(
  'node/updateNodeData',
  async ({ id, nodeData }, { dispatch, rejectWithValue }) => {
    const response = await api.updateNodeData({ id, nodeData });

    if (response?.status === 201) {
      dispatch(updateNodeData({ id, nodeData }));
      return response;
    }

    return rejectWithValue({ message: "Node don't updated" });
  }
);

const nodeSlice = createSlice({
  name: 'node',
  initialState: {
    selectedNodeID: undefined,
    nodeInfoType: NodeInfoType.edit,
    nodeList: {},
  },
  reducers: {
    removeChildNodes: (state, action) => {
      const { parentID: clickedID } = action.payload;
      const nodesToDelete = [];

      const childrenSearch = ({ id, children } = {}) => {
        if (id !== clickedID) nodesToDelete.push(id);

        if (children.length > 0) {
          children.forEach((id) => {
            childrenSearch(state.nodeList[id]);
          });
        }
      };

      childrenSearch(state.nodeList[clickedID]);

      nodesToDelete.forEach((id) => {
        const index = state.nodeList[clickedID].children.indexOf(id);
        if (index !== -1) {
          state.nodeList[clickedID].children.splice(index, 1);
        }

        delete state.nodeList[id];
      });
    },
    removeNode: (state, action) => {
      const { id } = action.payload;
      const { parentID } = state.nodeList[id];

      if (parentID !== null) {
        const index = state.nodeList[parentID].children.indexOf(id);
        if (index !== -1) {
          state.nodeList[parentID].children.splice(index, 1);
        }
      }

      delete state.nodeList[id];
    },
    selectNode: (state, action) => {
      const { id } = action.payload;

      state.selectedNodeID = id;
    },
    changeNodeInfoType: (state, action) => {
      const type: NodeInfoType = action.payload;
      state.nodeInfoType = type;
    },
    updateNodeData: (state, action) => {
      const { id, nodeData } = action.payload;
      state.nodeList[id] = { ...state.nodeList[id], ...nodeData };
    },
  },
  extraReducers: {
    [getRootNode.fulfilled]: (state, action) => {
      const [newNode] = action.payload;
      const { id, name, parent_id: parentID, port, ip } = newNode;

      state.nodeList[id] = { id, name, parentID, port, ip, children: [] };
    },
    [getRootNode.rejected]: (state, action) => {
      const message = action.payload;
      console.log(message);
    },
    [addNode.fulfilled]: (state, action) => {
      const [newNode] = action.payload;
      const { id, name, parent_id: parentID, port, ip } = newNode;

      state.nodeList[id] = { id, name, parentID, port, ip, children: [] };

      if (parentID === null) return;

      const parentChildren = state.nodeList[parentID].children;
      const isElementExist = parentChildren.indexOf(id) !== -1;
      const shouldUpdateChildren = parentID && !isElementExist;

      if (shouldUpdateChildren) {
        state.nodeList[parentID].children.push(id);
      }
    },
    [getChildNodes.fulfilled]: (state, action) => {
      const newNodes = action.payload;

      newNodes.forEach((newNode) => {
        const { id, name, parent_id: parentID, port, ip } = newNode;

        state.nodeList[id] = { id, name, parentID, port, ip, children: [] };

        const parentChildren = state.nodeList[parentID].children;
        const isElementExist = parentChildren.indexOf(id) !== -1;
        const shouldUpdateChildren = parentID && !isElementExist;

        if (shouldUpdateChildren) {
          state.nodeList[parentID].children.push(id);
        }
      });
    },
    [updateNodeDataOnServer.fulfilled]: (state, action) => {
      console.log('updated');
    },
  },
});

export const {
  removeChildNodes,
  removeNode,
  selectNode,
  updateNodeData,
  changeNodeInfoType,
} = nodeSlice.actions;

export default nodeSlice.reducer;

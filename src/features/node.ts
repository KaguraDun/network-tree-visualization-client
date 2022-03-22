/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  NodeData,
  NodeElement,
  NodeElementFromServer,
  NodeList,
  UpdateNodeData,
} from '@/models/Node';
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
  async (nodeData: NodeData, { dispatch, rejectWithValue }) => {
    const response = await api.addNode(nodeData);

    if (response?.length > 0) {
      const { id } = response[0];

      dispatch(selectNode(id));
      return response;
    }

    return rejectWithValue({ message: "Node don't added" });
  }
);

export const removeNodeFromServer = createAsyncThunk(
  'node/removeNodeFromServer',
  async (id: NodeElement['id'], { dispatch }) => {
    const response = await api.removeNode(id);

    if (response?.status === 200) {
      dispatch(removeChildNodes(id));
      dispatch(removeNode(id));
    }
  }
);

export const updateNodeDataOnServer = createAsyncThunk(
  'node/updateNodeData',
  async ({ id, nodeData }: UpdateNodeData, { dispatch, rejectWithValue }) => {
    const response = await api.updateNodeData({ id, nodeData });

    if (response?.status === 201) {
      dispatch(updateNodeData({ id, nodeData }));
      return response;
    }

    return rejectWithValue({ message: "Node don't updated" });
  }
);

interface NodeState {
  selectedNodeID: number | null;
  nodeInfoType: NodeInfoType;
  nodeList: NodeList;
}

const initialState: NodeState = {
  selectedNodeID: null,
  nodeInfoType: NodeInfoType.edit,
  nodeList: {},
};

const nodeSlice = createSlice({
  name: 'node',
  initialState,
  reducers: {
    removeChildNodes: (state, action: PayloadAction<NodeElement['id']>) => {
      const clickedID = action.payload;
      const nodesToDelete: number[] = [];

      const childrenSearch = ({ id, childrenID }: NodeElement) => {
        if (id !== clickedID) nodesToDelete.push(id);

        if (childrenID.length > 0) {
          childrenID.forEach((childrenId: NodeElement['id']) => {
            childrenSearch(state.nodeList[childrenId]);
          });
        }
      };

      childrenSearch(state.nodeList[clickedID]);

      nodesToDelete.forEach((id) => {
        const index = state.nodeList[clickedID].childrenID.indexOf(id);
        if (index !== -1) {
          state.nodeList[clickedID].childrenID.splice(index, 1);
        }

        delete state.nodeList[id];
      });
    },
    removeNode: (state, action: PayloadAction<NodeElement['id']>) => {
      const id = action.payload;
      const { parentID } = state.nodeList[id];

      if (parentID !== null) {
        const index = state.nodeList[parentID].childrenID.indexOf(id);

        if (index !== -1) {
          state.nodeList[parentID].childrenID.splice(index, 1);
        }

        if (state.nodeList[parentID].childrenID.length === 0) {
          state.nodeList[parentID].hasChildren = false;
        }
      }

      state.selectedNodeID = null;

      delete state.nodeList[id];
    },
    selectNode: (state, action: PayloadAction<NodeElement['id'] | null>) => {
      const id = action.payload;

      state.selectedNodeID = id;
    },
    changeNodeInfoType: (state, action: PayloadAction<NodeInfoType>) => {
      const type = action.payload;
      state.nodeInfoType = type;
    },
    updateNodeData: (state, action: PayloadAction<UpdateNodeData>) => {
      const { id, nodeData } = action.payload;

      state.nodeList[id] = { ...state.nodeList[id], ...nodeData };
    },
    toggleNodeIsOpen: (state, action: PayloadAction<NodeElement['id']>) => {
      const id = action.payload;
      state.nodeList[id].isOpen = !state.nodeList[id].isOpen;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getRootNode.fulfilled,
      (state, action: PayloadAction<NodeElementFromServer[]>) => {
        const [newNode] = action.payload;
        const {
          id,
          name,
          parent_id: parentID,
          port,
          ip,
          hasChildren,
        } = newNode;

        state.nodeList[id] = {
          id,
          name,
          parentID,
          port,
          ip,
          hasChildren,
          childrenID: [],
          isOpen: false,
        };
      }
    );

    builder.addCase(
      addNode.fulfilled,
      (state, action: PayloadAction<NodeElementFromServer[]>) => {
        const [newNode] = action.payload;
        const {
          id,
          name,
          parent_id: parentID,
          port,
          ip,
          hasChildren,
        } = newNode;

        state.nodeList[id] = {
          id,
          name,
          parentID,
          port,
          ip,
          hasChildren,
          childrenID: [],
          isOpen: false,
        };

        if (parentID === null) return;

        const parentChildrenID = state.nodeList[parentID].childrenID;
        const isElementExist = parentChildrenID.indexOf(id) !== -1;
        const shouldUpdateChildren = parentID && !isElementExist;

        if (shouldUpdateChildren) {
          state.nodeList[parentID].hasChildren = true;
          state.nodeList[parentID].isOpen = true;
          state.nodeList[parentID].childrenID.push(id);
        }
      }
    );

    builder.addCase(
      getChildNodes.fulfilled,
      (state, action: PayloadAction<NodeElementFromServer[]>) => {
        const newNodes = action.payload;

        newNodes.forEach((newNode) => {
          const {
            id,
            name,
            parent_id: parentID,
            port,
            ip,
            hasChildren,
          } = newNode;

          state.nodeList[id] = {
            id,
            name,
            parentID,
            port,
            ip,
            hasChildren,
            isOpen: false,
            childrenID: [],
          };

          if (parentID === null) return;

          const parentChildrenID = state.nodeList[parentID].childrenID;
          const isElementExist = parentChildrenID.indexOf(id) !== -1;
          const shouldUpdateChildren = parentID && !isElementExist;

          if (shouldUpdateChildren) {
            state.nodeList[parentID].childrenID.push(id);
          }
        });
      }
    );
  },
});

export const {
  removeChildNodes,
  removeNode,
  selectNode,
  updateNodeData,
  changeNodeInfoType,
  toggleNodeIsOpen,
} = nodeSlice.actions;

export default nodeSlice.reducer;

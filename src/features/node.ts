/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import NodeApi from '@/services/NodeApi';

const api = new NodeApi();

export const getRootNode = createAsyncThunk(
  'node/getRootNode',
  api.getRootNode
);

export const getChildNodes = createAsyncThunk(
  'node/getChildNodes',
  api.getChildNodes
);

export const addNode = createAsyncThunk('node/addNode', api.addNode);

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

const nodeSlice = createSlice({
  name: 'node',
  initialState: {
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
  },
  extraReducers: {
    [getRootNode.fulfilled]: (state, action) => {
      const [newNode] = action.payload;
      const { id, name, parent_id: parentID, port, ip } = newNode;

      state.nodeList[id] = { id, name, parentID, port, ip, children: [] };
    },
    [addNode.fulfilled]: (state, action) => {
      const [newNode] = action.payload;
      const { id, name, parent_id: parentID, port, ip } = newNode;

      state.nodeList[id] = { id, name, parentID, port, ip, children: [] };

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
  },
});

export const { removeChildNodes, removeNode } = nodeSlice.actions;

export default nodeSlice.reducer;

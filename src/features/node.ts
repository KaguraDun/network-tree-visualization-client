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
  api.removeNode
);

const nodeSlice = createSlice({
  name: 'node',
  initialState: {
    nodeList: {},
  },
  reducers: {
    removeChildNodes: (state, action) => {
      const { parentid, level: parentLevel } = action.payload;

      Object.values(state.nodeList).forEach((node) => {
        if (node.parentid === parentid) delete state.nodeList[node.id];
        const isParentNode =
          node.level > parentLevel && node.parentid === parentid;

        if (isParentNode) {
      });
    },
  },
  extraReducers: {
    [getRootNode.fulfilled]: (state, action) => {
      const [newNode] = action.payload;
      const { id } = newNode;
      
      state.nodeList[id] = newNode;
    },
    [addNode.fulfilled]: (state, action) => {
      const [newNode] = action.payload;
      const { id } = newNode;

      state.nodeList[id] = newNode;
    },
    [getChildNodes.fulfilled]: (state, action) => {
      const newNodes = action.payload;

      newNodes.forEach((newNode) => {
        const { id } = newNode;
        state.nodeList[id] = newNode;
      });
    },
  },
});

export const { removeChildNodes } = nodeSlice.actions;

export default nodeSlice.reducer;

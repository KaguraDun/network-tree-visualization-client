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
      const { id, name, parent_id: parentID, port, ip } = newNode;

      state.nodeList[id] = { id, name, parentID, port, ip };
    },
    [addNode.fulfilled]: (state, action) => {
      const [newNode] = action.payload;
      const { id, name, parent_id: parentID, port, ip } = newNode;

      state.nodeList[id] = { id, name, parentID, port, ip };
    },
    [getChildNodes.fulfilled]: (state, action) => {
      const newNodes = action.payload;

      newNodes.forEach((newNode) => {
        const { id, name, parent_id: parentID, port, ip } = newNode;

        state.nodeList[id] = { id, name, parentID, port, ip };
      });
    },
  },
});

export const { removeChildNodes } = nodeSlice.actions;

export default nodeSlice.reducer;

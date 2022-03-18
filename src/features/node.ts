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

const nodeSlice = createSlice({
  name: 'node',
  initialState: {
    nodeList: {},
  },
  },
  reducers: {},
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

export default nodeSlice.reducer;

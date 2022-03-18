/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import NodeApi from '@/services/NodeApi';

const api = new NodeApi();

export const getRootNode = createAsyncThunk(
  'node/getRootNode',
  api.getRootNode
);

export const addNode = createAsyncThunk('node/addNode', api.addNode);

const nodeSlice = createSlice({
  name: 'node',
  initialState: {
    nodeList: [],
  },
  reducers: {},
  extraReducers: {
    [getRootNode.fulfilled]: (state, action) => {
      const [newNode] = action.payload;
      state.nodeList.push(newNode);
    },
    [addNode.fulfilled]: (state, action) => {
      const [newNode] = action.payload;
      state.nodeList.push(newNode);
    },
  },
});

export default nodeSlice.reducer;

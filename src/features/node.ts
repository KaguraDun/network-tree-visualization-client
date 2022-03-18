/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import NodeApi from '@/services/NodeApi';

const api = new NodeApi();

export const getRootNode = createAsyncThunk(
  'node/getRootNode',
  api.getRootNode
);

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
  },
});

export default nodeSlice.reducer;

/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const nodeSlice = createSlice({
  name: 'node',
  initialState: {
    nodeList: {},
  },
});

export default nodeSlice.reducer;

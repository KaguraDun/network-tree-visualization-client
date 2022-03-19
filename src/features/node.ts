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
        state.nodeList[clickedID].children.splice(index, 1);

        delete state.nodeList[id];
      });
    },
  },
  extraReducers: {
    [getRootNode.fulfilled]: (state, action) => {
      const [newNode] = action.payload;
      const { id, name, parent_id: parentID, port, ip } = newNode;

      state.nodeList[id] = { id, name, parentID, port, ip };
      state.nodeList[id].children = [];
    },
    [addNode.fulfilled]: (state, action) => {
      const [newNode] = action.payload;
      const { id, name, parent_id: parentID, port, ip } = newNode;

      state.nodeList[id] = { id, name, parentID, port, ip };
      state.nodeList[id].children = [];

      const { children } = state.nodeList[parentID];
      state.nodeList[parentID].children = [...children, id];
    },
    [getChildNodes.fulfilled]: (state, action) => {
      const newNodes = action.payload;

      newNodes.forEach((newNode) => {
        const { id, name, parent_id: parentID, port, ip } = newNode;

        state.nodeList[id] = { id, name, parentID, port, ip };
        state.nodeList[id].children = [];

        const { children } = state.nodeList[parentID];
        state.nodeList[parentID].children = [...children, id];
      });
    },
  },
});

export const { removeChildNodes } = nodeSlice.actions;

export default nodeSlice.reducer;

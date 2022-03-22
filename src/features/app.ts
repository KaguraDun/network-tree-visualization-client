/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  showModal: boolean;
}

const initialState: AppState = {
  showModal: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setShowModal: (state, action: PayloadAction<AppState['showModal']>) => {
      state.showModal = action.payload;
    },
  },
});

export const { setShowModal } = appSlice.actions;

export default appSlice.reducer;

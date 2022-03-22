import { configureStore } from '@reduxjs/toolkit';

import appSlice from '@/features/app';
import nodeSlice from '@/features/node';

const store = configureStore({
  reducer: {
    node: nodeSlice,
    app: appSlice,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

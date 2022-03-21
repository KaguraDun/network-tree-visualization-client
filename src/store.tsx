import { configureStore } from '@reduxjs/toolkit';

import nodeSlice from '@/features/node';

const store = configureStore({
  reducer: {
    node: nodeSlice,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;

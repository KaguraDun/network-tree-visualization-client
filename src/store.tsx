import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    //reducers
  },
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
export type RootState = ReturnType<typeof store.getState>;

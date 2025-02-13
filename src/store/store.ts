import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import commentReducer from './commentSlice';
import postReducer from './postSlice';

export const store = configureStore({
  reducer: {
    posts: postReducer,
    comments: commentReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

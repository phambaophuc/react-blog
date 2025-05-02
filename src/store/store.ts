import { configureStore } from '@reduxjs/toolkit';

import articleReducer from './articleSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    articles: articleReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

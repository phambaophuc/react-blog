import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { UserType } from '../models/User';
import { authService } from '../services/authService';

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (credentials: { name: string; email: string; password: string }) => {
    return await authService.signUp(
      credentials.name,
      credentials.email,
      credentials.password
    );
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials: { email: string; password: string }) => {
    return await authService.signIn(credentials.email, credentials.password);
  }
);

type AuthState = {
  user: UserType | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
};

const initialState: AuthState = {
  user: null,
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default authSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '@supabase/supabase-js';

import { SignInType, SignUpType } from '../models/User';
import { authService } from '../services/authService';

export const signUp = createAsyncThunk(
  'auth/signup',
  (credentials: SignUpType) => {
    return authService.signUp(
      credentials.fullName,
      credentials.email,
      credentials.password
    );
  }
);

export const signIn = createAsyncThunk(
  'auth/signin',
  (credentials: SignInType) => {
    return authService.signIn(credentials.email, credentials.password);
  }
);

export const fetchUser = createAsyncThunk('auth/fetchUser', () => {
  return authService.getUser();
});

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      authService.signOut();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.user = action.payload.user;
        state.error = null;
        state.loading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.loading = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

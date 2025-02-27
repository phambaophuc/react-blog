import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { SignInType, SignUpType } from '../models/Auth';
import { authService } from '../services/authService';

export const signUp = createAsyncThunk(
  'auth/signup',
  (credentials: SignUpType) => {
    return authService.signUp(
      credentials.displayName,
      credentials.email,
      credentials.password
    );
  }
);

export const signIn = createAsyncThunk(
  'auth/signin',
  async (credentials: SignInType) => {
    const token = await authService.signIn(
      credentials.email,
      credentials.password
    );
    const userInfo = await authService.getUser();
    return { token, userInfo };
  }
);

export const fetchUser = createAsyncThunk('auth/fetchUser', () => {
  return authService.getUser();
});

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('access_token'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('access_token');
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.userInfo;
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

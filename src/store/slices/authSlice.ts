import { useApiServices } from '@/services';
import { SignInRequest, SignUpRequest, User } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { BaseState } from '../types';
import { createAppAsyncThunk } from '../utils/asyncThunkUtils';
import { setFulfilled, setPending, setRejected } from '../utils/stateUtils';

export const signIn = createAppAsyncThunk(
  'auth/signIn',
  async (credentials: SignInRequest) => {
    const { auth } = useApiServices();
    const response = await auth.signIn(credentials);
    const user = await auth.getUser();
    return { ...response, user };
  }
);

export const signUp = createAppAsyncThunk(
  'auth/signUp',
  async (userData: SignUpRequest) => {
    const { auth } = useApiServices();
    return await auth.signUp(userData);
  }
);

export const fetchUser = createAppAsyncThunk('auth/fetchUser', async () => {
  const { auth } = useApiServices();
  return await auth.getUser();
});

export const signOut = createAppAsyncThunk('auth/signOut', async () => {
  const { auth } = useApiServices();
  await auth.signOut();
});

export const refreshToken = createAppAsyncThunk(
  'auth/refreshToken',
  async () => {
    const { auth } = useApiServices();
    return await auth.refreshToken();
  }
);

// State interface
interface AuthState extends BaseState {
  user: any | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  tokenExpiry: number | null;
  lastActivity: number;
  rememberMe: boolean;
}

const initialState: AuthState = {
  // Base state
  loading: false,
  error: null,

  // Auth state
  user: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  tokenExpiry: null,
  lastActivity: Date.now(),
  rememberMe: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.tokenExpiry = null;
      state.error = null;
    },

    updateLastActivity: (state) => {
      state.lastActivity = Date.now();
    },

    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },

  extraReducers: (builder) => {
    // Sign in
    builder
      .addCase(signIn.pending, setPending)
      .addCase(signIn.fulfilled, (state, action) => {
        setFulfilled(state);
        const { accessToken, refreshToken, user } = action.payload;

        state.user = user;
        state.isAuthenticated = true;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.lastActivity = Date.now();

        // Calculate token expiry (assuming JWT)
        if (accessToken) {
          try {
            const payload = JSON.parse(atob(accessToken.split('.')[1]));
            state.tokenExpiry = payload.exp * 1000;
          } catch {
            // Fallback: 1 hour from now
            state.tokenExpiry = Date.now() + 60 * 60 * 1000;
          }
        }
      })
      .addCase(signIn.rejected, setRejected);

    // Sign up
    builder
      .addCase(signUp.pending, setPending)
      .addCase(signUp.fulfilled, setFulfilled)
      .addCase(signUp.rejected, setRejected);

    // Fetch user
    builder
      .addCase(fetchUser.pending, (state) => {
        // Don't show loading for background user fetch
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.lastActivity = Date.now();
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = action.payload || 'Failed to fetch user';
      });

    // Sign out
    builder
      .addCase(signOut.pending, setPending)
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.tokenExpiry = null;
        state.error = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        // Even if signout fails, clear local state
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.tokenExpiry = null;
        state.error = action.payload || 'Signout failed';
      });

    // Refresh token
    builder
      .addCase(refreshToken.pending, (state) => {
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        const { accessToken, refreshToken: newRefreshToken } = action.payload;
        state.accessToken = accessToken;
        state.refreshToken = newRefreshToken;
        state.lastActivity = Date.now();

        // Update token expiry
        if (accessToken) {
          try {
            const payload = JSON.parse(atob(accessToken.split('.')[1]));
            state.tokenExpiry = payload.exp * 1000;
          } catch {
            state.tokenExpiry = Date.now() + 60 * 60 * 1000;
          }
        }
      })
      .addCase(refreshToken.rejected, (state, action) => {
        // Token refresh failed, user needs to sign in again
        state.user = null;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.tokenExpiry = null;
        state.error = action.payload || 'Session expired';
      });
  },
});

export const {
  logout,
  updateLastActivity,
  setRememberMe,
  clearError,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;

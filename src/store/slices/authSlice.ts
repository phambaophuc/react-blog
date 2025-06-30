import { SignInRequest, SignUpRequest, User } from '@/libs/types';
import { useApiServices } from '@/services';
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

// State interface
interface AuthState extends BaseState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
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

    updateAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;

      if (!action.payload) {
        state.isAuthenticated = false;
        state.user = null;
        state.tokenExpiry = null;
      } else {
        try {
          const payload = JSON.parse(atob(action.payload.split('.')[1]));
          state.tokenExpiry = payload.exp * 1000;
        } catch {
          state.tokenExpiry = Date.now() + 60 * 60 * 1000;
        }
      }
    },
  },

  extraReducers: (builder) => {
    // Sign in
    builder
      .addCase(signIn.pending, setPending)
      .addCase(signIn.fulfilled, (state, action) => {
        setFulfilled(state);
        const { accessToken, user } = action.payload;

        state.user = user;
        state.isAuthenticated = true;
        state.accessToken = accessToken;
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
        state.tokenExpiry = null;
        state.error = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.tokenExpiry = null;
        state.error = action.payload || 'Signout failed';
      });
  },
});

export const {
  logout,
  updateLastActivity,
  setRememberMe,
  clearError,
  updateUser,
  updateAccessToken,
} = authSlice.actions;

export default authSlice.reducer;

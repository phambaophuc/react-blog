import { store } from '@/store';

import { updateAccessToken } from '@/store/slices/authSlice';

export class TokenManager {
  async getToken(): Promise<string | null> {
    const state = store.getState();
    return state.auth.accessToken;
  }

  async setToken(accessToken: string): Promise<void> {
    store.dispatch(updateAccessToken(accessToken));
  }

  async refreshToken(): Promise<void> {
    // Call refresh endpoint
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
      {
        method: 'POST',
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    await this.setToken(data.accessToken);
  }

  async clearToken(): Promise<void> {
    store.dispatch(updateAccessToken(null));
  }
}

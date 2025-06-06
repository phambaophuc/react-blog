export class TokenManager {
  private readonly ACCESS_TOKEN_KEY = 'access_token';

  async getToken(): Promise<string | null> {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  async setToken(accessToken: string): Promise<void> {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
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
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }
}

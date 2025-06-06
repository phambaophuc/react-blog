import { AuthResponse, SignInRequest, SignUpRequest, User } from '@/types';

import { BaseApiClient, BaseService } from './base';

export class AuthService extends BaseService {
  constructor(client: BaseApiClient) {
    super(client, '/auth');
  }

  async signUp(body: SignUpRequest): Promise<AuthResponse> {
    return this.client.post<AuthResponse>(`${this.baseUrl}/signup`, body);
  }

  async signIn(credentials: SignInRequest): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>(
      `${this.baseUrl}/signin`,
      credentials
    );

    // Store tokens
    const tokenManager = new (
      await import('./base/TokenManager')
    ).TokenManager();
    await tokenManager.setToken(response.accessToken);

    return response;
  }

  async getUser(): Promise<User> {
    return this.client.get<User>(`${this.baseUrl}/users/me`);
  }

  async signOut(): Promise<void> {
    const tokenManager = new (
      await import('./base/TokenManager')
    ).TokenManager();
    await tokenManager.clearToken();

    try {
      await this.client.post<void>(`${this.baseUrl}/signout`);
    } catch (error) {
      // Ignore errors during signout
      console.warn('Signout request failed:', error);
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    const tokenManager = new (
      await import('./base/TokenManager')
    ).TokenManager();

    const response = await this.client.post<AuthResponse>(
      `${this.baseUrl}/refresh`,
      undefined,
      {
        withCredentials: true,
      }
    );

    await tokenManager.setToken(response.accessToken);
    return response;
  }
}

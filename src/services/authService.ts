import { AuthResponse, SignInRequest, SignUpRequest, User } from '@/libs/types';

import { BaseApiClient, BaseService } from './base';
import { TokenManager } from './base/TokenManager';

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
    const tokenManager = new TokenManager();
    await tokenManager.setToken(response.accessToken);

    return response;
  }

  async getUser(): Promise<User> {
    return this.client.get<User>(`${this.baseUrl}/users/me`);
  }

  async signOut(): Promise<void> {
    try {
      await this.client.post<void>(`${this.baseUrl}/signout`);
    } catch (error) {
      console.warn('Signout request failed:', error);
    } finally {
      const tokenManager = new TokenManager();
      await tokenManager.clearToken();
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    const tokenManager = new TokenManager();

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

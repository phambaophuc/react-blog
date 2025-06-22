import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

import { ApiError } from './ApiError';
import { TokenManager } from './TokenManager';

export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  retryAttempts?: number;
}

export class BaseApiClient {
  protected client: AxiosInstance;
  private tokenManager: TokenManager;
  // private retryAttempts: number;

  constructor(config: ApiClientConfig) {
    // this.retryAttempts = config.retryAttempts ?? 3;
    this.tokenManager = new TokenManager();

    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout ?? 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        const token = await this.tokenManager.getToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(new ApiError(error))
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        // Handle token refresh for 401 errors
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await this.tokenManager.refreshToken();
            const newToken = await this.tokenManager.getToken();

            if (newToken && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }

            return this.client(originalRequest);
          } catch (refreshError) {
            await this.tokenManager.clearToken();
            return Promise.reject(new ApiError(refreshError));
          }
        }

        return Promise.reject(new ApiError(error));
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

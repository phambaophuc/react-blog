import { BaseApiClient } from './BaseApiClient';

export abstract class BaseService {
  protected client: BaseApiClient;
  protected baseUrl: string;

  constructor(client: BaseApiClient, baseUrl: string) {
    this.client = client;
    this.baseUrl = baseUrl;
  }

  protected buildUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  protected buildQueryParams(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.append(key, String(value));
      }
    });

    return searchParams.toString();
  }
}

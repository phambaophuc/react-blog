export class ApiError extends Error {
  public readonly status?: number;
  public readonly code?: string;
  public readonly details?: any;

  constructor(error: any) {
    if (error.response) {
      super(error.response.data?.message || 'API Error');
      this.status = error.response.status;
      this.code = error.response.data?.code;
      this.details = error.response.data;
    } else if (error.request) {
      super('Network Error');
      this.code = 'NETWORK_ERROR';
    } else {
      super(error.message || 'Unknown Error');
    }

    this.name = 'ApiError';
  }
}

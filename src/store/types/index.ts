export interface BaseState {
  loading: boolean;
  error: string | null;
}

export interface PaginatedState {
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

export interface AsyncThunkConfig {
  rejectValue: string;
}

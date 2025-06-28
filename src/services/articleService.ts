import {
  Article,
  ArticleFilters,
  ArticleResponse,
  CreateArticleRequest,
} from '@/types';

import { BaseApiClient, BaseService } from './base';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 8;

export class ArticleService extends BaseService {
  constructor(client: BaseApiClient) {
    super(client, '/articles');
  }

  async findAll(query: ArticleFilters): Promise<ArticleResponse> {
    const params = {
      page: query.page ?? DEFAULT_PAGE,
      limit: query.limit ?? DEFAULT_LIMIT,
    };

    const queryString = this.buildQueryParams(params);
    return this.client.get<ArticleResponse>(`${this.baseUrl}?${queryString}`);
  }

  async findAllRelated(id: string): Promise<Article[]> {
    return this.client.get<Article[]>(`${this.baseUrl}/${id}/related`);
  }

  async findById(id: string): Promise<Article> {
    return this.client.get<Article>(`${this.baseUrl}/${id}`);
  }

  async create(article: CreateArticleRequest): Promise<Article> {
    return this.client.post<Article>(this.baseUrl, article);
  }

  async update(
    id: string,
    article: Partial<CreateArticleRequest>
  ): Promise<Article> {
    return this.client.put<Article>(`${this.baseUrl}/${id}`, article);
  }

  async delete(id: string): Promise<void> {
    return this.client.delete<void>(`${this.baseUrl}/${id}`);
  }
}

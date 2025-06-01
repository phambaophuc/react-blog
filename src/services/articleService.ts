import {
  ArticleResponseType,
  ArticleType,
  CreateArticleType,
  QueryArticleType,
} from '@/types/ArticleType';

import { BaseApiClient, BaseService } from './base';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 8;

export class ArticleService extends BaseService {
  constructor(client: BaseApiClient) {
    super(client, '/articles');
  }

  async findAll(query: QueryArticleType): Promise<ArticleResponseType> {
    const params = {
      page: query.page ?? DEFAULT_PAGE,
      limit: query.limit ?? DEFAULT_LIMIT,
      tag: query.tag,
    };

    const queryString = this.buildQueryParams(params);
    return this.client.get<ArticleResponseType>(
      `${this.baseUrl}?${queryString}`
    );
  }

  async findAllRelated(id: string): Promise<ArticleType[]> {
    return this.client.get<ArticleType[]>(`${this.baseUrl}/${id}/related`);
  }

  async findById(id: string): Promise<ArticleType> {
    return this.client.get<ArticleType>(`${this.baseUrl}/${id}`);
  }

  async create(article: CreateArticleType): Promise<ArticleType> {
    return this.client.post<ArticleType>(this.baseUrl, article);
  }

  async update(
    id: string,
    article: Partial<CreateArticleType>
  ): Promise<ArticleType> {
    return this.client.put<ArticleType>(`${this.baseUrl}/${id}`, article);
  }

  async delete(id: string): Promise<void> {
    return this.client.delete<void>(`${this.baseUrl}/${id}`);
  }

  async search(
    searchTerm: string,
    filters?: Partial<QueryArticleType>
  ): Promise<ArticleResponseType> {
    const params = {
      search: searchTerm,
      ...filters,
      page: filters?.page ?? DEFAULT_PAGE,
      limit: filters?.limit ?? DEFAULT_LIMIT,
    };

    const queryString = this.buildQueryParams(params);
    return this.client.get<ArticleResponseType>(
      `${this.baseUrl}/search?${queryString}`
    );
  }
}

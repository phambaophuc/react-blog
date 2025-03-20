import {
  ArticleResponseType,
  ArticleType,
  CreateArticleType,
  QueryArticleType,
} from '@models/Article';

import { apiClient } from './apiClient';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@constant/pagination';

export const articleService = {
  findAll: async (query: QueryArticleType): Promise<ArticleResponseType> => {
    const response = await apiClient.get('/articles', {
      params: {
        page: query.page ?? DEFAULT_PAGE,
        limit: query.limit ?? DEFAULT_LIMIT,
        tag: query.tag,
      },
    });
    return response.data;
  },
  findAllRelated: async (id: string): Promise<ArticleType[]> => {
    const response = await apiClient.get(`/articles/${id}/related`);
    return response.data;
  },
  findById: async (id: string): Promise<ArticleType> => {
    const response = await apiClient.get(`/articles/${id}`);
    return response.data;
  },
  create: async (article: CreateArticleType): Promise<ArticleType> => {
    const response = await apiClient.post('/articles', article);
    return response.data;
  },
};

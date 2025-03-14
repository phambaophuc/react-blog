import { CreateArticleType, QueryArticleType } from '@models/Article';

import { apiClient } from './apiClient';

export const articleService = {
  findAll: async (query: QueryArticleType) => {
    try {
      const response = await apiClient.get('/articles', {
        params: {
          page: query.page ?? 1,
          limit: query.limit ?? 8,
          tag: query.tag,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  findAllRelated: async (id: string) => {
    try {
      const response = await apiClient.get(`/articles/${id}/related`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  findById: async (id: string) => {
    try {
      const response = await apiClient.get(`/articles/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  create: async (article: CreateArticleType) => {
    try {
      const response = await apiClient.post('/articles', article);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};

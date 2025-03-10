import { CreatePostType, QueryPostType } from '@models/Post';

import { apiClient } from './apiClient';

export const postService = {
  findAll: async (query: QueryPostType) => {
    try {
      const response = await apiClient.get('/posts', {
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
      const response = await apiClient.get(`/posts/${id}/related`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  findById: async (id: string) => {
    try {
      const response = await apiClient.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  create: async (post: CreatePostType) => {
    try {
      const response = await apiClient.post('/posts', post);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};

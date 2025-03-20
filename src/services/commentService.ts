import { CreateCommentType } from '@models/Comment';

import { apiClient } from './apiClient';

export const commentService = {
  findAll: async () => {
    const response = await apiClient.get('/comments');
    return response.data;
  },
  create: async (comment: CreateCommentType) => {
    const response = await apiClient.post('/comments', comment);
    return response.data;
  },
  delete: async (id: string) => {
    return await apiClient.delete(`/comments/${id}`);
  },
};

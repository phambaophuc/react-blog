import { CreateCommentType } from '@models/Comment';

import { apiClient } from './apiClient';

export const commentService = {
  create: async (comment: CreateCommentType) => {
    try {
      const response = await apiClient.post('/comments', comment);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};

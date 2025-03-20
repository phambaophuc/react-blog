import { apiClient } from './apiClient';

export const tagService = {
  findAll: async () => {
    const response = await apiClient.get('/tags');
    return response.data;
  },
};

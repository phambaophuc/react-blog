import { apiClient } from './apiClient';

export const tagService = {
  getAllTags: async () => {
    try {
      const response = await apiClient.get('/tags');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};

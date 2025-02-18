import { api } from './api';

export const tagService = {
  getAllTags: async () => {
    const response = await api.get('/tags');
    return response.data;
  },
};

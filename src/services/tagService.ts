import { api } from './api';

export const tagService = {
  getAllTags: async () => {
    return (await api.get('/tags')).data;
  },
};

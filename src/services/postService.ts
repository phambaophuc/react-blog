import { api } from './api';

export const postService = {
  getAllPosts: async (page: number = 1, limit: number = 10) => {
    const response = await api.get(`/posts?page=${page}&limit=${limit}`);
    return response.data;
  },
  getPostByID: async (id: number) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },
  createPost: async (title: string, content: string) => {
    const response = await api.post('/posts', { title, content });
    return response.data;
  },
};

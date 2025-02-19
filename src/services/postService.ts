import { CreatePostType, QueryPostType } from '../models/Post';
import { api } from './api';

export const postService = {
  getAllPosts: async (query: QueryPostType) => {
    const response = await api.get('/posts', {
      params: {
        page: query.page ?? 1,
        limit: query.limit ?? 8,
        tagName: query.tagName,
      },
    });
    return response.data;
  },
  getPostByID: async (id: string) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },
  createPost: async (post: CreatePostType) => {
    const response = await api.post('/posts', post);
    return response.data;
  },
};

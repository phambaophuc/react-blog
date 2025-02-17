import { CreatePostType } from '../models/Post';
import { api } from './api';

export const postService = {
  getAllPosts: async (page: number, limit: number) => {
    const response = await api.get(`/posts?page=${page}&limit=${limit}`);
    return response.data;
  },
  getPostByID: async (id: number) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },
  createPost: async (post: CreatePostType) => {
    const response = await api.post('/posts', post);
    return response.data;
  },
};

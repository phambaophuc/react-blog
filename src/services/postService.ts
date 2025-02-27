import { CreatePostType, QueryPostType } from '../models/Post';
import { api } from './api';

export const postService = {
  getAllPosts: async (query: QueryPostType) => {
    return (
      await api.get('/posts', {
        params: {
          page: query.page ?? 1,
          limit: query.limit ?? 8,
          tag: query.tag,
        },
      })
    ).data;
  },
  getPostByID: async (id: string) => {
    return (await api.get(`/posts/${id}`)).data;
  },
  createPost: async (post: CreatePostType) => {
    return (await api.post('/posts', post)).data;
  },
};

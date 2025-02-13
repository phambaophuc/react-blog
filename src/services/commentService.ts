import { api } from './api';

export const commentService = {
  getCommentsByPostID: async (postID: number) => {
    const response = await api.get(`/posts/${postID}/comments`);
    return response.data;
  },
  createComment: async (postID: number, content: string) => {
    const response = await api.post('/comments', { postID, content });
    return response.data;
  },
};

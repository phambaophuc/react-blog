import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CreatePostType, PostResponse, PostType } from '../models/Post';
import { postService } from '../services/postService';

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async ({ page = 1, limit = 8 }: { page?: number; limit?: number }) => {
    return await postService.getAllPosts(page, limit);
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData: CreatePostType) => {
    return await postService.createPost(postData);
  }
);

const initialState: PostResponse & { loading: boolean; hasMore: boolean } = {
  data: [],
  page: 1,
  limit: 10,
  totalPages: 1,
  loading: false,
  hasMore: true,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;

        const dataMap = new Map(state.data.map((post) => [post.id, post]));
        action.payload.data.forEach((post: PostType) =>
          dataMap.set(post.id, post)
        );

        state.data = Array.from(dataMap.values());
        state.hasMore = action.payload.page < action.payload.totalPages;
      })
      .addCase(getPosts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.data.unshift(action.payload);
      });
  },
});

export default postSlice.reducer;

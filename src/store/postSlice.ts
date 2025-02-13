import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { PostResponse } from '../models/Post';
import { postService } from '../services/postService';

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
    return await postService.getAllPosts(page, limit);
  }
);

type PostState = PostResponse & {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
};

const initialState: PostState = {
  data: [],
  page: 1,
  limit: 10,
  totalPages: 1,
  status: 'idle',
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state, action.payload);
      })
      .addCase(getPosts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default postSlice.reducer;

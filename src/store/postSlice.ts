import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  CreatePostType,
  PostResponseType,
  PostType,
  QueryPostType,
} from '../models/Post';
import { postService } from '../services/postService';

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (query: QueryPostType) => {
    return await postService.getAllPosts(query);
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData: CreatePostType) => {
    return await postService.createPost(postData);
  }
);

const initialState: PostResponseType & { loading: boolean; hasMore: boolean } =
  {
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

        if (action.meta.arg.tagName) {
          state.data = action.payload.data;
        } else {
          const dataMap = new Map(state.data.map((post) => [post.id, post]));
          action.payload.data.forEach((post: PostType) =>
            dataMap.set(post.id, post)
          );
          state.data = Array.from(dataMap.values());
        }

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

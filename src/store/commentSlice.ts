import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CommentType } from '../models/Comment';
import { commentService } from '../services/commentService';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postID: number) => {
    return await commentService.getCommentsByPostID(postID);
  }
);

type CommentState = {
  comments: CommentType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
};

const initialState: CommentState = {
  comments: [],
  status: 'idle',
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default commentSlice.reducer;

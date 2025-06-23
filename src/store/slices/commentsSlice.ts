import { useApiServices } from '@/services';
import { Comment, CreateCommentRequest } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

import { BaseState } from '../types';
import { createAppAsyncThunk } from '../utils/asyncThunkUtils';
import { setFulfilled, setPending, setRejected } from '../utils/stateUtils';

export const createComment = createAppAsyncThunk(
  'comments/create',
  async (comment: CreateCommentRequest) => {
    const { comments } = useApiServices();
    return await comments.create(comment);
  }
);

export const deleteComment = createAppAsyncThunk(
  'comments/delete',
  async (commentId: string) => {
    const { comments } = useApiServices();
    await comments.delete(commentId);
    return commentId;
  }
);

export const fetchComments = createAppAsyncThunk(
  'comments/fetch',
  async (articleId: string) => {
    const { comments } = useApiServices();
    return comments.findByArticleId(articleId);
  }
);

interface CommentsState extends BaseState {
  comments: Comment[];
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setInitComments: (state, action) => {
      state.comments = action.payload;
    },
    clearComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Create comment cases
      .addCase(createComment.pending, setPending)
      .addCase(createComment.fulfilled, (state, action) => {
        setFulfilled(state);
        const newComment = action.payload;

        if (newComment.parentId) {
          state.comments = state.comments.map((comment) =>
            comment.id === newComment.parentId
              ? { ...comment, replies: [...comment.replies, newComment] }
              : comment
          );
        } else {
          state.comments = [newComment, ...state.comments];
        }
      })
      .addCase(createComment.rejected, setRejected)

      // Delete comment cases
      .addCase(deleteComment.pending, setPending)
      .addCase(deleteComment.fulfilled, (state, action) => {
        setFulfilled(state);
        const commentId = action.payload;

        state.comments = state.comments
          .map((comment) =>
            comment.id === commentId
              ? null
              : {
                  ...comment,
                  replies: comment.replies.filter(
                    (reply) => reply.id !== commentId
                  ),
                }
          )
          .filter((comment): comment is Comment => comment !== null);
      })
      .addCase(deleteComment.rejected, setRejected)

      // Fetch comments cases
      .addCase(fetchComments.pending, setPending)
      .addCase(fetchComments.fulfilled, (state, action) => {
        setFulfilled(state);
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, setRejected);
  },
});

export const { setInitComments, clearComments } = commentSlice.actions;

export default commentSlice.reducer;

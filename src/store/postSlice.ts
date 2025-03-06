import { PostResponseType, PostType, QueryPostType } from '@models/Post';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postService } from '@services/postService';

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (query: QueryPostType) => {
    return await postService.getAllPosts(query);
  }
);

export const getPostByID = createAsyncThunk(
  'posts/getPostByID',
  async (id: string) => {
    return await postService.getPostByID(id);
  }
);

type InitType = PostResponseType & {
  loading: boolean;
  hasMore: boolean;
  postData: PostType | null;
};

const initialState: InitType = {
  data: [],
  page: 1,
  limit: 10,
  totalPages: 1,
  loading: false,
  hasMore: true,
  postData: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPosts: (state) => {
      state.data = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;

        if (action.meta.arg.page === 1) {
          state.data = action.payload.data;
        } else {
          state.data = [
            ...new Map(
              [...state.data, ...action.payload.data].map((post) => [
                post.id,
                post,
              ])
            ).values(),
          ];
        }

        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.hasMore = action.payload.page < action.payload.totalPages;
      })
      .addCase(getPosts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getPostByID.fulfilled, (state, action) => {
        state.postData = action.payload;
      });
  },
});

export const { resetPosts } = postSlice.actions;
export default postSlice.reducer;

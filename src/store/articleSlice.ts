import {
  ArticleResponseType,
  ArticleType,
  QueryArticleType,
} from '@models/Article';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { articleService } from '@services/articleService';

export const getArticles = createAsyncThunk(
  'articles/getArticles',
  async (query: QueryArticleType) => {
    return await articleService.findAll(query);
  }
);

export const getArticleByID = createAsyncThunk(
  'articles/getArticleByID',
  async (id: string) => {
    return await articleService.findById(id);
  }
);

type InitType = ArticleResponseType & {
  loading: boolean;
  hasMore: boolean;
  articleData: ArticleType | null;
};

const initialState: InitType = {
  data: [],
  page: 1,
  limit: 10,
  totalPages: 1,
  loading: false,
  hasMore: true,
  articleData: null,
};

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    resetArticles: (state) => {
      state.data = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.loading = false;

        if (action.meta.arg.page === 1) {
          state.data = action.payload.data;
        } else {
          state.data = [
            ...new Map(
              [...state.data, ...action.payload.data].map((article) => [
                article.id,
                article,
              ])
            ).values(),
          ];
        }

        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.hasMore = action.payload.page < action.payload.totalPages;
      })
      .addCase(getArticles.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getArticleByID.fulfilled, (state, action) => {
        state.articleData = action.payload;
      });
  },
});

export const { resetArticles } = articleSlice.actions;
export default articleSlice.reducer;

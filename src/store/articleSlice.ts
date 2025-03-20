import {
  ArticleResponseType,
  ArticleType,
  QueryArticleType,
} from '@models/Article';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { articleService } from '@services/articleService';

const mergeArticles = (
  existingArticles: ArticleType[],
  newArticles: ArticleType[]
): ArticleType[] => {
  const mergedArticles = [...existingArticles, ...newArticles];
  return Array.from(
    new Map(mergedArticles.map((article) => [article.id, article])).values()
  );
};

export const getArticles = createAsyncThunk(
  'articles/getArticles',
  async (query: QueryArticleType) => {
    return await articleService.findAll(query);
  }
);

type ArticleState = ArticleResponseType & {
  loading: boolean;
  hasMore: boolean;
  articleData: ArticleType | null;
};

const initialState: ArticleState = {
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
      .addCase(
        getArticles.fulfilled,
        (state, action: PayloadAction<ArticleResponseType>) => {
          state.loading = false;

          if (action.payload.page === 1) {
            state.data = action.payload.data;
          } else {
            state.data = mergeArticles(state.data, action.payload.data);
          }

          state.page = action.payload.page;
          state.totalPages = action.payload.totalPages;
          state.hasMore = action.payload.page < action.payload.totalPages;
        }
      )
      .addCase(getArticles.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetArticles } = articleSlice.actions;
export default articleSlice.reducer;

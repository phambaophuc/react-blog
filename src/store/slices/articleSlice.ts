import { Article, ArticleFilters, CreateArticleRequest } from '@/libs/types';
import { useApiServices } from '@/services';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { BaseState, PaginatedState } from '../types';
import { createAppAsyncThunk } from '../utils/asyncThunkUtils';
import { setFulfilled, setPending, setRejected } from '../utils/stateUtils';

const mergeArticles = (
  existingArticles: Article[],
  newArticles: Article[]
): Article[] => {
  const mergedArticles = [...existingArticles, ...newArticles];
  return Array.from(
    new Map(mergedArticles.map((article) => [article.id, article])).values()
  );
};

export const fetchArticles = createAppAsyncThunk(
  'articles/fetchArticles',
  async (query: ArticleFilters) => {
    const { articles } = useApiServices();
    return await articles.findAll(query);
  }
);

export const fetchArticleBySlug = createAppAsyncThunk(
  'articles/fetchArticleBySlug',
  async (slug: string) => {
    const { articles } = useApiServices();
    return await articles.findBySlug(slug);
  }
);

export const createArticle = createAppAsyncThunk(
  'articles/createArticle',
  async (article: CreateArticleRequest) => {
    const { articles } = useApiServices();
    return await articles.create(article);
  }
);

interface ArticleState extends BaseState, PaginatedState {
  articles: Article[];
  currentArticle: Article | null;
  searchResults: Article[];
  filters: ArticleFilters;
}

const initialState: ArticleState = {
  // Base state
  loading: false,
  error: null,

  // Pagination state
  page: 1,
  limit: 10,
  totalPages: 1,
  hasMore: true,

  // Article state
  articles: [],
  currentArticle: null,
  searchResults: [],
  filters: { page: 1, limit: 10 },
};

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    resetArticles: (state) => {
      state.articles = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },

    resetCurrentArticle: (state) => {
      state.currentArticle = null;
      state.error = null;
    },

    setFilters: (state, action: PayloadAction<Partial<ArticleFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    clearFilters: (state) => {
      state.filters = { page: 1, limit: 10 };
    },

    updateArticleInList: (state, action: PayloadAction<Article>) => {
      const index = state.articles.findIndex(
        (article) => article.id === action.payload.id
      );
      if (index !== -1) {
        state.articles[index] = action.payload;
      }
    },

    removeArticleFromList: (state, action: PayloadAction<string>) => {
      state.articles = state.articles.filter(
        (article) => article.id !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    // Fetch articles
    builder
      .addCase(fetchArticles.pending, setPending)
      .addCase(fetchArticles.fulfilled, (state, action) => {
        setFulfilled(state);
        const { data, page, totalPages } = action.payload;

        if (page === 1) {
          state.articles = data;
        } else {
          state.articles = mergeArticles(state.articles, data);
        }

        state.page = page;
        state.totalPages = totalPages;
        state.hasMore = page < totalPages;
      })
      .addCase(fetchArticles.rejected, setRejected);

    // Fetch article by Slug
    builder
      .addCase(fetchArticleBySlug.pending, setPending)
      .addCase(fetchArticleBySlug.fulfilled, (state, action) => {
        setFulfilled(state);
        state.currentArticle = action.payload;
      })
      .addCase(fetchArticleBySlug.rejected, setRejected);

    // Create article
    builder
      .addCase(createArticle.pending, setPending)
      .addCase(createArticle.fulfilled, (state, action) => {
        setFulfilled(state);
        state.articles.unshift(action.payload);
      })
      .addCase(createArticle.rejected, setRejected);
  },
});

export const {
  resetArticles,
  resetCurrentArticle,
  setFilters,
  clearFilters,
  updateArticleInList,
  removeArticleFromList,
} = articleSlice.actions;

export default articleSlice.reducer;

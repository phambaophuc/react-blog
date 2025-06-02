import { useCallback } from 'react';

import { ArticleFilters, CreateArticleRequest } from '@/types';

import { useAppDispatch, useAppSelector } from '..';
import {
  createArticle,
  fetchArticleById,
  fetchArticles,
  resetArticles,
  setFilters,
} from '../slices/articleSlice';

export const useArticles = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector((state) => state.articles);

  const handleFetchArticles = useCallback(
    (query: ArticleFilters) => dispatch(fetchArticles(query)),
    [dispatch]
  );

  const handleFetchArticleById = useCallback(
    (id: string) => dispatch(fetchArticleById(id)),
    [dispatch]
  );

  const handleCreateArticle = useCallback(
    (article: CreateArticleRequest) => dispatch(createArticle(article)),
    [dispatch]
  );

  const handleResetArticles = useCallback(
    () => dispatch(resetArticles()),
    [dispatch]
  );

  const handleSetFilters = useCallback(
    (filters: Partial<ArticleFilters>) => dispatch(setFilters(filters)),
    [dispatch]
  );

  return {
    ...articles,
    fetchArticles: handleFetchArticles,
    fetchArticleById: handleFetchArticleById,
    createArticle: handleCreateArticle,
    resetArticles: handleResetArticles,
    setFilters: handleSetFilters,
  };
};

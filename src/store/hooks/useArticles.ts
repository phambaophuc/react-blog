import { useCallback } from 'react';

import { ArticleFilters, CreateArticleRequest } from '@/libs/types';

import { useAppDispatch, useAppSelector } from '..';
import {
  createArticle,
  fetchArticleBySlug,
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

  const handleFetchArticleBySlug = useCallback(
    (id: string) => dispatch(fetchArticleBySlug(id)),
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
    fetchArticleBySlug: handleFetchArticleBySlug,
    createArticle: handleCreateArticle,
    resetArticles: handleResetArticles,
    setFilters: handleSetFilters,
  };
};

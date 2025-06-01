import { useCallback } from 'react';

import { CreateArticleType, QueryArticleType } from '@/types/ArticleType';

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
    (query: QueryArticleType) => dispatch(fetchArticles(query)),
    [dispatch]
  );

  const handleFetchArticleById = useCallback(
    (id: string) => dispatch(fetchArticleById(id)),
    [dispatch]
  );

  const handleCreateArticle = useCallback(
    (article: CreateArticleType) => dispatch(createArticle(article)),
    [dispatch]
  );

  const handleResetArticles = useCallback(
    () => dispatch(resetArticles()),
    [dispatch]
  );

  const handleSetFilters = useCallback(
    (filters: Partial<QueryArticleType>) => dispatch(setFilters(filters)),
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

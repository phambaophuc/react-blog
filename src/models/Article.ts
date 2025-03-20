import { AuthorType } from './Author';
import { CommentType } from './Comment';
import { TagType } from './Tag';

type ArticleType = {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  views: number;
  tag: TagType;
  author: AuthorType;
  comments: CommentType[];
  createdAt: string;
  updatedAt: string;
};

type QueryArticleType = {
  page?: number;
  limit?: number;
  tag?: string | null;
};

type CreateArticleType = {
  title: string;
  content: string;
  imageUrl: string;
  tagId: string;
};

type ArticleResponseType = {
  data: ArticleType[];
  page: number;
  limit: number;
  totalPages: number;
};

export type {
  ArticleType,
  QueryArticleType,
  CreateArticleType,
  ArticleResponseType,
};

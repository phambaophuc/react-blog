import { CommentType } from './CommentType';
import { TagType } from './TagType';
import { UserType } from './UserType';

type ArticleType = {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  views: number;
  tag: TagType;
  user: UserType;
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

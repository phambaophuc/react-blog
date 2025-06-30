import { Comment } from './comment';
import { BaseEntity, PaginationParams, PaginationResponse } from './common';
import { User } from './user';

export interface Article extends BaseEntity {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string | null;
  viewsCount: number;
  readingTime: number;
  author: Pick<User, 'id' | 'displayName' | 'avatarUrl'>;
  tags: string[];
  comments: Comment[];
}

export interface CreateArticleRequest {
  title: string;
  content: string;
}

export interface ArticleFilters extends PaginationParams {}

export type ArticleResponse = PaginationResponse<Article>;

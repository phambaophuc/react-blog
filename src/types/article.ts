import { Comment } from './comment';
import { BaseEntity, PaginationParams, PaginationResponse } from './common';
import { Tag } from './tag';
import { User } from './user';

export interface Article extends BaseEntity {
  title: string;
  description: string;
  content: string;
  imageUrl: string | null;
  views: number;
  user: Pick<User, 'id' | 'displayName' | 'avatarUrl'>;
  tag: Tag;
  comments: Comment[];
}

export interface CreateArticleRequest {
  title: string;
  content: string;
  tagId: string;
}

export interface ArticleFilters extends PaginationParams {
  tag?: string | null;
}

export type ArticleResponse = PaginationResponse<Article>;

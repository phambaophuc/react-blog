import { AuthorType } from './Author';

type CommentType = {
  id: string;
  content: string;
  createdAt: string;
  author: AuthorType;
  replies: CommentType[];
};

type CreateCommentType = {
  content: string;
  articleId: string;
  parentId?: string;
};

export type { CommentType, CreateCommentType };

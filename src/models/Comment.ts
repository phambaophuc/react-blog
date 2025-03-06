import { AuthorType } from './Author';

type CommentType = {
  id: string;
  content: string;
  createdAt: string;
  author: AuthorType;
  replies: CommentType[];
};

export type { CommentType };

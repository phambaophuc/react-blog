import { CommentType } from './Comment';
import { UserType } from './User';

type PostType = {
  ID: number;
  title: string;
  tag: string;
  description: string;
  content: string;
  imageUrl?: string;
  user: UserType;
  comments: CommentType[];
  CreatedAt: string;
  UpdatedAt: string;
};

type PostResponse = {
  data: PostType[];
  page: number;
  limit: number;
  totalPages: number;
};

export type { PostType, PostResponse };

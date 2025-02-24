import { TagType } from './Tag';
import { UserType } from './User';

type PostType = {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
  tag: TagType;
  user: UserType;
  createdAt: string;
  updatedAt: string;
};

type QueryPostType = {
  page?: number;
  limit?: number;
  tag?: string | null;
};

type CreatePostType = {
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
  tagName: string;
};

type PostResponseType = {
  data: PostType[];
  page: number;
  limit: number;
  totalPages: number;
};

export type { PostType, QueryPostType, CreatePostType, PostResponseType };

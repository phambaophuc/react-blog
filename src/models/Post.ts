import { TagType } from './Tag';
import { AuthorType } from './Author';

type PostType = {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  tag: TagType;
  author: AuthorType;
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
  imageUrl: string;
  tagId: string;
};

type PostResponseType = {
  data: PostType[];
  page: number;
  limit: number;
  totalPages: number;
};

export type { PostType, QueryPostType, CreatePostType, PostResponseType };

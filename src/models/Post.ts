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

type CreatePostType = {
  title: string;
  tag: string;
  description: string;
  content: string;
  imageUrl?: string;
}

type PostResponse = {
  data: PostType[];
  page: number;
  limit: number;
  totalPages: number;
};

export type { PostType, CreatePostType, PostResponse };

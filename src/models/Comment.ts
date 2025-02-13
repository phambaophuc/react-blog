import { UserType } from './User';

type CommentType = {
  id: number;
  content: string;
  user: UserType;
  postID: number;
};

export type { CommentType };

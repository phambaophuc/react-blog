import { UserType } from "./UserType";

type CommentType = {
  id: string;
  content: string;
  createdAt: string;
  user: UserType;
  replies: CommentType[];
};

type CreateCommentType = {
  content: string;
  articleId: string;
  parentId?: string;
};

export type { CommentType, CreateCommentType };

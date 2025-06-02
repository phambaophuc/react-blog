import { BaseEntity } from './common';
import { User } from './user';

export interface Comment extends BaseEntity {
  content: string;
  user: Pick<User, 'id' | 'displayName' | 'avatarUrl'>;
  replies: Comment[];
}

export interface CreateCommentRequest {
  content: string;
  articleId: string;
  parentId?: string | null;
}

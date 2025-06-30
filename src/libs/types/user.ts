import { BaseEntity } from './common';

export interface User extends BaseEntity {
  email: string;
  displayName: string;
  avatarUrl: string | null;
  refreshToken: string | null;
}

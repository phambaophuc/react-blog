import { BaseEntity } from './common';

export interface User extends BaseEntity {
  displayName: string;
  email: string;
  avatarUrl: string | null;
}

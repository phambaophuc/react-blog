import { Tag } from '@/types';

import { BaseApiClient, BaseService } from './base';

export class TagService extends BaseService {
  constructor(client: BaseApiClient) {
    super(client, '/tags');
  }

  async findAll(): Promise<Tag[]> {
    return this.client.get<Tag[]>(this.baseUrl);
  }

  async findById(id: string): Promise<Tag> {
    return this.client.get<Tag>(`${this.baseUrl}/${id}`);
  }

  async delete(id: string): Promise<void> {
    return this.client.delete<void>(`${this.baseUrl}/${id}`);
  }
}

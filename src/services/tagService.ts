import { TagType } from '@/types/TagType';

import { BaseApiClient, BaseService } from './base';

export class TagService extends BaseService {
  constructor(client: BaseApiClient) {
    super(client, '/tags');
  }

  async findAll(): Promise<TagType[]> {
    return this.client.get<TagType[]>(this.baseUrl);
  }

  async findById(id: string): Promise<TagType> {
    return this.client.get<TagType>(`${this.baseUrl}/${id}`);
  }

  // async create(tag: CreateTagType): Promise<TagType> {
  //   return this.client.post<TagType>(this.baseUrl, tag);
  // }

  // async update(id: string, tag: Partial<CreateTagType>): Promise<TagType> {
  //   return this.client.put<TagType>(`${this.baseUrl}/${id}`, tag);
  // }

  async delete(id: string): Promise<void> {
    return this.client.delete<void>(`${this.baseUrl}/${id}`);
  }
}

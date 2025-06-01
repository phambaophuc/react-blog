import { CommentType, CreateCommentType } from '@/types/CommentType';

import { BaseApiClient, BaseService } from './base';

export class CommentService extends BaseService {
  constructor(client: BaseApiClient) {
    super(client, '/comments');
  }

  // async findAll(query?: QueryCommentType): Promise<CommentType[]> {
  //   const queryString = query ? this.buildQueryParams(query) : '';
  //   return this.client.get<CommentType[]>(`${this.baseUrl}?${queryString}`);
  // }

  async findByArticleId(articleId: string): Promise<CommentType[]> {
    return this.client.get<CommentType[]>(
      `${this.baseUrl}?articleId=${articleId}`
    );
  }

  async create(comment: CreateCommentType): Promise<CommentType> {
    return this.client.post<CommentType>(this.baseUrl, comment);
  }

  async update(
    id: string,
    comment: Partial<CreateCommentType>
  ): Promise<CommentType> {
    return this.client.put<CommentType>(`${this.baseUrl}/${id}`, comment);
  }

  async delete(id: string): Promise<void> {
    return this.client.delete<void>(`${this.baseUrl}/${id}`);
  }
}

import { Comment, CreateCommentRequest } from '@/libs/types';

import { BaseApiClient, BaseService } from './base';

export class CommentService extends BaseService {
  constructor(client: BaseApiClient) {
    super(client, '/comments');
  }

  // async findAll(query?: QueryCommentType): Promise<CommentType[]> {
  //   const queryString = query ? this.buildQueryParams(query) : '';
  //   return this.client.get<CommentType[]>(`${this.baseUrl}?${queryString}`);
  // }

  async findByArticleId(articleId: string): Promise<Comment[]> {
    return this.client.get<Comment[]>(`${this.baseUrl}?articleId=${articleId}`);
  }

  async create(comment: CreateCommentRequest): Promise<Comment> {
    return this.client.post<Comment>(this.baseUrl, comment);
  }

  async update(
    id: string,
    comment: Partial<CreateCommentRequest>
  ): Promise<Comment> {
    return this.client.put<Comment>(`${this.baseUrl}/${id}`, comment);
  }

  async delete(id: string): Promise<void> {
    return this.client.delete<void>(`${this.baseUrl}/${id}`);
  }
}

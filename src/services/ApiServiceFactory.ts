import { ArticleService } from './ArticleService';
import { AuthService } from './AuthService';
import { CommentService } from './CommentService';
import { StorageService } from './StorageService';
import { TagService } from './TagService';
import { BaseApiClient } from './base';

export class ApiServiceFactory {
  private static instance: ApiServiceFactory;
  private client: BaseApiClient;

  private constructor() {
    this.client = new BaseApiClient({
      baseURL: `${import.meta.env.VITE_API_URL}/api`,
      timeout: 15000,
      retryAttempts: 3,
    });
  }

  public static getInstance(): ApiServiceFactory {
    if (!ApiServiceFactory.instance) {
      ApiServiceFactory.instance = new ApiServiceFactory();
    }
    return ApiServiceFactory.instance;
  }

  public getArticleService(): ArticleService {
    return new ArticleService(this.client);
  }

  public getAuthService(): AuthService {
    return new AuthService(this.client);
  }

  public getCommentService(): CommentService {
    return new CommentService(this.client);
  }

  public getStorageService(): StorageService {
    return new StorageService(this.client);
  }

  public getTagService(): TagService {
    return new TagService(this.client);
  }
}

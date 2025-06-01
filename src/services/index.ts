import { ApiServiceFactory } from './ApiServiceFactory';

export const useApiServices = () => {
  const factory = ApiServiceFactory.getInstance();

  return {
    articles: factory.getArticleService(),
    auth: factory.getAuthService(),
    comments: factory.getCommentService(),
    storage: factory.getStorageService(),
    tags: factory.getTagService(),
  };
};

import { useNavigation } from '@/hooks/useNavigation';

import { ROUTE_KEYS } from './routes';

export const useAppNavigation = () => {
  const { goTo } = useNavigation();

  return {
    goToArticles: () => goTo(ROUTE_KEYS.ARTICLES),
    goToArticleDetail: (id: string) => goTo(ROUTE_KEYS.ARTICLE_DETAIL, { id }),
    goToWriteArticle: () => goTo(ROUTE_KEYS.WRITE_ARTICLE),
  };
};

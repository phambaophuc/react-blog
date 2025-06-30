import { useNavigation } from './useNavigation';

export const useAppNavigation = () => {
  const navigation = useNavigation();

  return {
    // Home
    goToHome: () => navigation.goTo('HOME'),

    // Articles
    goToArticles: () => navigation.goTo('ARTICLES'),
    goToArticleDetail: (slug: string) =>
      navigation.goTo('ARTICLE_DETAIL', { slug }),
    goToWriteArticle: () => navigation.goTo('WRITE_ARTICLE'),

    // Auth
    goToSignIn: () => navigation.goTo('SIGNIN'),
    goToSignUp: () => navigation.goTo('SIGNUP'),

    // Utilities
    goBack: navigation.goBack,
    replace: navigation.replace,
    goToExternal: navigation.goToExternal,

    // Article specific actions
    editArticle: (id: string) =>
      navigation.goTo('WRITE_ARTICLE', undefined, {
        state: { editMode: true, articleId: id },
      }),

    // Auth redirects
    signInWithRedirect: (redirectTo?: string) =>
      navigation.goTo('SIGNIN', undefined, {
        state: { redirectTo },
      }),
  };
};

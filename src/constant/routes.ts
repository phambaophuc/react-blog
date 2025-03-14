const ROUTES = {
  SIGNUP: '/signup',
  SIGNIN: '/signin',
  ARTICLES: '/articles',
  ARTICLE_DETAIL: (id: string) => `/articles/${id}`,
  WRITE_ARTICLE: '/articles/write',
};

export default ROUTES;

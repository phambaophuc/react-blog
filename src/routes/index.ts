export const ROUTES = {
  // Landing
  HOME: '/',

  // Articles
  ARTICLES: '/articles',
  ARTICLE_DETAIL: '/articles/:slug',
  WRITE_ARTICLE: '/articles/write',

  // Auth
  SIGNIN: '/signin',
  SIGNUP: '/signup',
} as const;

export type RouteKey = keyof typeof ROUTES;

export const ROUTE_META = {
  HOME: {
    title: 'Home',
    requireAuth: false,
  },
  ARTICLES: {
    title: 'Articles',
    requireAuth: false,
  },
  ARTICLE_DETAIL: {
    title: 'Article Detail',
    requireAuth: false,
  },
  WRITE_ARTICLE: {
    title: 'Write Article',
    requireAuth: true,
  },
  SIGNIN: {
    title: 'Sign In',
    requireAuth: false,
  },
  SIGNUP: {
    title: 'Sign Up',
    requireAuth: false,
  },
} as const;

export const buildRoute = (
  route: RouteKey,
  params?: Record<string, string | number>
): string => {
  let path: string = ROUTES[route];

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, String(value));
    });
  }

  return path;
};

export type RouteParams = {
  HOME: undefined;
  ARTICLES: undefined;
  ARTICLE_DETAIL: { slug: string };
  WRITE_ARTICLE: undefined;
  SIGNIN: undefined;
  SIGNUP: undefined;
};

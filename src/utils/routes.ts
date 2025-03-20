const ROUTE_KEYS = {
  SIGNUP: 'SIGNUP',
  SIGNIN: 'SIGNIN',
  ARTICLES: 'ARTICLES',
  ARTICLE_DETAIL: 'ARTICLE_DETAIL',
  WRITE_ARTICLE: 'WRITE_ARTICLE',
} as const;

type RouteKey = keyof typeof ROUTE_KEYS;

export type RouteParams = {
  [ROUTE_KEYS.SIGNUP]: undefined;
  [ROUTE_KEYS.SIGNIN]: undefined;
  [ROUTE_KEYS.ARTICLES]: undefined;
  [ROUTE_KEYS.ARTICLE_DETAIL]: { id: string };
  [ROUTE_KEYS.WRITE_ARTICLE]: undefined;
};

const ROUTES: Record<
  RouteKey,
  string | ((params: RouteParams[RouteKey]) => string)
> = {
  [ROUTE_KEYS.SIGNUP]: '/signup',
  [ROUTE_KEYS.SIGNIN]: '/signin',
  [ROUTE_KEYS.ARTICLES]: '/articles',
  [ROUTE_KEYS.ARTICLE_DETAIL]: (params) => `/articles/${params!.id}`,
  [ROUTE_KEYS.WRITE_ARTICLE]: '/articles/write',
};

export const buildRoute = <K extends keyof RouteParams>(
  route: K,
  params?: RouteParams[K]
): string => {
  const routeFn = ROUTES[route];

  if (typeof routeFn === 'function') {
    if (!params) {
      throw new Error(`Missing required params for route: ${route}`);
    }
    return routeFn(params as RouteParams[K]);
  }

  return routeFn;
};

export { ROUTE_KEYS };
export default ROUTES;

import { RouteKey, RouteParams, buildRoute } from '@/routes';
import { NavigateOptions, useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  const goTo = <K extends RouteKey>(
    route: K,
    params?: RouteParams[K],
    options?: NavigateOptions
  ) => {
    const path = buildRoute(route, params as Record<string, string | number>);
    navigate(path, options);
  };

  const goBack = () => navigate(-1);

  const replace = <K extends RouteKey>(route: K, params?: RouteParams[K]) => {
    const path = buildRoute(route, params as Record<string, string | number>);
    navigate(path, { replace: true });
  };

  const goToExternal = (url: string, newTab = true) => {
    if (newTab) {
      window.open(url, '_blank');
    } else {
      window.location.href = url;
    }
  };

  return {
    goTo,
    goBack,
    replace,
    goToExternal,
  };
};

import { ROUTE_KEYS, RouteParams, buildRoute } from '@utils/routes';
import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  const goTo = <K extends keyof typeof ROUTE_KEYS>(
    routeKey: K,
    params?: RouteParams[K]
  ) => {
    const path = buildRoute(routeKey, params);
    navigate(path);
  };

  return { goTo };
};

import { ComponentType, Suspense, lazy } from 'react';

import { selectAuth } from '@/store';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Box, CircularProgress } from '@mui/material';

import ROUTES from './routes';

interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<ComponentType<any>>;
  exact?: boolean;
}

interface ProtectedRouteConfig extends RouteConfig {
  requireAuth?: boolean;
  roles?: string[];
}

const LandingPage = lazy(() => import('@/pages/Landing'));
const ArticleDetailPage = lazy(() => import('@/pages/Articles/ArticleDetail'));
const ArticlesPage = lazy(() => import('@/pages/Articles'));
const WriteArticlePage = lazy(() => import('@/pages/Articles/WriteArticle'));
const SigninPage = lazy(() => import('@/pages/SignIn'));
const SignupPage = lazy(() => import('@/pages/SignUp'));

const LoadingFallback: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      minHeight: '200px',
    }}
    role="status"
    aria-label="Loading content"
  >
    <CircularProgress size={40} thickness={4} />
  </Box>
);

const publicRoutes: RouteConfig[] = [
  {
    path: '/',
    component: LandingPage,
    exact: true,
  },
  {
    path: ROUTES.SIGNIN as string,
    component: SigninPage,
  },
  {
    path: ROUTES.SIGNUP as string,
    component: SignupPage,
  },
  {
    path: ROUTES.ARTICLES as string,
    component: ArticlesPage,
  },
  {
    path: `${ROUTES.ARTICLES}/:id`,
    component: ArticleDetailPage,
  },
];

const protectedRoutes: ProtectedRouteConfig[] = [
  {
    path: ROUTES.WRITE_ARTICLE as string,
    component: WriteArticlePage,
    requireAuth: true,
  },
];

const renderRoute = (route: RouteConfig, index: number) => {
  const Component = route.component;
  return (
    <Route
      key={`${route.path}-${index}`}
      path={route.path}
      element={<Component />}
    />
  );
};

const ProtectedRouteElement: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { user, loading } = useSelector(selectAuth);

  if (loading) {
    return <LoadingFallback />;
  }

  if (!user) {
    return <Navigate to={ROUTES.SIGNIN as string} replace />;
  }

  return <>{children}</>;
};

const renderProtectedRoute = (route: ProtectedRouteConfig, index: number) => {
  const Component = route.component;

  // TODO: Add authentication and role-based access control logic here
  // For now, render as normal route
  return (
    <Route
      key={`protected-${route.path}-${index}`}
      path={route.path}
      element={
        <ProtectedRouteElement>
          <Component />
        </ProtectedRouteElement>
      }
    />
  );
};

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map(renderRoute)}

        {/* Protected Routes */}
        {protectedRoutes.map(renderProtectedRoute)}

        {/* 404 Not Found Route - should be last */}
        <Route
          path="*"
          element={
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <h1>404 - Page Not Found</h1>
              <p>The page you're looking for doesn't exist.</p>
            </Box>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

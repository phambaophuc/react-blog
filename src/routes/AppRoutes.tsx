import { ComponentType, Suspense, lazy } from 'react';

import { useAuthModal } from '@/libs/context';
import { useAppNavigation } from '@/libs/hooks';
import { selectAuth } from '@/store';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Box, Button, CircularProgress, Typography } from '@mui/material';

import { ROUTES } from '.';

const LandingPage = lazy(() => import('@/pages/HomePage'));
const ArticleDetailPage = lazy(() => import('@/pages/ArticleDetailPage'));
const ArticlesPage = lazy(() => import('@/pages/ArticlesPage'));
const WriteArticlePage = lazy(() => import('@/pages/WriteArticlePage'));

interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<ComponentType<any>>;
  exact?: boolean;
}

interface ProtectedRouteConfig extends RouteConfig {
  requireAuth?: boolean;
  roles?: string[];
}

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
    path: ROUTES.ARTICLES as string,
    component: ArticlesPage,
  },
  {
    path: `${ROUTES.ARTICLES}/:slug`,
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
  const { goBack } = useAppNavigation();
  const { user, loading } = useSelector(selectAuth);
  const { openSignIn } = useAuthModal();

  if (loading) {
    return <LoadingFallback />;
  }

  if (!user) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          mt: 8,
          p: 4,
          maxWidth: 400,
          mx: 'auto',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Authentication Required
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Please sign in to access this page.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button variant="contained" onClick={openSignIn}>
            Sign In
          </Button>
          <Button variant="outlined" onClick={goBack}>
            Go Home
          </Button>
        </Box>
      </Box>
    );
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

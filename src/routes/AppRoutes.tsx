import React, { Suspense, lazy } from 'react';

import ROUTES from '@utils/routes';
import { Route, Routes } from 'react-router-dom';

import { Box, CircularProgress } from '@mui/material';

const Loading = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
);

const LandingPage = lazy(() => import('../pages/Landing'));

const ArticleDetailPage = lazy(() => import('../pages/Articles/ArticleDetail'));
const ArticlesPage = lazy(() => import('../pages/Articles'));
const WriteArticlePage = lazy(() => import('../pages/Articles/WriteArticle'));

const SigninPage = lazy(() => import('../pages/SignIn'));
const SignupPage = lazy(() => import('../pages/SignUp'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={ROUTES.SIGNUP as string} element={<SignupPage />} />
        <Route path={ROUTES.SIGNIN as string} element={<SigninPage />} />
        <Route path={ROUTES.ARTICLES as string} element={<ArticlesPage />} />
        <Route
          path={`${ROUTES.ARTICLES}/:id`}
          element={<ArticleDetailPage />}
        />
        <Route
          path={ROUTES.WRITE_ARTICLE as string}
          element={<WriteArticlePage />}
        />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

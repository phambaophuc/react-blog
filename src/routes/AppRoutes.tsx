import React, { Suspense, lazy } from 'react';

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

const ArticleDetailPage = lazy(() => import('../pages/Articles/ArticleDetail'));
const ArticlesPage = lazy(() => import('../pages/Articles'));
const WriteArticlePage = lazy(() => import('../pages/Articles/WriteArticle'));

const SigninPage = lazy(() => import('../pages/SignIn'));
const SignupPage = lazy(() => import('../pages/SignUp'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />

        <Route path="/articles">
          <Route index element={<ArticlesPage />} />
          <Route path=":id" element={<ArticleDetailPage />} />
          <Route path="write" element={<WriteArticlePage />} />
        </Route>

        <Route path="*" element={<ArticlesPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

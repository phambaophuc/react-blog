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

const BlogDetailPage = lazy(() => import('../pages/Blogs/BlogDetail'));
const BlogsPage = lazy(() => import('../pages/Blogs'));
const SigninPage = lazy(() => import('../pages/SignIn'));
const SignupPage = lazy(() => import('../pages/SignUp'));
const WriteBlogPage = lazy(() => import('../pages/Blogs/WriteBlog'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />

        <Route path="/blogs">
          <Route index element={<BlogsPage />} />
          <Route path=":id" element={<BlogDetailPage />} />
          <Route path="write" element={<WriteBlogPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

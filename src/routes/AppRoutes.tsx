import React, { Suspense, lazy, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Box, CircularProgress } from '@mui/material';

import { fetchUser } from '../store/authSlice';
import { AppDispatch } from '../store/store';

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
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

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

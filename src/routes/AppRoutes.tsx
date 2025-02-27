import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import HomePage from '../pages/Home';
import PostDetails from '../pages/PostDetails';
import SigninPage from '../pages/SignIn';
import SignupPage from '../pages/SignUp';
import WriteBlogPage from '../pages/WriteBlog';
import { fetchUser } from '../store/authSlice';
import { AppDispatch } from '../store/store';

const AppRoutes: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/posts/write" element={<WriteBlogPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

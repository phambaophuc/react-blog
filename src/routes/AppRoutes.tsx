import React from 'react';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import PostDetails from '../pages/PostDetails';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

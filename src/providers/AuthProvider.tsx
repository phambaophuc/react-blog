import { useEffect } from 'react';

import { fetchUser } from '@store/authSlice';
import { AppDispatch } from '@store/store';
import { useDispatch } from 'react-redux';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;

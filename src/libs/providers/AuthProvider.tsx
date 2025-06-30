import { useEffect } from 'react';

import { selectIsAuthenticated, useAppSelector } from '@/store';

import { useAuth } from '@/store/hooks';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { fetchUser } = useAuth();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated, fetchUser]);

  return <>{children}</>;
};

export default AuthProvider;

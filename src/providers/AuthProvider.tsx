import { useEffect } from 'react';

import { useAuth } from '@/store/hooks';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { fetchUser } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      fetchUser();
    }
  }, [fetchUser]);

  return <>{children}</>;
};

export default AuthProvider;

import { useCallback } from 'react';

import { SignInType, SignUpType } from '@/types/AuthType';

import { useAppDispatch, useAppSelector } from '..';
import {
  clearError,
  fetchUser,
  signIn,
  signOut,
  signUp,
} from '../slices/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const handleSignIn = useCallback(
    (credentials: SignInType) => dispatch(signIn(credentials)),
    [dispatch]
  );

  const handleSignUp = useCallback(
    (userData: SignUpType) => dispatch(signUp(userData)),
    [dispatch]
  );

  const handleSignOut = useCallback(() => dispatch(signOut()), [dispatch]);

  const handleFetchUser = useCallback(() => dispatch(fetchUser()), [dispatch]);

  const handleClearError = useCallback(
    () => dispatch(clearError()),
    [dispatch]
  );

  return {
    ...auth,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    fetchUser: handleFetchUser,
    clearError: handleClearError,
  };
};

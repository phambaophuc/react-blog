import React from 'react';

import { signIn } from '@store/authSlice';
import { AppDispatch, RootState } from '@store/store';
import { useAppNavigation } from '@utils/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { Alert, Box, Link, Typography } from '@mui/material';

import {
  StyledButton,
  StyledContainer,
  StyledPaper,
  StyledTextField,
} from './index.styled';

const SigninPage: React.FC = () => {
  const { goToArticles, goToSignup } = useAppNavigation();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    dispatch(signIn({ email, password })).unwrap().then(goToArticles);
  };

  return (
    <StyledContainer>
      <StyledPaper>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Welcome Back!
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Sign in to continue sharing your thoughts.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mt: (theme) => theme.spacing(3) }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSignIn}
          sx={{ mt: (theme) => theme.spacing(3) }}
        >
          <StyledTextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            size="small"
          />
          <StyledTextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            size="small"
          />
          <StyledButton
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </StyledButton>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={(theme) => theme.spacing(0.5)}
          mt={(theme) => theme.spacing(2)}
        >
          Don't have an account?{' '}
          <Link component="button" underline="hover" onClick={goToSignup}>
            Sign up
          </Link>
        </Typography>
      </StyledPaper>
    </StyledContainer>
  );
};

export default SigninPage;

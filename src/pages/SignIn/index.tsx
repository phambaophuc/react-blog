import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Alert, Box, Typography } from '@mui/material';

import { signIn } from '../../store/authSlice';
import { AppDispatch, RootState } from '../../store/store';
import {
  StyledButton,
  StyledContainer,
  StyledPaper,
  StyledTextField,
} from './index.styled';
import ROUTES from '../../constant/routes';

const SigninPage: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    dispatch(signIn({ email, password }))
      .unwrap()
      .then(() => navigate(ROUTES.BLOGS));
  };

  return (
    <StyledContainer>
      <StyledPaper>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Welcome Back!
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Sign in to continue sharing your thoughts.
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSignIn} sx={{ mt: 3 }}>
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
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link
            to="/signup"
            style={{ color: '#2575fc', textDecoration: 'none' }}
          >
            Sign up
          </Link>
        </Typography>
      </StyledPaper>
    </StyledContainer>
  );
};

export default SigninPage;

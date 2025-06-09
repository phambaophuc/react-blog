import React, { useState } from 'react';

import { useAppNavigation } from '@/routes/navigation';
import { useApiServices } from '@/services';

import { Alert, Box, Link, Typography } from '@mui/material';

import {
  StyledButton,
  StyledContainer,
  StyledPaper,
  StyledTextField,
} from './index.styled';

interface FormData {
  displayName: string;
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const { goToSignin } = useAppNavigation();

  const [formData, setFormData] = useState<FormData>({
    displayName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  const { auth: authService } = useApiServices();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const { displayName, email, password } = formData;
    e.preventDefault();
    if (!displayName || !email || !password) {
      setError('All fields are required.');
      return;
    }
    await authService.signUp({ displayName, email, password });
    goToSignin();
    setError('');
  };

  return (
    <StyledContainer>
      <StyledPaper>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Join Our Blogging Community
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Sign up to share your thoughts and connect with like-minded people.
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: (theme) => theme.spacing(2) }}>
            {error}
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: (theme) => theme.spacing(3) }}
        >
          <StyledTextField
            fullWidth
            label="Full Name"
            name="displayName"
            variant="outlined"
            size="small"
            value={formData.displayName}
            onChange={handleChange}
          />
          <StyledTextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            size="small"
            value={formData.email}
            onChange={handleChange}
          />
          <StyledTextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            size="small"
            value={formData.password}
            onChange={handleChange}
          />
          <StyledButton type="submit" variant="contained" fullWidth>
            Sign Up
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
          Already have an account?{' '}
          <Link component="button" underline="hover" onClick={goToSignin}>
            Sign in
          </Link>
        </Typography>
      </StyledPaper>
    </StyledContainer>
  );
};

export default SignupPage;

import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { Alert, Box, Typography } from '@mui/material';

import {
  StyledButton,
  StyledContainer,
  StyledPaper,
  StyledTextField,
} from './index.styled';

interface FormData {
  fullname: string;
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.fullname || !formData.email || !formData.password) {
      setError('All fields are required.');
      return;
    }
    setError('');
    console.log('Signup successful', formData);
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
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5 }}>
          <StyledTextField
            fullWidth
            label="Full Name"
            name="fullname"
            variant="outlined"
            size="small"
            value={formData.fullname}
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
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link
            to="/signin"
            style={{ color: '#2575fc', textDecoration: 'none' }}
          >
            Sign in
          </Link>
        </Typography>
      </StyledPaper>
    </StyledContainer>
  );
};

export default SignupPage;

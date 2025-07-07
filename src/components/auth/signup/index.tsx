import React, { useState } from 'react';

import { useApiServices } from '@/services';

import { Close, Email, Lock, Person } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, Typography } from '@mui/material';

import {
  ErrorAlert,
  SignUpLink,
  StyledButton,
  StyledDialog,
  StyledDialogContent,
  StyledDialogTitle,
  StyledTextField,
} from '../index.styled';

interface Props {
  open: boolean;
  onClose: () => void;
  switchToSignIn: () => void;
}

const SignUpModal: React.FC<Props> = ({ open, onClose, switchToSignIn }) => {
  const { auth: authService } = useApiServices();

  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { displayName, email, password } = formData;

    if (!displayName || !email || !password) {
      setError('All fields are required.');
      return;
    }

    try {
      setLoading(true);
      await authService.signUp({ displayName, email, password });
      setLoading(false);
      onClose();
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || 'Something went wrong.');
    }
  };

  const handleSignInClick = () => {
    switchToSignIn();
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <StyledDialogTitle>
        <Box />
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </StyledDialogTitle>

      <StyledDialogContent>
        <Box textAlign="center">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Create Your Account
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, lineHeight: 1.6 }}
          >
            Start your journey of sharing and discovering amazing stories
          </Typography>

          {error && <ErrorAlert severity="error">{error}</ErrorAlert>}

          <Box component="form" onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              label="Full Name"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <StyledTextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <StyledTextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mb: 3 }}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </StyledButton>
          </Box>

          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <SignUpLink onClick={handleSignInClick}>Sign in here</SignUpLink>
          </Typography>
        </Box>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default SignUpModal;

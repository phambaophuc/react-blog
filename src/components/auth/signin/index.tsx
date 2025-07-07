import React, { useState } from 'react';

import { selectAuth } from '@/store';
import { useSelector } from 'react-redux';

import {
  Close,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  Box,
  Fade,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';

import { useAuth } from '@/store/hooks';

import {
  ErrorAlert,
  SignUpLink,
  StyledButton,
  StyledDialog,
  StyledDialogContent,
  StyledDialogTitle,
  StyledTextField,
} from '../index.styled';
import { ForgotPasswordLink, StyledDivider, Subtitle } from './index.styled';

interface Props {
  open: boolean;
  onClose: () => void;
  switchToSignUp: () => void;
}

const SignInModal: React.FC<Props> = ({ open, onClose, switchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { loading, error } = useSelector(selectAuth);
  const { signIn } = useAuth();

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    signIn({ email, password }).unwrap().then(onClose);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setShowPassword(false);
    onClose();
  };

  const handleSignUpClick = () => {
    switchToSignUp();
  };

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <StyledDialogTitle>
        <Box />
        <IconButton onClick={handleClose} size="small">
          <Close />
        </IconButton>
      </StyledDialogTitle>

      <StyledDialogContent>
        <Box textAlign="center">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome Back
          </Typography>

          <Subtitle variant="body1" color="text.secondary">
            Continue your journey of sharing thoughts and discovering stories
          </Subtitle>

          {error && (
            <Fade in>
              <ErrorAlert severity="error">{error}</ErrorAlert>
            </Fade>
          )}

          <Box>
            <StyledTextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        sx={{ color: 'primary.main' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
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
              onClick={handleSignIn}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </StyledButton>
          </Box>

          <Box textAlign="center">
            <ForgotPasswordLink variant="body2">
              Forgot your password?
            </ForgotPasswordLink>

            <StyledDivider />

            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <SignUpLink onClick={handleSignUpClick}>Sign up here</SignUpLink>
            </Typography>
          </Box>
        </Box>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default SignInModal;

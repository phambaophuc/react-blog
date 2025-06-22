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
  Alert,
  Box,
  Divider,
  Fade,
  IconButton,
  InputAdornment,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { useAuth } from '@/store/hooks';

import {
  StyledButton,
  StyledDialog,
  StyledDialogContent,
  StyledDialogTitle,
  StyledTextField,
} from '../index.styled';

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    handleClose();
    switchToSignUp();
  };

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
    >
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

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, lineHeight: 1.6 }}
          >
            Continue your journey of sharing thoughts and discovering stories
          </Typography>

          {error && (
            <Fade in>
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  '& .MuiAlert-icon': {
                    color: 'error.main',
                  },
                }}
              >
                {error}
              </Alert>
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
            <Link
              component="button"
              variant="body2"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 500,
                mb: 2,
                display: 'block',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Forgot your password?
            </Link>

            <Divider sx={{ my: 2, opacity: 0.6 }} />

            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link
                component="button"
                onClick={handleSignUpClick}
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Sign up here
              </Link>
            </Typography>
          </Box>
        </Box>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default SignInModal;

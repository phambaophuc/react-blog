import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { keyframes, styled } from '@mui/system';

import { signIn } from '../../store/authSlice';
import { AppDispatch, RootState } from '../../store/store';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StyledContainer = styled(Container)({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledPaper = styled(Paper)({
  padding: '40px 30px',
  borderRadius: '12px',
  boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.15)',
  textAlign: 'center',
  maxWidth: '450px',
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  animation: `${fadeIn} 0.8s ease-in-out`,
});

const StyledButton = styled(Button)({
  marginTop: '20px',
  padding: '12px 0',
  fontSize: '16px',
  fontWeight: 'bold',
  textTransform: 'none',
  borderRadius: '8px',
  background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
  color: 'white',
  transition: '0.3s',
  '&:hover': {
    background: 'linear-gradient(135deg, #5a0fb5, #1d65d6)',
  },
});

const StyledTextField = styled(TextField)({
  marginBottom: '15px',
  '& .MuiInputBase-root': {
    fontSize: '14px',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: '6px',
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#2575fc',
  },
});

const SigninPage: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { token, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    dispatch(signIn({ email, password })).unwrap();
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

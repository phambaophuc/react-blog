import { Button, Paper, TextField } from '@mui/material';
import { Container, keyframes, styled } from '@mui/system';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const StyledContainer = styled(Container)({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const StyledPaper = styled(Paper)({
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

export const StyledButton = styled(Button)({
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

export const StyledTextField = styled(TextField)({
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

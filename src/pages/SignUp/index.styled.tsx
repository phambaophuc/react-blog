import { Button, Container, Paper, TextField, styled } from '@mui/material';
import { keyframes } from '@mui/system';

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

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5, 4),
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: theme.shadows[4],
  textAlign: 'center',
  maxWidth: theme.spacing(56),
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  animation: `${fadeIn} 0.8s ease-in-out`,
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2.5),
  padding: theme.spacing(1.5, 0),
  fontSize: theme.typography.pxToRem(16),
  fontWeight: theme.typography.fontWeightBold,
  textTransform: 'none',
  borderRadius: theme.shape.borderRadius,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.common.white,
  transition: theme.transitions.create('background', { duration: 300 }),
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiInputBase-root': {
    fontSize: theme.typography.pxToRem(14),
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: theme.shape.borderRadius,
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.secondary.main,
  },
}));

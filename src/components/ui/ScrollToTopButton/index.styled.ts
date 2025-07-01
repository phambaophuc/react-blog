import { Button, styled } from '@mui/material';

export const ScrollTopButton = styled(Button)(() => ({
  position: 'fixed',
  bottom: 32,
  right: 32,
  minWidth: 56,
  height: 56,
  borderRadius: '50%',
  backgroundColor: 'primary.main',
  color: 'white',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  '&:hover': {
    backgroundColor: 'primary.dark',
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease',
  zIndex: 1000,
}));

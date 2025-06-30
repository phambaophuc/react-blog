import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SidebarTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.1rem',
  color: theme.palette.text.primary,
}));

export const LoadingWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(4),
}));

export const EmptyStateWrapper = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(8, 2),
  color: theme.palette.text.secondary,
}));

export const StyledDivider = styled(Box)(({ theme }) => ({
  height: '1px',
  background: `linear-gradient(90deg, transparent, ${theme.palette.divider}, transparent)`,
  margin: theme.spacing(3, 0),
}));

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

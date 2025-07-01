import { Box, Typography } from '@mui/material';
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

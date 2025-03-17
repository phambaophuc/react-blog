import { MenuItem, styled } from '@mui/material';

export const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'transparent',
    fontWeight: theme.typography.fontWeightBold,
  },
  fontSize: theme.typography.fontSize,
  padding: theme.spacing(1, 3),
}));

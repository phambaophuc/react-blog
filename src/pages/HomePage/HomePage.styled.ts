import { AppBar, Box, Button, styled } from '@mui/material';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.paper,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const NavButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightRegular,
  '&:hover': {
    background: theme.palette.action.hover,
  },
}));

export const SignInButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  color: theme.palette.common.white,
  textTransform: 'none',
  padding: theme.spacing(1, 2),
  '&:hover': {
    backgroundColor: theme.palette.success.dark,
  },
}));

export const HeroButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  color: theme.palette.common.white,
  textTransform: 'none',
  padding: theme.spacing(1.5, 3),
  fontSize: theme.typography.h6.fontSize,
  marginTop: theme.spacing(4),
  '&:hover': {
    backgroundColor: theme.palette.success.dark,
  },
}));

export const Footer = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(4, 0),
  marginTop: theme.spacing(2),
}));

import { AppBar, Box, Button, styled } from '@mui/material';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.paper,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const NavButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightMedium,
  '&:hover': {
    background: theme.palette.action.hover,
    color: theme.palette.primary.main,
  },
}));

export const SignInButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  textTransform: 'none',
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const HeroButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  textTransform: 'none',
  padding: theme.spacing(1.5, 3),
  fontSize: theme.typography.h6.fontSize,
  marginTop: theme.spacing(4),
  borderRadius: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const SecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.primary.main,
  textTransform: 'none',
  padding: theme.spacing(1.5, 3),
  fontSize: theme.typography.h6.fontSize,
  marginTop: theme.spacing(4),
  marginLeft: theme.spacing(2),
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

export const FeatureCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  textAlign: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

export const CodeBlock = styled(Box)(({ theme }) => ({
  backgroundColor: '#1e1e1e',
  color: '#d4d4d4',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
  fontSize: '0.875rem',
  overflow: 'auto',
  marginTop: theme.spacing(2),
  '& .keyword': {
    color: '#569cd6',
  },
  '& .string': {
    color: '#ce9178',
  },
  '& .comment': {
    color: '#6a9955',
  },
}));

export const Footer = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(4, 0),
  marginTop: theme.spacing(6),
  backgroundColor: theme.palette.background.default,
}));

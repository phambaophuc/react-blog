import { Divider, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Subtitle = styled(Typography)({
  marginBottom: 24,
  lineHeight: 1.6,
});

export const ForgotPasswordLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'component',
})(({ theme }) => ({
  cursor: 'pointer',
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 500,
  marginBottom: theme.spacing(2),
  display: 'block',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

export const StyledDivider = styled(Divider)({
  marginTop: 16,
  marginBottom: 16,
  opacity: 0.6,
});

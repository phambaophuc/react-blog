import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ContainerWrapper = styled(Box)({
  maxWidth: 680,
  paddingLeft: 24,
  paddingRight: 24,
  paddingTop: 32,
  paddingBottom: 32,
});

export const HeaderWrapper = styled(Box)({
  marginBottom: 32,
});

export const HeaderTitle = styled(Typography)({
  fontSize: '24px',
  fontWeight: 700,
  color: '#1a1a1a',
  marginBottom: 8,
});

export const CommentsWrapper = styled(Box)({});

export const LoadMoreWrapper = styled(Box)({
  textAlign: 'center',
  marginTop: 32,
});

export const LoadMoreButton = styled(Button)({
  color: '#1a8917',
  fontSize: '14px',
  fontWeight: 500,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#156b13',
  },
});

export const EmptyState = styled(Box)({
  textAlign: 'center',
  paddingTop: 48,
  paddingBottom: 48,
});

export const EmptyMessage = styled(Typography)({
  color: '#757575',
  fontFamily: 'Georgia, serif',
  fontSize: '16px',
});

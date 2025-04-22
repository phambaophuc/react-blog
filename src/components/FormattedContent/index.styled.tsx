import { styled } from '@mui/material';

export const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
  display: 'block',
  margin: 'auto',
}));

import { styled } from '@mui/material';

export const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: theme.spacing(62),
  objectFit: 'fill',
  borderRadius: theme.shape.borderRadius,
  display: 'block',
  margin: 'auto',
}));

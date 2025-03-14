import { Card, styled } from '@mui/material';

export const StyledCard = styled(Card)({
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
});

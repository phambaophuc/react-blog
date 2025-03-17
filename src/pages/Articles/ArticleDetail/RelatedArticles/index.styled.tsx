import { Card, styled } from '@mui/material';

export const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
});

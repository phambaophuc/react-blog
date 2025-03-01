import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const StyledButton = styled(Button)({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  fontWeight: 'bold',
  textTransform: 'none',
  borderRadius: '6px',
  padding: '6px 12px',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  minWidth: 'unset',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
    transform: 'scale(1.05)',
    boxShadow: '0px 3px 10px rgba(118, 75, 162, 0.3)',
  },
});

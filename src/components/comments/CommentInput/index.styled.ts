import { Avatar, Box, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Wrapper = styled(Box)({
  display: 'flex',
  gap: 12,
});

export const UserAvatar = styled(Avatar)({
  width: 32,
  height: 32,
  flexShrink: 0,
});

export const InputContainer = styled(Box)({
  flex: 1,
});

export const StyledTextField = styled(TextField)(() => ({
  '& .MuiInput-root': {
    '&:before': { display: 'none' },
    '&:after': { display: 'none' },
  },
  '& .MuiInputBase-root': {
    fontFamily: 'Georgia, serif',
    fontSize: '16px',
    lineHeight: 1.5,
  },
  '& .MuiInputBase-input': {
    resize: 'none',
    transition: 'min-height 0.2s ease',
  },
  '& .MuiInputBase-input::placeholder': {
    color: '#757575',
    opacity: 1,
  },
}));

export const ActionBar = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 16,
  paddingTop: 16,
  borderTop: '1px solid #f0f0f0',
});

export const CancelButton = styled(Button)({
  color: '#757575',
  fontSize: 14,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#424242',
  },
});

export const SubmitButton = styled(Button)({
  backgroundColor: '#1a8917',
  color: 'white',
  borderRadius: 20,
  padding: '8px 16px',
  fontSize: 14,
  fontWeight: 500,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#156b13',
  },
  '&:disabled': {
    backgroundColor: '#ccc',
    color: 'white',
  },
});

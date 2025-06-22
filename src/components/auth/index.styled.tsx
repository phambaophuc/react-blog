import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  keyframes,
  styled,
} from '@mui/material';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-container': {
    animation: `${fadeInUp} 0.5s ease-out`,
  },
  '& .MuiDialog-paper': {
    borderRadius: theme.spacing(2),
    backgroundColor: 'white',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
    border: '1px solid #e2e8f0',
    maxWidth: 480,
    width: '100%',
    margin: theme.spacing(2),
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
  },
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(4),
  paddingTop: theme.spacing(2),
  position: 'relative',
}));

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: theme.spacing(2, 4, 0, 4),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& .MuiIconButton-root': {
    color: theme.palette.grey[500],
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1),
    backgroundColor: '#f8fafc',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#f1f5f9',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
    },
    '&.Mui-focused': {
      backgroundColor: 'white',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
    },
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
  },
  '& .MuiInputAdornment-root .MuiSvgIcon-root': {
    color: '#64748b',
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.spacing(1),
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.grey[400],
    color: 'white',
  },
}));

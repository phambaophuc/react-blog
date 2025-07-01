import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Typography,
  listItemTextClasses,
  styled,
} from '@mui/material';

export const StyledMenuPaper = styled(Paper)(({ theme }) => ({
  overflow: 'visible',
  marginTop: theme.spacing(1.5),
  minWidth: 200,
  borderRadius: theme.shape.borderRadius * 2,
  border: '1px solid rgba(0,0,0,0.05)',
  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
  elevation: 3,
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    backgroundColor: theme.palette.background.paper,
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 0,
    border: '1px solid rgba(0,0,0,0.05)',
    borderBottom: 'none',
    borderRight: 'none',
  },
}));

export const GetStartedButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  backgroundColor: '#1a8917',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 400,
  padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
  borderRadius: '20px',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: '#156f13',
    boxShadow: 'none',
  },
}));

export const StyledListItemText = styled(ListItemText)(() => ({
  [`& .${listItemTextClasses.primary}`]: {
    fontSize: '14px',
    color: '#242424',
  },
}));

export const SignInButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: '#6b6b6b',
  fontSize: '14px',
  fontWeight: 400,
  padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
  borderRadius: '20px',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.04)',
    color: '#242424',
  },
}));

export const MenuHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  borderBottom: '1px solid #f0f0f0',
}));

export const UserName = styled(Typography)({
  fontWeight: 500,
  color: '#242424',
});

export const UserEmail = styled(Typography)({
  color: '#6b6b6b',
});

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
}));

export const StyledListIcon = styled(ListItemIcon)({
  minWidth: 36,
  color: '#6b6b6b',
});

export const Wrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

export const ProfileIconButton = styled(IconButton)({
  marginLeft: 8,
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
});

export const AvatarWrapper = styled(Avatar)({
  width: 32,
  height: 32,
  border: '1px solid rgba(0,0,0,0.1)',
  fontSize: '14px',
});

export const GuestButtons = styled(Box)({
  display: 'flex',
  gap: 8,
  alignItems: 'center',
});

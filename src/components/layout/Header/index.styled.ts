import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  styled,
} from '@mui/material';

export const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: '#ffffff',
  color: '#242424',
  borderBottom: '1px solid rgba(230, 230, 230, 1)',
  position: 'sticky',
  top: 0,
  zIndex: 1100,
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: '64px',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),

  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },

  justifyContent: 'space-between',
}));

export const LogoImg = styled('img')({
  height: 32,
  cursor: 'pointer',
  transition: 'opacity 0.2s ease',
  '&:hover': {
    opacity: 0.8,
  },
});

export const SearchBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#f9f9f9',
  borderRadius: 24,
  padding: '4px 16px',
  minWidth: 240,
  transition: 'all 0.2s ease',

  '&:hover': {
    backgroundColor: '#f0f0f0',
  },

  '&:focus-within': {
    backgroundColor: '#ffffff',
    border: '1px solid #e6e6e6',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
}));

export const WriteButton = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  cursor: 'pointer',
  padding: '4px 12px',
  borderRadius: 20,
  transition: 'all 0.2s ease',
  color: '#6b6b6b',

  '&:hover': {
    color: '#242424',
  },
}));

export const IconBtn = styled(IconButton)({
  color: '#6b6b6b',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
});

export const LeftSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 24,
});

export const RightSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(2),
  },
}));

export const MobileSearchWrapper = styled(Box)({
  position: 'fixed',
  top: 64,
  left: 0,
  right: 0,
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #e6e6e6',
  padding: 16,
  zIndex: 1200,
});

export const MobileSearchBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#f9f9f9',
  borderRadius: 24,
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 8,
  paddingBottom: 8,
});

export const WriteLabel = styled(Typography)(({ theme }) => ({
  display: 'none',
  fontSize: '14px',
  fontWeight: 400,
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}));

import { useCallback, useState } from 'react';

import { SignInModal, SignUpModal } from '@/components/auth';
import { selectCurrentUser } from '@/store';
import { useSelector } from 'react-redux';

import {
  AccountCircle,
  BookmarksOutlined,
  HelpOutline,
  LibraryBooks,
  Logout,
  PersonOutline,
  Settings,
  TrendingUp,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';

import { useAuth } from '@/store/hooks';

import {
  GetStartedButton,
  SignInButton,
  StyledListItemText,
  StyledMenuPaper,
} from './index.styled';

const UserAvatar: React.FC = () => {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const user = useSelector(selectCurrentUser);
  const { signOut } = useAuth();

  const handleProfileMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogout = useCallback(() => {
    signOut();
    handleMenuClose();
  }, [handleMenuClose, signOut]);

  // Modal handlers
  const openSignIn = () => setSignInOpen(true);
  const closeSignIn = () => setSignInOpen(false);
  const openSignUp = () => setSignUpOpen(true);
  const closeSignUp = () => setSignUpOpen(false);

  const switchToSignUp = () => {
    closeSignIn();
    openSignUp();
  };

  const switchToSignIn = () => {
    closeSignUp();
    openSignIn();
  };

  const menuItems = [
    {
      icon: <PersonOutline />,
      text: 'Profile',
      action: handleMenuClose,
    },
    {
      icon: <LibraryBooks />,
      text: 'Stories',
      action: handleMenuClose,
    },
    {
      icon: <BookmarksOutlined />,
      text: 'Library',
      action: handleMenuClose,
    },
    {
      icon: <TrendingUp />,
      text: 'Stats',
      action: handleMenuClose,
    },
  ];

  const settingsItems = [
    {
      icon: <Settings />,
      text: 'Settings',
      action: handleMenuClose,
    },
    {
      icon: <HelpOutline />,
      text: 'Help',
      action: handleMenuClose,
    },
  ];

  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        component: StyledMenuPaper,
      }}
    >
      {/* User Info Header */}
      {user && (
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 500, color: '#242424' }}
          >
            {user.displayName}
          </Typography>
          <Typography variant="caption" sx={{ color: '#6b6b6b' }}>
            {user.email}
          </Typography>
        </Box>
      )}

      {/* Main Menu Items */}
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          onClick={item.action}
          sx={{
            py: 1,
            px: 2,
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.04)',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: '#6b6b6b' }}>
            {item.icon}
          </ListItemIcon>
          <StyledListItemText primary={item.text} />
        </MenuItem>
      ))}

      <Divider sx={{ my: 0.5 }} />

      {/* Settings Items */}
      {settingsItems.map((item, index) => (
        <MenuItem
          key={index}
          onClick={item.action}
          sx={{
            py: 1,
            px: 2,
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.04)',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: '#6b6b6b' }}>
            {item.icon}
          </ListItemIcon>
          <StyledListItemText primary={item.text} />
        </MenuItem>
      ))}

      <Divider sx={{ my: 0.5 }} />

      {/* Sign Out */}
      <MenuItem
        onClick={handleLogout}
        sx={{
          py: 1,
          px: 2,
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.04)',
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 36, color: '#6b6b6b' }}>
          <Logout />
        </ListItemIcon>
        <StyledListItemText primary="Sign out" />
      </MenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {user ? (
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleProfileMenuOpen}
            size="small"
            aria-label="account settings"
            sx={{
              ml: 1,
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.04)',
              },
            }}
          >
            <Avatar
              alt={user.displayName}
              src={user.avatarUrl ?? ''}
              sx={{
                width: 32,
                height: 32,
                border: '1px solid rgba(0,0,0,0.1)',
                fontSize: '14px',
              }}
            >
              <AccountCircle />
            </Avatar>
          </IconButton>
        </Tooltip>
      ) : (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <SignInButton variant="text" onClick={openSignIn}>
            Sign in
          </SignInButton>
          <GetStartedButton variant="contained" onClick={openSignUp}>
            Get started
          </GetStartedButton>
        </Box>
      )}

      <SignInModal
        open={signInOpen}
        onClose={closeSignIn}
        switchToSignUp={switchToSignUp}
      />
      <SignUpModal
        open={signUpOpen}
        onClose={closeSignUp}
        switchToSignIn={switchToSignIn}
      />

      {renderProfileMenu}
    </Box>
  );
};

export default UserAvatar;

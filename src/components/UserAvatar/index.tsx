import { useCallback, useState } from 'react';

import { useAppNavigation } from '@/routes/navigation';
import { selectCurrentUser } from '@/store';
import { useSelector } from 'react-redux';

import {
  AccountCircle as AccountCircleIcon,
  BookmarksOutlined as LibraryIcon,
  PersonOutline as ProfileIcon,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  Tooltip,
} from '@mui/material';

import { useAuth } from '@/store/hooks';

import { CustomMenuItem } from './index.styled';

const UserAvatar: React.FC = () => {
  const { goToSignin } = useAppNavigation();

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

  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <CustomMenuItem onClick={handleMenuClose}>
        <ProfileIcon sx={{ mr: (theme) => theme.spacing(1) }} /> Profile
      </CustomMenuItem>
      <CustomMenuItem onClick={handleMenuClose}>
        <LibraryIcon sx={{ mr: (theme) => theme.spacing(1) }} /> Library
      </CustomMenuItem>
      <Divider />
      <CustomMenuItem onClick={handleMenuClose}>Help</CustomMenuItem>
      <CustomMenuItem onClick={handleMenuClose}>Settings</CustomMenuItem>
      <Divider />
      <CustomMenuItem onClick={handleLogout}>Sign Out</CustomMenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        gap: (theme) => theme.spacing(1),
        alignItems: 'center',
      }}
    >
      {user ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: (theme) => theme.spacing(1),
          }}
        >
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleProfileMenuOpen}
              size="small"
              aria-label="account settings"
            >
              <Avatar
                alt={user.displayName}
                src={user.avatarUrl ?? ''}
                sx={{
                  width: (theme) => theme.spacing(4.5),
                  height: (theme) => theme.spacing(4.5),
                }}
              >
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: (theme) => theme.spacing(1) }}>
          <Button
            color="primary"
            onClick={goToSignin}
            sx={{ textTransform: 'none' }}
          >
            Sign In
          </Button>
        </Box>
      )}
      {renderProfileMenu}
    </Box>
  );
};

export default UserAvatar;

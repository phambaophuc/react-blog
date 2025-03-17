import { useCallback, useState } from 'react';

import ROUTES from '@constant/routes';
import { logout } from '@store/authSlice';
import { AppDispatch, RootState } from '@store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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

import { CustomMenuItem } from './index.styled';

const UserAvatar: React.FC = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

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
    dispatch(logout());
    handleMenuClose();
  }, [dispatch, handleMenuClose]);

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
                alt={user.user_metadata.displayName}
                src={user.user_metadata.avatarUrl}
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
            variant="outlined"
            color="primary"
            onClick={() => navigate(ROUTES.SIGNIN)}
            sx={{ textTransform: 'none' }}
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(ROUTES.SIGNUP)}
            sx={{ textTransform: 'none' }}
          >
            Sign Up
          </Button>
        </Box>
      )}
      {renderProfileMenu}
    </Box>
  );
};

export default UserAvatar;

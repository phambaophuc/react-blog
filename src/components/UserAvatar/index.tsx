import { useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';

import ROUTES from '../../constant/routes';
import { logout } from '../../store/authSlice';
import { AppDispatch, RootState } from '../../store/store';

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
      slotProps={{
        paper: {
          elevation: 3,
          sx: { width: 'fit-content' },
        },
      }}
    >
      <MenuItem
        onClick={handleMenuClose}
        sx={{ display: 'flex', alignItems: 'start' }}
      >
        <AccountCircleIcon
          sx={{ fontSize: 18, marginRight: 1, color: 'primary.main' }}
        />
        <Typography variant="body2">Profile</Typography>
      </MenuItem>
      <MenuItem
        onClick={handleLogout}
        sx={{ display: 'flex', alignItems: 'start' }}
      >
        <LogoutIcon
          sx={{ fontSize: 18, marginRight: 1, color: 'error.main' }}
        />
        <Typography variant="body2">Logout</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      {user ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="body1"
            color="primary"
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            Hello, {user.user_metadata.displayName}
          </Typography>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleProfileMenuOpen}
              size="small"
              aria-label="account settings"
            >
              <Avatar
                alt={user.user_metadata.displayName}
                src={user.user_metadata.avatarUrl}
                sx={{ width: 35, height: 35 }}
              >
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 1 }}>
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

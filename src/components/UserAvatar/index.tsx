import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Avatar, Box, Button, Menu, MenuItem, Typography } from '@mui/material';

import { logout } from '../../store/authSlice';
import { AppDispatch, RootState } from '../../store/store';

const UserAvatar: React.FC = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
  };

  console.log(user);

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      {user ? (
        <>
          <Box
            component="span"
            sx={{ cursor: 'pointer' }}
            onClick={handleMenuOpen}
          >
            <Avatar
              alt={user.user_metadata.displayName}
              src={user.user_metadata.avatarUrl ?? ''}
            />
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            sx={{ mt: 1 }}
          >
            <MenuItem onClick={handleMenuClose}>
              <Typography>{user.user_metadata.displayName}</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </>
      ) : (
        <>
          <Button
            color="primary"
            variant="text"
            size="small"
            onClick={() => navigate('/signin')}
          >
            Sign in
          </Button>
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </Button>
        </>
      )}
    </Box>
  );
};

export default UserAvatar;

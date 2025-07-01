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
import { Divider, Menu, Tooltip } from '@mui/material';

import { useAuth } from '@/store/hooks';

import {
  AvatarWrapper,
  GetStartedButton,
  GuestButtons,
  MenuHeader,
  ProfileIconButton,
  SignInButton,
  StyledListIcon,
  StyledListItemText,
  StyledMenuItem,
  StyledMenuPaper,
  UserEmail,
  UserName,
  Wrapper,
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
      {user && (
        <MenuHeader>
          <UserName variant="subtitle2">{user.displayName}</UserName>
          <UserEmail variant="caption">{user.email}</UserEmail>
        </MenuHeader>
      )}

      {menuItems.map((item, index) => (
        <StyledMenuItem key={index} onClick={item.action}>
          <StyledListIcon>{item.icon}</StyledListIcon>
          <StyledListItemText primary={item.text} />
        </StyledMenuItem>
      ))}

      <Divider sx={{ my: 0.5 }} />

      {settingsItems.map((item, index) => (
        <StyledMenuItem key={index} onClick={item.action}>
          <StyledListIcon>{item.icon}</StyledListIcon>
          <StyledListItemText primary={item.text} />
        </StyledMenuItem>
      ))}

      <Divider sx={{ my: 0.5 }} />

      <StyledMenuItem onClick={handleLogout}>
        <StyledListIcon>
          <Logout />
        </StyledListIcon>
        <StyledListItemText primary="Sign out" />
      </StyledMenuItem>
    </Menu>
  );

  return (
    <Wrapper>
      {user ? (
        <Tooltip title="Account settings">
          <ProfileIconButton
            onClick={handleProfileMenuOpen}
            size="small"
            aria-label="account settings"
          >
            <AvatarWrapper alt={user.displayName} src={user.avatarUrl ?? ''}>
              <AccountCircle />
            </AvatarWrapper>
          </ProfileIconButton>
        </Tooltip>
      ) : (
        <GuestButtons>
          <SignInButton variant="text" onClick={openSignIn}>
            Sign in
          </SignInButton>
          <GetStartedButton variant="contained" onClick={openSignUp}>
            Get started
          </GetStartedButton>
        </GuestButtons>
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
    </Wrapper>
  );
};

export default UserAvatar;

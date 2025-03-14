import UserAvatar from '@components/UserAvatar';
import ROUTES from '@constant/routes';
import useHideOnScroll from '@hooks/useHideOnScroll';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';

import { LogoWrapper, StyledToolbar } from './index.styled';

const AppHeader = () => {
  const navigate = useNavigate();
  const headerRef = useHideOnScroll();

  return (
    <AppBar
      component="div"
      ref={headerRef}
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <LogoWrapper>
            <Typography
              component="div"
              variant="h6"
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                letterSpacing: 1,
              }}
              onClick={() => navigate(ROUTES.ARTICLES)}
            >
              WELCOME TO BLOG
            </Typography>
          </LogoWrapper>
          <UserAvatar />
        </StyledToolbar>
      </Container>
    </AppBar>
  );
};

export default AppHeader;

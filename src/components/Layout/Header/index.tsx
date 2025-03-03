import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import useHideOnScroll from '../../../hooks/useHideOnScroll';
import UserAvatar from '../../UserAvatar';
import { StyledToolbar } from './index.styled';
import ROUTES from '../../../constant/routes';

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
          <Box
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}
          >
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text" color="info" size="small">
                Features
              </Button>
              <Button variant="text" color="info" size="small">
                Pricing
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                sx={{ minWidth: 0 }}
              >
                FAQ
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => navigate(ROUTES.BLOGS)}
                sx={{ minWidth: 0 }}
              >
                Blog
              </Button>
            </Box>
          </Box>
          <UserAvatar />
        </StyledToolbar>
      </Container>
    </AppBar>
  );
};

export default AppHeader;

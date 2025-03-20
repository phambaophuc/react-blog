import { useState } from 'react';

import { useAppNavigation } from '@utils/navigation';

import { Menu as MenuIcon } from '@mui/icons-material';
import {
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import {
  Footer,
  HeroButton,
  NavButton,
  SignInButton,
  StyledAppBar,
} from './index.styled';

const Landing = () => {
  const { goToSignin } = useAppNavigation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = ['Our story', 'Membership', 'Write'];

  const drawer = (
    <List>
      {navItems.map((item) => (
        <ListItem key={item}>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <StyledAppBar position="static">
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box
              component="img"
              src="/logo.svg"
              alt="Page Logo"
              sx={{ height: 40, cursor: 'pointer' }}
            />

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {navItems.map((item) => (
                  <NavButton key={item}>{item}</NavButton>
                ))}
                <SignInButton variant="contained" onClick={goToSignin}>
                  Sign in
                </SignInButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>

      <Container maxWidth="lg" sx={{ flex: 1 }}>
        <Grid
          container
          spacing={4}
          sx={{
            minHeight: '70vh',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '3rem', md: '4.5rem' },
                fontWeight: 700,
                marginBottom: 2,
              }}
            >
              Human stories & ideas
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 400,
                color: '#292929',
                marginBottom: 4,
              }}
            >
              A place to read, write, and deepen your understanding
            </Typography>
            <HeroButton variant="contained" size="large">
              Start reading
            </HeroButton>
          </Grid>
        </Grid>
      </Container>

      <Footer>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" spacing={2}>
              <NavButton>Help</NavButton>
              <NavButton>About</NavButton>
              <NavButton>Privacy</NavButton>
            </Stack>
            <Typography color="text.secondary">© 2025</Typography>
          </Stack>
        </Container>
      </Footer>
    </Box>
  );
};

export default Landing;

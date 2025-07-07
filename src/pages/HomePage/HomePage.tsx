import { useState } from 'react';

import { useAuthModal } from '@/libs/context';
import { useAppNavigation } from '@/libs/hooks';

import {
  Code,
  DevicesOther,
  GitHub,
  LinkedIn,
  Menu,
  Terminal,
  TrendingUp,
  Twitter,
} from '@mui/icons-material';
import {
  Box,
  Chip,
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
  CodeBlock,
  FeatureCard,
  Footer,
  HeroButton,
  NavButton,
  SecondaryButton,
  SignInButton,
  StyledAppBar,
} from './HomePage.styled';

const HomePage = () => {
  const { goToArticles } = useAppNavigation();
  const { openSignUp } = useAuthModal();

  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = ['Tutorials', 'Projects', 'About', 'Contact'];

  const features = [
    {
      icon: <Code sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Code Tutorials',
      description: 'Step-by-step programming guides and best practices',
    },
    {
      icon: (
        <Terminal sx={{ fontSize: 40, color: theme.palette.primary.main }} />
      ),
      title: 'DevOps & Tools',
      description: 'Server setup, deployment, and development tools',
    },
    {
      icon: (
        <DevicesOther
          sx={{ fontSize: 40, color: theme.palette.primary.main }}
        />
      ),
      title: 'Web Development',
      description: 'Frontend and backend development techniques',
    },
    {
      icon: (
        <TrendingUp sx={{ fontSize: 40, color: theme.palette.primary.main }} />
      ),
      title: 'Tech Trends',
      description: 'Latest technology trends and industry insights',
    },
  ];

  const drawer = (
    <List>
      {navItems.map((item) => (
        <ListItem key={item}>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );

  const codeSnippet = `<span class="keyword">const</span> <span class="variable">blog</span> = {
  <span class="property">name</span>: <span class="string">'DevBlog'</span>,
  <span class="property">mission</span>: <span class="string">'Share knowledge'</span>,
  <span class="property">audience</span>: <span class="string">'Developers'</span>
};

<span class="comment">// Welcome to our developer community! 🚀</span>`;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <StyledAppBar position="static">
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Code sx={{ fontSize: 32, color: theme.palette.primary.main }} />
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: theme.palette.text.primary }}
              >
                DevBlog
              </Typography>
            </Box>

            {isMobile ? (
              <IconButton
                color="primary"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <Menu />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {navItems.map((item) => (
                  <NavButton key={item}>{item}</NavButton>
                ))}
                <SignInButton variant="contained" onClick={openSignUp}>
                  Join Us
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
        {/* Hero Section */}
        <Grid
          container
          spacing={4}
          sx={{
            minHeight: '70vh',
            alignItems: 'center',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              <Chip
                label="🔥 New Articles Weekly"
                color="primary"
                sx={{ alignSelf: { xs: 'center', md: 'flex-start' } }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  marginBottom: 2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Code, Learn, Share
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  fontWeight: 400,
                  color: theme.palette.text.secondary,
                  marginBottom: 4,
                }}
              >
                A developer blog where we explore modern technologies, share
                coding tutorials, and build awesome projects together.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}
              >
                <HeroButton
                  variant="contained"
                  size="large"
                  onClick={goToArticles}
                >
                  Start Reading
                </HeroButton>
                <SecondaryButton variant="outlined" size="large">
                  View Projects
                </SecondaryButton>
              </Box>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, color: theme.palette.text.secondary }}
              >
                Latest Code Snippet
              </Typography>
              <CodeBlock dangerouslySetInnerHTML={{ __html: codeSnippet }} />
            </Box>
          </Grid>
        </Grid>

        {/* Features Section */}
        <Box sx={{ py: 6 }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              mb: 6,
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 600,
            }}
          >
            What You'll Find Here
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <FeatureCard>
                  {feature.icon}
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, mb: 1, fontWeight: 600 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Popular Tags */}
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Popular Topics
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              justifyContent: 'center',
            }}
          >
            {[
              'JavaScript',
              'React',
              'Node.js',
              'Python',
              'Docker',
              'AWS',
              'MongoDB',
              'TypeScript',
            ].map((tag) => (
              <Chip
                key={tag}
                label={tag}
                variant="outlined"
                sx={{
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.common.white,
                  },
                }}
              />
            ))}
          </Box>
        </Box>
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
              <NavButton>RSS Feed</NavButton>
              <NavButton>Newsletter</NavButton>
              <NavButton>Privacy</NavButton>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton
                size="small"
                sx={{ color: theme.palette.text.secondary }}
              >
                <GitHub />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: theme.palette.text.secondary }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: theme.palette.text.secondary }}
              >
                <LinkedIn />
              </IconButton>
              <Typography color="text.secondary">© 2025 DevBlog</Typography>
            </Stack>
          </Stack>
        </Container>
      </Footer>
    </Box>
  );
};

export default HomePage;

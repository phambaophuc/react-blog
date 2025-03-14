import ROUTES from '@constant/routes';

import { Home as HomeIcon } from '@mui/icons-material';
import { Box, Button, Paper, Typography } from '@mui/material';

const NotFound = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, #f9fafb, #f3f4f6)',
        px: 2,
        py: 4,
      }}
    >
      <Paper
        sx={{
          maxWidth: 600,
          width: '100%',
          textAlign: 'center',
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: '5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #a855f7, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          404
        </Typography>

        <Box
          component="img"
          src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b"
          alt="404 Illustration"
          sx={{
            width: 200,
            height: 200,
            borderRadius: 2,
            boxShadow: 2,
            objectFit: 'cover',
            mx: 'auto',
            mb: 2,
          }}
        />

        <Typography variant="h5" fontWeight="bold" color="text.primary" mb={2}>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          The page you're looking for seems to have wandered off into the
          digital wilderness.
        </Typography>

        <Box display="flex" justifyContent="center" gap={2} mb={3}>
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            sx={{
              background: 'linear-gradient(135deg, #9333ea, #ec4899)',
              '&:hover': {
                background: 'linear-gradient(135deg, #7e22ce, #db2777)',
              },
            }}
            onClick={() => (window.location.href = ROUTES.ARTICLES)}
          >
            Return to Home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default NotFound;

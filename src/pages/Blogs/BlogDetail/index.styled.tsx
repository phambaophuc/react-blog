import { Box, IconButton, Paper, styled } from '@mui/material';

export const StyledPaper = styled(Paper)({
  height: '100%',
  overflow: 'hidden',
  borderRadius: 16,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
});

export const ImageContainer = styled(Box)({
  position: 'relative',
  height: '100%',
  minHeight: 400,
  '@media (max-width: 960px)': {
    minHeight: 300,
  },
});

export const ContentContainer = styled(Box)({
  padding: '2rem',
  height: '100%',
  overflow: 'auto',
  '@media (max-width: 960px)': {
    padding: '1.5rem',
  },
});

export const NavigationButton = styled(IconButton)({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
});

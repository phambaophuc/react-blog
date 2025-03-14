import { Box, IconButton, Paper, styled } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  height: '100%',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
}));

export const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  minHeight: theme.spacing(50),
  [theme.breakpoints.down('md')]: {
    minHeight: theme.spacing(37),
  },
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  overflow: 'auto',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3),
  },
}));

export const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: theme.palette.common.white,
  opacity: 0.9,
  '&:hover': {
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
}));

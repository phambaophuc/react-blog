import { Box, Link as MuiLink, styled } from '@mui/material';

export const TocWrapper = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  position: 'sticky',
  top: 64,
}));

export const TocList = styled('ul')({
  listStyle: 'none',
  paddingLeft: 0,
  margin: 0,
});

export const TocItem = styled('li')<{ level: number }>(({ theme, level }) => ({
  paddingLeft: theme.spacing((level - 2) * 2),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
}));

export const TocLink = styled(MuiLink)<{ level: number }>(
  ({ theme, level }) => ({
    display: 'block',
    color: theme.palette.text.primary,
    fontSize: level === 2 ? '0.95rem' : level === 3 ? '0.88rem' : '0.82rem',
    fontWeight: level === 2 ? 600 : 400,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
    },
  })
);

import { Paper, styled } from '@mui/material';

export const EditorWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: theme.spacing(25),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  '& .ProseMirror': {
    border: 'none',
    outline: 'none',
    padding: theme.spacing(1),
    minHeight: theme.spacing(22),
    fontSize: theme.typography.pxToRem(16),
    fontFamily: theme.typography.fontFamily,
    '& img': {
      borderRadius: theme.shape.borderRadius,
      display: 'block',
      margin: 'auto',
    },
  },
}));

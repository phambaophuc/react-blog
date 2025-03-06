import { Paper, styled } from '@mui/material';

export const EditorWrapper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  minHeight: '200px',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  '& .ProseMirror': {
    border: 'none',
    outline: 'none',
    padding: theme.spacing(1),
    minHeight: '180px',
    fontSize: '16px',
    fontFamily: theme.typography.fontFamily,
    '& img': {
      width: '100%',
      height: '400px',
      objectFit: 'fill',
      borderRadius: '8px',
      display: 'block',
      margin: 'auto',
    },
  },
}));

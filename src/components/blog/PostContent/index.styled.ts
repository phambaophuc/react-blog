import { styled } from '@mui/material';

export const PostContentContainer = styled('div')(({ theme }) => ({
  maxWidth: '1000px',
  margin: '18px 0',
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: '20px',
  lineHeight: '1.58',
  color: '#292929',
  letterSpacing: '-0.003em',
  textAlign: 'justify',

  // Responsive design
  [theme.breakpoints.down('md')]: {
    fontSize: '18px',
    padding: '0 16px',
  },

  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
    padding: '0 12px',
  },
}));

export const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  maxWidth: '100%',
  objectFit: 'cover',
  display: 'block',
  margin: '32px auto',
  borderRadius: '4px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',

  // Responsive spacing
  [theme.breakpoints.down('sm')]: {
    margin: '24px auto',
    borderRadius: '2px',
  },
}));

export const StyledParagraph = styled('p')(({ theme }) => ({
  marginBottom: '30px',
  marginTop: 0,
  fontSize: 'inherit',
  lineHeight: 'inherit',
  color: 'inherit',

  '&:first-of-type': {
    marginTop: 0,
  },

  '&:last-of-type': {
    marginBottom: 0,
  },

  [theme.breakpoints.down('sm')]: {
    marginBottom: '24px',
  },
}));

export const StyledHeading1 = styled('h1')(({ theme }) => ({
  fontSize: '34px',
  fontWeight: 600,
  lineHeight: 1.2,
  margin: '48px 0 20px 0',
  color: '#292929',
  letterSpacing: '-0.02em',
  fontFamily: 'Georgia, "Times New Roman", serif',

  '&:first-of-type': {
    marginTop: 0,
  },

  [theme.breakpoints.down('md')]: {
    fontSize: '30px',
    margin: '40px 0 16px 0',
  },

  [theme.breakpoints.down('sm')]: {
    fontSize: '26px',
    margin: '32px 0 14px 0',
  },
}));

export const StyledHeading2 = styled('h2')(({ theme }) => ({
  fontSize: '28px',
  fontWeight: 600,
  lineHeight: 1.3,
  margin: '40px 0 18px 0',
  color: '#292929',
  letterSpacing: '-0.015em',
  fontFamily: 'Georgia, "Times New Roman", serif',

  [theme.breakpoints.down('md')]: {
    fontSize: '24px',
    margin: '32px 0 14px 0',
  },

  [theme.breakpoints.down('sm')]: {
    fontSize: '22px',
    margin: '28px 0 12px 0',
  },
}));

export const StyledHeading3 = styled('h3')(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 600,
  lineHeight: 1.4,
  margin: '32px 0 12px 0',
  color: '#292929',
  letterSpacing: '-0.01em',
  fontFamily: 'Georgia, "Times New Roman", serif',

  [theme.breakpoints.down('md')]: {
    fontSize: '21px',
    margin: '28px 0 10px 0',
  },

  [theme.breakpoints.down('sm')]: {
    fontSize: '19px',
    margin: '24px 0 8px 0',
  },
}));

export const StyledBlockquote = styled('blockquote')(({ theme }) => ({
  borderLeft: '3px solid #292929',
  paddingLeft: '23px',
  marginLeft: '-26px',
  marginRight: 0,
  marginTop: '32px',
  marginBottom: '32px',
  fontStyle: 'italic',
  fontSize: '21px',
  lineHeight: '1.48',
  color: '#6B6B6B',

  [theme.breakpoints.down('sm')]: {
    marginLeft: '-20px',
    paddingLeft: '17px',
    fontSize: '19px',
    marginTop: '24px',
    marginBottom: '24px',
  },
}));

export const StyledCode = styled('code')(({ theme }) => ({
  fontFamily: 'Menlo, Monaco, "Courier New", Courier, monospace',
  fontSize: '16px',
  background: '#f5f5f5',
  padding: '2px 4px',
  borderRadius: '3px',
  color: '#333',

  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
  },
}));

export const StyledPre = styled('pre')(({ theme }) => ({
  fontFamily: 'Menlo, Monaco, "Courier New", Courier, monospace',
  fontSize: '14px',
  background: '#f8f8f8',
  padding: '16px',
  borderRadius: '4px',
  overflow: 'auto',
  margin: '24px 0',
  border: '1px solid #e1e1e1',
  lineHeight: '1.45',

  '& code': {
    background: 'transparent',
    padding: 0,
    fontSize: 'inherit',
  },

  [theme.breakpoints.down('sm')]: {
    fontSize: '13px',
    padding: '12px',
    margin: '20px 0',
  },
}));

export const StyledList = styled('ul')(({ theme }) => ({
  paddingLeft: '30px',
  marginBottom: '30px',
  marginTop: 0,

  '& li': {
    marginBottom: '8px',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    color: 'inherit',
  },

  [theme.breakpoints.down('sm')]: {
    paddingLeft: '24px',
    marginBottom: '24px',
  },
}));

export const StyledOrderedList = styled('ol')(({ theme }) => ({
  paddingLeft: '30px',
  marginBottom: '30px',
  marginTop: 0,

  '& li': {
    marginBottom: '8px',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    color: 'inherit',
  },

  [theme.breakpoints.down('sm')]: {
    paddingLeft: '24px',
    marginBottom: '24px',
  },
}));

export const StyledLink = styled('a')(() => ({
  color: '#1a8917',
  textDecoration: 'underline',
  textDecorationColor: 'rgba(26, 137, 23, 0.4)',
  textUnderlineOffset: '2px',

  '&:hover': {
    textDecorationColor: '#1a8917',
  },

  '&:visited': {
    color: '#1a8917',
  },
}));

export const StyledHr = styled('hr')(({ theme }) => ({
  border: 'none',
  height: '1px',
  background: '#e1e1e1',
  margin: '48px 0',

  [theme.breakpoints.down('sm')]: {
    margin: '32px 0',
  },
}));

export const StyledStrong = styled('strong')({
  fontWeight: 600,
});

export const StyledEm = styled('em')({
  fontStyle: 'italic',
});

export const StyledTable = styled('table')(({ theme }) => ({
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  fontSize: '0.95rem',
  lineHeight: 1.5,
  border: `1px solid ${theme.palette.divider}`,
}));

export const StyledThead = styled('thead')(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
}));

export const StyledTbody = styled('tbody')({});

export const StyledTr = styled('tr')(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.selected,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const StyledTh = styled('th')(({ theme }) => ({
  padding: theme.spacing(1.5),
  border: `1px solid ${theme.palette.divider}`,
  fontWeight: 600,
  textAlign: 'left',
  backgroundColor: theme.palette.grey[100],
}));

export const StyledTd = styled('td')(({ theme }) => ({
  padding: theme.spacing(1.5),
  border: `1px solid ${theme.palette.divider}`,
  textAlign: 'left',
}));

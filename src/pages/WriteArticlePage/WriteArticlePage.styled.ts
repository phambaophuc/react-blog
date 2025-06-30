import { Box, Paper, styled } from '@mui/material';

export const WriteContainer = styled(Box)(() => ({
  minHeight: '100vh',
  backgroundColor: '#ffffff',
  position: 'relative',
}));

export const HeaderBar = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderBottom: '1px solid #f2f2f2',
  padding: theme.spacing(2, 0),
  zIndex: 1000,
  transition: 'all 0.2s ease',
}));

export const HeaderContent = styled(Box)(() => ({
  maxWidth: '740px',
  margin: '0 auto',
  padding: '0 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const LogoSection = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',

  '& .logo': {
    fontSize: '24px',
    fontWeight: 700,
    color: '#1a8917',
    textDecoration: 'none',
    fontFamily:
      '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
  },
}));

export const ActionSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const PublishButton = styled('button')(() => ({
  backgroundColor: '#1a8917',
  color: '#ffffff',
  border: 'none',
  borderRadius: '20px',
  padding: '8px 16px',
  fontSize: '14px',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',

  '&:hover': {
    backgroundColor: '#156f13',
    transform: 'translateY(-1px)',
  },

  '&:disabled': {
    backgroundColor: '#a8a8a8',
    cursor: 'not-allowed',
    transform: 'none',
  },
}));

export const SecondaryButton = styled('button')(() => ({
  backgroundColor: 'transparent',
  color: '#6B6B6B',
  border: 'none',
  borderRadius: '20px',
  padding: '8px 12px',
  fontSize: '14px',
  fontWeight: 400,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',

  '&:hover': {
    backgroundColor: '#f2f2f2',
    color: '#292929',
  },
}));

export const EditorSection = styled(Box)(() => ({
  maxWidth: '740px',
  margin: '0 auto',
  padding: '60px 20px 120px',
  minHeight: 'calc(100vh - 120px)',
}));

export const TitleInput = styled('input')(() => ({
  width: '100%',
  border: 'none',
  outline: 'none',
  backgroundColor: 'transparent',
  fontSize: '42px',
  fontWeight: 800,
  lineHeight: '1.04',
  letterSpacing: '-0.032em',
  color: '#292929',
  fontFamily:
    '"SF Compact Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  padding: 0,
  resize: 'none',

  '&::placeholder': {
    color: '#B3B3B1',
  },

  '&:focus': {
    outline: 'none',
  },
}));

export const MetaSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
  paddingBottom: theme.spacing(2),
  borderBottom: '1px solid #f2f2f2',
}));

export const TagSelector = styled(Box)(() => ({
  position: 'relative',
  minWidth: '180px',
}));

export const TagButton = styled('button')(() => ({
  backgroundColor: '#f2f2f2',
  border: '1px solid #e8e8e8',
  borderRadius: '20px',
  padding: '8px 16px',
  fontSize: '14px',
  fontWeight: 400,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: '#6B6B6B',
  transition: 'all 0.2s ease',
  fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
  width: '100%',
  justifyContent: 'space-between',

  '&:hover': {
    backgroundColor: '#e8e8e8',
    borderColor: '#d0d0d0',
  },

  '&.selected': {
    backgroundColor: '#e8f5e8',
    borderColor: '#1a8917',
    color: '#1a8917',
  },
}));

export const TagDropdown = styled(Paper)(() => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  marginTop: '4px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
  border: '1px solid #e8e8e8',
  zIndex: 1001,
  maxHeight: '240px',
  overflowY: 'auto',

  '& .tag-item': {
    padding: '12px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#292929',
    borderBottom: '1px solid #f2f2f2',
    transition: 'all 0.2s ease',
    fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',

    '&:last-of-type': {
      borderBottom: 'none',
    },

    '&:hover': {
      backgroundColor: '#f8f8f8',
    },

    '&.selected': {
      backgroundColor: '#e8f5e8',
      color: '#1a8917',
      fontWeight: 500,
    },
  },
}));

export const StatusIndicator = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '14px',
  color: '#6B6B6B',
  fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',

  '& .status-dot': {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#1a8917',
  },
}));

export const FloatingActions = styled(Box)(() => ({
  position: 'fixed',
  bottom: '40px',
  right: '40px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  zIndex: 1000,
}));

export const FloatingButton = styled('button')(() => ({
  width: '56px',
  height: '56px',
  borderRadius: '50%',
  border: 'none',
  backgroundColor: '#ffffff',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  color: '#6B6B6B',

  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#f8f8f8',
  },

  '&.primary': {
    backgroundColor: '#1a8917',
    color: '#ffffff',

    '&:hover': {
      backgroundColor: '#156f13',
    },
  },

  '& svg': {
    fontSize: '24px',
  },
}));

export const ErrorMessage = styled(Box)(() => ({
  backgroundColor: '#fef2f2',
  border: '1px solid #fecaca',
  borderRadius: '8px',
  padding: '12px 16px',
  margin: '16px 0',
  color: '#dc2626',
  fontSize: '14px',
  fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}));

export const SuccessMessage = styled(Box)(() => ({
  backgroundColor: '#f0fdf4',
  border: '1px solid #bbf7d0',
  borderRadius: '8px',
  padding: '12px 16px',
  margin: '16px 0',
  color: '#16a34a',
  fontSize: '14px',
  fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}));

// Loading overlay styles
export const LoadingOverlay = styled(Box)(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  backdropFilter: 'blur(4px)',
}));

export const LoadingContent = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  padding: '32px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',

  '& .loading-text': {
    fontSize: '16px',
    color: '#292929',
    fontWeight: 500,
    fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
  },
}));

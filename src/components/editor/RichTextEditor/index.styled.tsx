import { Box, styled } from '@mui/material';

export const EditorContainer = styled(Box)(({ theme }) => ({
  maxWidth: '740px',
  margin: '0 auto',
  padding: theme.spacing(4, 2),
  backgroundColor: '#ffffff',
  minHeight: '100vh',
  fontFamily: '"Charter", "Georgia", serif',
  position: 'relative',
}));

export const EditorWrapper = styled('div')(() => ({
  position: 'relative',

  '& .ProseMirror': {
    border: 'none',
    outline: 'none',
    padding: 0,
    minHeight: '600px',
    fontSize: '21px',
    lineHeight: '1.58',
    fontFamily: '"Charter", "Georgia", serif',
    color: '#292929',
    letterSpacing: '-0.003em',
    wordWrap: 'break-word',

    '&:focus': {
      outline: 'none',
    },

    '& h1': {
      fontSize: '42px',
      fontWeight: 800,
      lineHeight: '1.04',
      letterSpacing: '-0.032em',
      margin: '56px 0 13px 0',
      color: '#292929',
      fontFamily:
        '"sf-compact-display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',

      '&:first-of-type': {
        marginTop: 0,
      },
    },

    '& h2': {
      fontSize: '34px',
      fontWeight: 700,
      lineHeight: '1.15',
      letterSpacing: '-0.022em',
      margin: '48px 0 13px 0',
      color: '#292929',
      fontFamily:
        '"sf-compact-display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },

    '& h3': {
      fontSize: '26px',
      fontWeight: 700,
      lineHeight: '1.22',
      letterSpacing: '-0.012em',
      margin: '40px 0 13px 0',
      color: '#292929',
      fontFamily:
        '"sf-compact-display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },

    '& p': {
      fontSize: '21px',
      lineHeight: '1.58',
      letterSpacing: '-0.003em',
      margin: '0 0 29px 0',
      color: '#292929',
      fontFamily: '"Charter", "Georgia", serif',
      wordBreak: 'break-word',

      '&:last-of-type': {
        marginBottom: 0,
      },

      '&.is-editor-empty:first-of-type::before': {
        content: 'attr(data-placeholder)',
        float: 'left',
        color: '#757575',
        pointerEvents: 'none',
        height: 0,
      },
    },

    '& ul, & ol': {
      margin: '0 0 29px 0',
      paddingLeft: '24px',

      '& li': {
        fontSize: '21px',
        lineHeight: '1.58',
        letterSpacing: '-0.003em',
        margin: '0 0 8px 0',
        color: '#292929',
        fontFamily: '"Charter", "Georgia", serif',

        '&:last-of-type': {
          marginBottom: 0,
        },

        '& p': {
          margin: 0,
        },
      },
    },

    '& ul': {
      listStyleType: 'disc',

      '& li::marker': {
        color: '#757575',
      },
    },

    '& ol': {
      listStyleType: 'decimal',

      '& li::marker': {
        color: '#757575',
        fontWeight: 400,
      },
    },

    '& blockquote': {
      fontSize: '24px',
      fontStyle: 'italic',
      lineHeight: '1.48',
      letterSpacing: '-0.014em',
      margin: '32px 0',
      padding: '0 0 0 23px',
      borderLeft: '3px solid #292929',
      color: '#6B6B6B',
      fontFamily: '"Charter", "Georgia", serif',

      '& p': {
        margin: 0,
        fontSize: '24px',
        fontStyle: 'italic',
        lineHeight: '1.48',
      },
    },

    '& a': {
      color: 'inherit',
      textDecoration: 'underline',
      textDecorationColor: 'rgba(41, 41, 41, 0.4)',
      textUnderlineOffset: '2px',
      textDecorationThickness: '1px',
      transition: 'text-decoration-color 0.15s ease',

      '&:hover': {
        textDecorationColor: 'rgba(41, 41, 41, 1)',
      },
    },

    '& img': {
      display: 'block',
      margin: '32px auto',
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '4px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },

    '& strong': {
      fontWeight: 700,
      color: '#292929',
    },

    '& em': {
      fontStyle: 'italic',
    },

    // Code styles
    '& code': {
      backgroundColor: '#f2f2f2',
      padding: '3px 6px',
      borderRadius: '3px',
      fontSize: '18px',
      fontFamily:
        '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
      color: '#292929',
    },

    '& pre': {
      backgroundColor: '#f8f8f8',
      padding: '20px',
      borderRadius: '6px',
      overflow: 'auto',
      margin: '32px 0',
      border: '1px solid #e8e8e8',

      '& code': {
        backgroundColor: 'transparent',
        padding: 0,
        fontSize: '16px',
      },
    },

    // Horizontal rule
    '& hr': {
      border: 'none',
      borderTop: '1px solid #e8e8e8',
      margin: '48px 0',
    },
  },
}));

export const ToolbarWrapper = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 65,
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid #f2f2f2',
  padding: theme.spacing(1.5, 0),
  marginBottom: theme.spacing(3),
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: theme.spacing(0.5),
  flexWrap: 'wrap',

  '& .MuiIconButton-root': {
    padding: theme.spacing(0.75),
    borderRadius: '6px',
    transition: 'all 0.2s ease',

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },

    '&.Mui-disabled': {
      opacity: 0.4,
    },
  },
}));

export const FloatingToolbar = styled(Box)(({ theme }) => ({
  position: 'absolute',
  backgroundColor: '#292929',
  borderRadius: '8px',
  padding: theme.spacing(0.5),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.25),
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
  zIndex: 1000,
  opacity: 0,
  transform: 'translateY(8px) scale(0.95)',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

  '&.visible': {
    opacity: 1,
    transform: 'translateY(0) scale(1)',
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderTop: '6px solid #292929',
  },
}));

export const ToolbarButton = styled('button')(({ theme }) => ({
  border: 'none',
  background: 'transparent',
  padding: theme.spacing(0.75),
  borderRadius: '6px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  color: '#ffffff',
  minWidth: '32px',
  height: '32px',

  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: 'scale(1.05)',
  },

  '&.active': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
  },

  '& svg': {
    fontSize: '18px',
  },
}));

export const EditorFocusContainer = styled('div')(() => ({
  '&:focus-within': {
    '& .plus-button': {
      opacity: 1,
    },
  },
}));

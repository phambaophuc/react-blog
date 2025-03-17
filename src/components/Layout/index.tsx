import React, { PropsWithChildren } from 'react';

import { Box, Container, ContainerProps, CssBaseline } from '@mui/material';

import Footer from './Footer';
import AppHeader from './Header';

interface LayoutProps extends ContainerProps {
  header?: boolean;
  footer?: boolean;
}

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({
  header = true,
  footer = true,
  children,
  ...rest
}) => {
  return (
    <>
      <CssBaseline enableColorScheme />
      {header && <AppHeader />}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Container
          {...rest}
          sx={{
            flex: 1,
            my: (theme) => theme.spacing(16),
          }}
        >
          {children}
        </Container>

        {footer && <Footer />}
      </Box>
    </>
  );
};

export default Layout;

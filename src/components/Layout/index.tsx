import React, { PropsWithChildren } from 'react';

import { Box, Container, ContainerProps, CssBaseline } from '@mui/material';

import Footer from './Footer';
import AppHeader from './Header';

const Layout: React.FC<PropsWithChildren<ContainerProps>> = ({
  children,
  ...rest
}) => {
  return (
    <>
      <CssBaseline enableColorScheme />
      <AppHeader />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          background: 'linear-gradient(to bottom, #fdfbfb, #ebedee)', // Gradient sáng
        }}
      >
        <Container
          {...rest}
          sx={{
            flex: 1,
            my: 16,
          }}
        >
          {children}
        </Container>

        <Footer />
      </Box>
    </>
  );
};

export default Layout;

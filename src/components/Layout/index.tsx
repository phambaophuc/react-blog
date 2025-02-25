import React, { PropsWithChildren } from 'react';

import { Container, ContainerProps, CssBaseline } from '@mui/material';

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

      <Container {...rest} sx={{ my: 16 }}>
        {children}
      </Container>

      <Footer />
    </>
  );
};

export default Layout;

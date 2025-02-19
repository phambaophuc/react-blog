import React, { PropsWithChildren } from 'react';

import { Container, ContainerProps, CssBaseline } from '@mui/material';

import Footer from './Footer/Footer';
import Header from './Header/Header';

const Layout: React.FC<PropsWithChildren<ContainerProps>> = ({
  children,
  ...rest
}) => {
  return (
    <>
      <CssBaseline enableColorScheme />
      <Header />

      <Container {...rest} sx={{ my: 16 }}>
        {children}
      </Container>

      <Footer />
    </>
  );
};

export default Layout;

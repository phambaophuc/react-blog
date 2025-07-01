import React, { PropsWithChildren } from 'react';

import { ScrollToTopButton } from '@/components/ui';

import { Box, Container, ContainerProps, CssBaseline } from '@mui/material';

import Footer from '../Footer';
import Header from '../Header';

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
      {header && <Header />}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Container {...rest}>
          {children}
          <ScrollToTopButton />
        </Container>

        {footer && <Footer />}
      </Box>
    </>
  );
};

export default Layout;

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { MainContent } from '../components/MainContent/MainContent';

const Blog = () => {
  return (
    <>
      <CssBaseline enableColorScheme />
      <Header />

      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <MainContent />
      </Container>

      <Footer />
    </>
  );
};

export default Blog;

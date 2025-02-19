import Layout from '../components/Layout/Layout';
import { MainContent } from '../components/MainContent/MainContent';

const Blog = () => {
  return (
    <Layout
      maxWidth="lg"
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
    >
      <MainContent />
    </Layout>
  );
};

export default Blog;

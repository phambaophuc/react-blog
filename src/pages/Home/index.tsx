import Layout from '../../components/Layout';
import { MainContent } from '../../components/MainContent';

const HomePage = () => {
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

export default HomePage;

import { useCallback, useEffect, useState } from 'react';

import CardItem from '@components/CardItem';
import Layout from '@components/Layout';
import { Search } from '@components/Search';
import TagList from '@components/TagList';
import { getArticles, resetArticles } from '@store/articleSlice';
import { AppDispatch, RootState } from '@store/store';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Skeleton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

const ArticlesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: articlesData,
    loading,
    hasMore,
  } = useSelector((state: RootState) => state.articles);

  const [page, setPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const pageHeight = document.documentElement.offsetHeight;

    if (scrollPosition >= pageHeight - 100) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    dispatch(resetArticles());
    setPage(1);
  }, [selectedTag, dispatch]);

  useEffect(() => {
    dispatch(getArticles({ page: page, tag: selectedTag }));
  }, [page, selectedTag, dispatch]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <Layout maxWidth="lg" component="main" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Technology & Wellness Blog
        </Typography>
        <Search />
        <TagList onTagSelect={setSelectedTag} />
      </Box>

      <Grid container spacing={3}>
        {articlesData.map((article) => (
          <CardItem data={article} key={article.id}/>
        ))}

        {loading &&
          Array.from(new Array(3)).map((_, index) => (
            <Grid key={index} size={{ xs: 12, md: 4 }}>
              <Skeleton variant="rectangular" height={200} />
              <Skeleton />
              <Skeleton width="60%" />
            </Grid>
          ))}
      </Grid>
    </Layout>
  );
};

export default ArticlesPage;

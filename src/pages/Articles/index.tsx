import { useCallback, useEffect, useState } from 'react';

import { PostCard, RecentPosts, SearchBox, TagList } from '@/components/blog';
import { Layout } from '@/components/layout';
import { selectArticles } from '@/store';
import { useSelector } from 'react-redux';

import { Box, Chip, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { useArticles } from '@/store/hooks';

const ArticlesPage = () => {
  const { articles, loading, hasMore } = useSelector(selectArticles);

  const [page, setPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const { resetArticles, fetchArticles } = useArticles();

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
    resetArticles();
    setPage(1);
  }, [selectedTag]);

  useEffect(() => {
    fetchArticles({ page, tag: selectedTag });
  }, [page, selectedTag]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <Layout
      footer={false}
      maxWidth="lg"
      component="main"
      sx={{ py: (theme) => theme.spacing(4) }}
    >
      <Box sx={{ mb: (theme) => theme.spacing(4) }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Technology & Wellness Blog
        </Typography>
        <SearchBox />
        <TagList onTagSelect={setSelectedTag} />
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          {articles.map((article) => (
            <PostCard article={article} key={article.id} />
          ))}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ position: 'sticky', top: (theme) => theme.spacing(2.5) }}>
            <Box sx={{ mb: (theme) => theme.spacing(4) }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: (theme) => theme.typography.fontFamily,
                  mb: (theme) => theme.spacing(2),
                }}
              >
                Discover more of what matters to you
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: (theme) => theme.spacing(1),
                }}
              >
                <Chip
                  label="Technology"
                  sx={{
                    backgroundColor: (theme) => theme.palette.grey[200],
                    color: (theme) => theme.palette.text.primary,
                    borderRadius: (theme) => theme.shape.borderRadius,
                  }}
                  clickable
                />
                <Chip
                  label="Programming"
                  sx={{
                    backgroundColor: (theme) => theme.palette.grey[200],
                    color: (theme) => theme.palette.text.primary,
                    borderRadius: (theme) => theme.shape.borderRadius,
                  }}
                  clickable
                />
              </Box>
            </Box>

            <Divider sx={{ mb: (theme) => theme.spacing(4) }} />

            <RecentPosts />
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ArticlesPage;

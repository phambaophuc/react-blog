import { useCallback, useEffect, useState } from 'react';

import Layout from '@components/Layout';
import { Search } from '@components/Search';
import TagList from '@components/TagList';
import ROUTES from '@constant/routes';
import { getArticles, resetArticles } from '@store/articleSlice';
import { AppDispatch, RootState } from '@store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShareIcon from '@mui/icons-material/Share';
import {
  Avatar,
  Box,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { StyledCard } from './index.styled';

const BlogsPage = () => {
  const navigate = useNavigate();

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
        {loading
          ? Array.from(new Array(3)).map((_, index) => (
              <Grid key={index} size={{ xs: 12, md: 4 }}>
                <Skeleton variant="rectangular" height={200} />
                <Skeleton />
                <Skeleton width="60%" />
              </Grid>
            ))
          : articlesData.map((article) => (
              <Grid
                component="div"
                key={article.id}
                size={{ xs: 12, md: 4 }}
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(ROUTES.ARTICLE_DETAIL(article.id))}
              >
                <StyledCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={article.imageUrl}
                    alt={article.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {article.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2, textAlign: 'justify' }}
                    >
                      {article.description}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        gap: 1,
                      }}
                    >
                      <Avatar
                        src={article.author.avatarUrl}
                        alt={article.author.displayName}
                        sx={{ width: 32, height: 32 }}
                      />
                      <Typography variant="body2">
                        {article.author.displayName}
                      </Typography>
                      <Box sx={{ flexGrow: 1 }} />
                      <AccessTimeIcon sx={{ mr: 0.5 }} />
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip
                        key={article.tag.id}
                        label={article.tag.name}
                        size="small"
                        sx={{ mr: 0.5 }}
                      />
                      <Box sx={{ flexGrow: 1 }} />
                      <IconButton size="small">
                        <ShareIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
      </Grid>
    </Layout>
  );
};

export default BlogsPage;

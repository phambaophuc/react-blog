import { useCallback, useEffect, useState } from 'react';

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

import Layout from '../../components/Layout';
import { Search } from '../../components/Search';
import TagList from '../../components/TagList';
import ROUTES from '../../constant/routes';
import { getPosts, resetPosts } from '../../store/postSlice';
import { AppDispatch, RootState } from '../../store/store';
import { StyledCard } from './index.styled';

const BlogsPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const {
    data: postsData,
    loading,
    hasMore,
  } = useSelector((state: RootState) => state.posts);

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
    dispatch(resetPosts());
    setPage(1);
  }, [selectedTag, dispatch]);

  useEffect(() => {
    dispatch(getPosts({ page: page, tag: selectedTag }));
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
          : postsData.map((post) => (
              <Grid
                component="div"
                key={post.id}
                size={{ xs: 12, md: 4 }}
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(ROUTES.BLOG_DETAIL(post.id))}
              >
                <StyledCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.imageUrl}
                    alt={post.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2, textAlign: 'justify' }}
                    >
                      {post.description}
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
                        src={post.author.avatarUrl}
                        alt={post.author.displayName}
                        sx={{ width: 32, height: 32 }}
                      />
                      <Typography variant="body2">
                        {post.author.displayName}
                      </Typography>
                      <Box sx={{ flexGrow: 1 }} />
                      <AccessTimeIcon sx={{ mr: 0.5 }} />
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip
                        key={post.tag.id}
                        label={post.tag.name}
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

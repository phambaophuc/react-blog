import { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { getPosts, resetPosts } from '../../store/postSlice';
import { AppDispatch, RootState } from '../../store/store';
import CardItem from '../CardItem';
import { Search } from '../Search';
import WriteBlogButton from '../WriteBlogButton';
import TagList from './TagList';

const MainContent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, hasMore } = useSelector(
    (state: RootState) => state.posts
  );

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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          Welcome
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            width: '100%',
            justifyContent: 'space-between',
            alignItems: { xs: 'start', md: 'center' },
            gap: 4,
            padding: '0px 4px',
            overflow: 'hidden',
          }}
        >
          <WriteBlogButton />
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'row',
              gap: 1,
              width: { xs: '100%', md: 'fit-content' },
              overflow: 'auto',
            }}
          >
            <Search />
            <IconButton size="small" aria-label="RSS feed">
              <RssFeedRoundedIcon />
            </IconButton>
          </Box>
        </Box>
      </div>

      <TagList onTagSelect={setSelectedTag} />

      <Grid container spacing={2} columns={12}>
        {data.slice(0, 2).map((post) => (
          <Grid size={{ xs: 12, md: 6 }} key={post.id}>
            <CardItem data={post} />
          </Grid>
        ))}
        {data.slice(2, data.length).map((post) => (
          <Grid size={{ xs: 12, md: 4 }} key={post.id}>
            <CardItem data={post} />
          </Grid>
        ))}
      </Grid>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export { MainContent, Search };

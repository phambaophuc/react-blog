import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Box, Paper, Typography } from '@mui/material';

import FormattedContent from '../../components/FormattedContent';
import Layout from '../../components/Layout';
import { getPostByID } from '../../store/postSlice';
import { AppDispatch, RootState } from '../../store/store';

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { currentPost } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (id) dispatch(getPostByID(id));
    window.scroll(0, 0);
  }, [id, dispatch]);

  if (!currentPost) {
    return <Typography>Post not found</Typography>;
  }

  return (
    <Layout maxWidth="md">
      <Paper elevation={3} sx={{ overflow: 'hidden' }}>
        <Box
          component="img"
          src={currentPost.imageUrl}
          alt={currentPost.title}
          sx={{
            width: '100%',
            height: 300,
            objectFit: 'cover',
          }}
        />

        <Box sx={{ p: 4 }}>
          <Typography variant="h3" component="h2" gutterBottom>
            {currentPost.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {currentPost.author.displayName} |{' '}
            {new Date(currentPost.createdAt).toLocaleDateString()}
          </Typography>
          <FormattedContent content={currentPost.content} />
        </Box>
      </Paper>
    </Layout>
  );
};

export default BlogDetail;

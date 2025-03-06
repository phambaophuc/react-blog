import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import { Avatar, Box, IconButton, Typography } from '@mui/material';

import FormattedContent from '../../../components/FormattedContent';
import Layout from '../../../components/Layout';
import { getPostByID } from '../../../store/postSlice';
import { AppDispatch, RootState } from '../../../store/store';
import { formatDate } from '../../../utils/dateUtils';
import Comments from './Comments';
import RelatedPosts from './RelatedPosts';

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { postData } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (id) dispatch(getPostByID(id));
    window.scroll(0, 0);
  }, [id, dispatch]);

  if (!postData) {
    return <Typography>Blog not found</Typography>;
  }

  return (
    <Layout maxWidth="xl" sx={{ py: 4, minHeight: '100vh' }}>
      <Box component="article" sx={{ mb: 6 }}>
        <Typography variant="h2" gutterBottom>
          {postData.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar src={postData.author.avatarUrl} sx={{ mr: 2 }} />
          <Box>
            <Typography variant="subtitle1">
              Written by {postData.author.displayName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Published on {formatDate(postData.createdAt)}
            </Typography>
          </Box>
        </Box>
        <Box
          component="img"
          src={postData.imageUrl}
          alt={postData.title}
          sx={{
            width: '100%',
            height: 400,
            objectFit: 'cover',
            borderRadius: 2,
            mb: 4,
          }}
        />
        <FormattedContent content={postData.content} />
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <IconButton>
            <ShareIcon />
          </IconButton>
          <IconButton>
            <BookmarkIcon />
          </IconButton>
        </Box>
      </Box>

      <RelatedPosts postId={postData.id} />
      <Comments comments={postData.comments} />
    </Layout>
  );
};

export default BlogDetailPage;

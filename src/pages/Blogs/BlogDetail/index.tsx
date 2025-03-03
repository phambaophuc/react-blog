import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import {
  Avatar,
  Box,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import FormattedContent from '../../../components/FormattedContent';
import Layout from '../../../components/Layout';
import { getPostByID } from '../../../store/postSlice';
import { AppDispatch, RootState } from '../../../store/store';
import { formatDate } from '../../../utils/formatDate';
import { ContentContainer, ImageContainer, StyledPaper } from './index.styled';

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
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <StyledPaper>
            <ImageContainer>
              <CardMedia
                component="img"
                image={postData.imageUrl}
                alt={postData.title}
                sx={{ height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </ImageContainer>
          </StyledPaper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <StyledPaper>
            <ContentContainer>
              <Typography variant="h3" gutterBottom>
                {postData.title}
              </Typography>
              <Box
                sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar
                    src={postData.author.avatarUrl}
                    alt={postData.author.displayName}
                    sx={{ width: 32, height: 32 }}
                  />
                  <Typography variant="subtitle1" color="text.secondary">
                    {postData.author.displayName}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" color="text.secondary">
                  {formatDate(postData.createdAt)}
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Chip
                  key={postData.tag.id}
                  label={postData.tag.name}
                  sx={{ mr: 1, mb: 1 }}
                  variant="outlined"
                />
              </Box>
              <FormattedContent content={postData.content} />
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <IconButton aria-label="Share">
                  <ShareIcon />
                </IconButton>
                <IconButton aria-label="Like">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="Bookmark">
                  <BookmarkIcon />
                </IconButton>
              </Box>
            </ContentContainer>
          </StyledPaper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default BlogDetailPage;

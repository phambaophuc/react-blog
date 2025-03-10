import React, { useCallback, useEffect, useState } from 'react';

import ROUTES from '@constant/routes';
import { PostType } from '@models/Post';
import { postService } from '@services/postService';
import { formatDate } from '@utils/dateUtils';
import { useNavigate } from 'react-router-dom';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { StyledCard } from './index.styled';

const RelatedPosts = ({ postId }: { postId: string }) => {
  const navigate = useNavigate();
  const [relatedPosts, setRelatedPosts] = useState<PostType[]>([]);

  const fetchPost = useCallback(async () => {
    const posts = await postService.findAllRelated(postId);
    setRelatedPosts(posts);
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Related Posts
      </Typography>
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {relatedPosts.map((post) => (
          <Grid
            component="div"
            size={{ xs: 12, sm: 6, md: 4 }}
            sx={{ cursor: 'pointer' }}
            key={post.id}
            onClick={() => navigate(ROUTES.BLOG_DETAIL(post.id))}
          >
            <StyledCard>
              <CardMedia
                component="img"
                height="200"
                image={post.imageUrl}
                alt={post.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {post.description}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Chip label={post.tag.name} size="small" />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTimeIcon sx={{ mr: 2 }} />
                    <Typography variant="caption">
                      {formatDate(post.createdAt)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default React.memo(RelatedPosts);

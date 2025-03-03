import { useCallback, useEffect, useState } from 'react';

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { PostType } from '../../models/Post';
import { postService } from '../../services/postService';

const RelatedTag = ({ id }: { id: string }) => {
  const [relatedPosts, setRelatedPosts] = useState<PostType[]>([]);

  const fetchPost = useCallback(async () => {
    const posts = await postService.getRelatedPosts(id);
    setRelatedPosts(posts);
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom fontWeight={600} textAlign="center">
        Bài viết liên quan
      </Typography>
      <Grid container spacing={3}>
        {relatedPosts.map((post) => (
          <Grid sx={{ xs: 12, sm: 6, md: 4 }} key={post.id}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                transition: '0.3s',
                '&:hover': { boxShadow: 6 },
              }}
            >
              <CardActionArea href={`/post/${post.id}`}>
                {post.imageUrl && (
                  <CardMedia
                    component="img"
                    height="160"
                    image={post.imageUrl}
                    alt={post.title}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {post.title}
                  </Typography>
                  <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
                    <Chip label={post.tag.name} color="primary" size="small" />
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RelatedTag;

import React, { useEffect, useState } from 'react';

import { useAppNavigation } from '@/routes/navigation';
import { useApiServices } from '@/services';
import { Article } from '@/types';
import { formatDate } from '@/utils/dateUtils';

import { AccessTime } from '@mui/icons-material';
import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { StyledCard } from './index.styled';

interface Props {
  articleId: string;
}

const RelatedPosts: React.FC<Props> = ({ articleId }) => {
  const { goToArticleDetail } = useAppNavigation();
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  const { articles: articleService } = useApiServices();

  useEffect(() => {
    if (!articleId) {
      setRelatedArticles([]);
      return;
    }

    const fetchData = async () => {
      const articles = await articleService.findAllRelated(articleId);
      setRelatedArticles(articles);
    };

    fetchData();
  }, [articleId]);

  return (
    <Box sx={{ mb: (theme) => theme.spacing(6) }}>
      <Typography variant="h4" sx={{ mb: (theme) => theme.spacing(4) }}>
        Related Articles
      </Typography>
      <Grid container spacing={4} sx={{ mb: (theme) => theme.spacing(6) }}>
        {relatedArticles.map((article) => (
          <Grid
            component="div"
            size={{ xs: 12, sm: 12, md: 6 }}
            sx={{ cursor: 'pointer' }}
            key={article.id}
            onClick={() => goToArticleDetail(article.id)}
          >
            <StyledCard>
              <CardMedia
                component="img"
                image={article.coverImageUrl ?? ''}
                alt={article.title}
                sx={{
                  height: (theme) => theme.spacing(25),
                }}
              />
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {article.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: (theme) => theme.spacing(2),
                    textAlign: 'justify',
                    hyphens: 'auto',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {article.excerpt}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* <Chip label={article.tag.name} size="small" /> */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTime sx={{ mr: (theme) => theme.spacing(2) }} />
                    <Typography variant="caption">
                      {formatDate(article.createdAt)}
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

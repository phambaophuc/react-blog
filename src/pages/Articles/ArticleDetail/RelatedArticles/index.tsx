import { useEffect, useState } from 'react';

import ROUTES from '@constant/routes';
import { ArticleType } from '@models/Article';
import { articleService } from '@services/articleService';
import { formatDate } from '@utils/dateUtils';
import { useNavigate } from 'react-router-dom';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { StyledCard } from './index.styled';

const RelatedArticles = ({ articleId }: { articleId: string }) => {
  const navigate = useNavigate();
  const [relatedArticles, setRelatedArticles] = useState<ArticleType[]>([]);

  useEffect(() => {
    if (!articleId) return;
    setRelatedArticles([]);

    let isMounted = true;
    articleService.findAllRelated(articleId).then((articles) => {
      if (isMounted) setRelatedArticles(articles);
    });

    return () => {
      isMounted = false;
    };
  }, [articleId]);

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Related Articles
      </Typography>
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {relatedArticles.map((article) => (
          <Grid
            component="div"
            size={{ xs: 12, sm: 6, md: 4 }}
            sx={{ cursor: 'pointer' }}
            key={article.id}
            onClick={() => navigate(ROUTES.ARTICLE_DETAIL(article.id))}
          >
            <StyledCard>
              <CardMedia
                component="img"
                height="200"
                image={article.imageUrl}
                alt={article.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {article.description}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Chip label={article.tag.name} size="small" />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTimeIcon sx={{ mr: 2 }} />
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

export default RelatedArticles;

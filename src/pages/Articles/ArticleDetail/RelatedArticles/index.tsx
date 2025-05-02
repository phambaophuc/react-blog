import { useEffect, useState } from 'react';

import { ArticleType } from '@models/ArticleType';
import { articleService } from '@services/articleService';
import { formatDate } from '@utils/dateUtils';
import { useAppNavigation } from '@utils/navigation';

import { AccessTime as AccessTimeIcon } from '@mui/icons-material';
import { Box, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { StyledCard } from './index.styled';

const RelatedArticles = ({ articleId }: { articleId: string }) => {
  const { goToArticleDetail } = useAppNavigation();
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
                image={article.imageUrl}
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
                    <AccessTimeIcon sx={{ mr: (theme) => theme.spacing(2) }} />
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

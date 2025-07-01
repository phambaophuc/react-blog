import React, { useEffect, useState } from 'react';

import { useAppNavigation } from '@/libs/hooks';
import { Article } from '@/libs/types';
import { formatDate } from '@/libs/utils';
import { useApiServices } from '@/services';

import { AccessTime } from '@mui/icons-material';
import { Box, CardMedia, Grid2, Typography } from '@mui/material';

import {
  ExcerptTypography,
  FooterBox,
  StyledCard,
  StyledCardContent,
  TimeInfoBox,
  TitleTypography,
} from './index.styled';

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

      <Grid2 container spacing={4} sx={{ mb: (theme) => theme.spacing(6) }}>
        {relatedArticles.map((article) => (
          <Grid2
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
                sx={{ height: (theme) => theme.spacing(25) }}
              />
              <StyledCardContent>
                <TitleTypography variant="h6" gutterBottom>
                  {article.title}
                </TitleTypography>
                <ExcerptTypography variant="body2" color="text.secondary">
                  {article.excerpt}
                </ExcerptTypography>
                <FooterBox>
                  <TimeInfoBox>
                    <AccessTime />
                    <Typography variant="caption">
                      {formatDate(article.createdAt)}
                    </Typography>
                  </TimeInfoBox>
                </FooterBox>
              </StyledCardContent>
            </StyledCard>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default React.memo(RelatedPosts);

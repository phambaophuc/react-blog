import React, { useEffect, useState } from 'react';

import { useAppNavigation } from '@/libs/hooks';
import { Article } from '@/libs/types';
import { formatDate } from '@/libs/utils';
import { useApiServices } from '@/services';

import { Box, Typography } from '@mui/material';

import { StyledTitle } from './index.styled';

const RecentPosts: React.FC = () => {
  const { goToArticleDetail } = useAppNavigation();
  const { articles: articleService } = useApiServices();

  const [articles, setArticles] = useState<Article[]>();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await articleService.findAll({ limit: 2 });
      setArticles(data);
    };

    fetchData();
  }, []);

  return (
    <Box>
      {articles &&
        articles.map((article) => (
          <Box key={article.id} sx={{ mb: (theme) => theme.spacing(3) }}>
            <StyledTitle
              variant="subtitle1"
              onClick={() => goToArticleDetail(article.slug)}
            >
              {article.title}
            </StyledTitle>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {article.author.displayName} · {formatDate(article.createdAt)}
            </Typography>
          </Box>
        ))}
    </Box>
  );
};

export default React.memo(RecentPosts);

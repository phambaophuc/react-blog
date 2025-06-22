import React, { useEffect, useState } from 'react';

import { useAppNavigation } from '@/routes/navigation';
import { useApiServices } from '@/services';
import { Article } from '@/types';
import { formatDate } from '@/utils/dateUtils';

import { Box, Typography } from '@mui/material';

const RecentPosts: React.FC = () => {
  const { goToArticleDetail } = useAppNavigation();
  const { articles: articleService } = useApiServices();

  const [articles, setArticles] = useState<Article[]>();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await articleService.findAll({ limit: 3 });
      setArticles(data);
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontFamily: (theme) => theme.typography.fontFamily,
          mb: (theme) => theme.spacing(2),
        }}
      >
        Recent Stories
      </Typography>

      {articles &&
        articles.map((article) => (
          <Box key={article.id} sx={{ mb: (theme) => theme.spacing(3) }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: (theme) => theme.typography.fontWeightBold,
                mb: (theme) => theme.spacing(1),
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
              onClick={() => goToArticleDetail(article.id)}
            >
              {article.title}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {article.user.displayName} · {formatDate(article.createdAt)}
            </Typography>
          </Box>
        ))}
    </Box>
  );
};

export default React.memo(RecentPosts);

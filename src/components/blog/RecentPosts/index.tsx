import React, { useEffect, useState } from 'react';

import { useAppNavigation } from '@/libs/hooks';
import { Article } from '@/libs/types';
import { formatDate } from '@/libs/utils';
import { useApiServices } from '@/services';

import { Box, Typography } from '@mui/material';

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
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: (theme) => theme.typography.fontWeightBold,
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
              {article.author.displayName} · {formatDate(article.createdAt)}
            </Typography>
          </Box>
        ))}
    </Box>
  );
};

export default React.memo(RecentPosts);

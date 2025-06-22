import { useEffect, useState } from 'react';

import { PostContent, RelatedPosts } from '@/components/blog';
import { Comment } from '@/components/comments';
import { Layout } from '@/components/layout';
import { useApiServices } from '@/services';
import { Article } from '@/types';
import { formatDate } from '@/utils/dateUtils';
import { useParams } from 'react-router-dom';

import { Bookmark, Share } from '@mui/icons-material';
import { Avatar, Box, IconButton, Typography } from '@mui/material';

const ArticleDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [articleData, setArticleData] = useState<Article | null>();

  const { articles: articleService } = useApiServices();

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      const article = await articleService.findById(id);
      setArticleData(article);
    };

    fetchArticle();
  }, [id]);

  return (
    <Layout
      maxWidth="md"
      sx={{
        py: (theme) => theme.spacing(4),
        minHeight: '100vh',
      }}
    >
      {articleData && (
        <>
          <Box component="article" sx={{ mb: (theme) => theme.spacing(6) }}>
            <Typography variant="h3" gutterBottom>
              {articleData.title}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: (theme) => theme.spacing(3),
              }}
            >
              <Avatar
                src={articleData.user.avatarUrl ?? ''}
                sx={{ mr: (theme) => theme.spacing(2) }}
              />
              <Box>
                <Typography variant="subtitle1">
                  Written by {articleData.user.displayName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Published on {formatDate(articleData.createdAt)}
                </Typography>
              </Box>
            </Box>

            <PostContent content={articleData.content} />

            <Box
              sx={{
                display: 'flex',
                gap: (theme) => theme.spacing(2),
                mb: (theme) => theme.spacing(4),
              }}
            >
              <IconButton>
                <Share />
              </IconButton>
              <IconButton>
                <Bookmark />
              </IconButton>
            </Box>
          </Box>

          <RelatedPosts articleId={articleData.id} />
          <Comment comments={articleData.comments} />
        </>
      )}
    </Layout>
  );
};

export default ArticleDetailPage;

import { useEffect, useState } from 'react';

import FormattedContent from '@/components/FormattedContent';
import Layout from '@/components/Layout';
import { useApiServices } from '@/services';
import { ArticleType } from '@/types/ArticleType';
import { formatDate } from '@/utils/dateUtils';
import { useAppNavigation } from '@/utils/navigation';
import { useParams } from 'react-router-dom';

import {
  Bookmark as BookmarkIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';

import Comments from './Comments';
import RelatedArticles from './RelatedArticles';

const ArticleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { goToArticles } = useAppNavigation();

  const [articleData, setArticleData] = useState<ArticleType | null>();

  const { articles: articleService } = useApiServices();

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      const article = await articleService.findById(id);
      setArticleData(article);
    };

    fetchArticle();
    window.scrollTo(0, 0);
  }, [articleService, id]);

  if (!articleData) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="button" gutterBottom display="block" color="error">
          Article not found
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={goToArticles}
        >
          Go Back to Articles
        </Button>
      </Box>
    );
  }

  return (
    <Layout
      maxWidth="md"
      sx={{
        py: (theme) => theme.spacing(4),
        minHeight: '100vh',
      }}
    >
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
            src={articleData.user.avatarUrl}
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

        <FormattedContent content={articleData.content} />

        <Box
          sx={{
            display: 'flex',
            gap: (theme) => theme.spacing(2),
            mb: (theme) => theme.spacing(4),
          }}
        >
          <IconButton>
            <ShareIcon />
          </IconButton>
          <IconButton>
            <BookmarkIcon />
          </IconButton>
        </Box>
      </Box>

      <RelatedArticles articleId={articleData.id} />
      <Comments comments={articleData.comments} />
    </Layout>
  );
};

export default ArticleDetailPage;

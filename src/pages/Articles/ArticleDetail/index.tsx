import { useEffect } from 'react';

import { PostContent, RelatedPosts } from '@/components/blog';
import { CommentList } from '@/components/comments';
import { Layout } from '@/components/layout';
import { selectCurrentArticle } from '@/store';
import { formatDate } from '@/utils/dateUtils';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Bookmark, Share } from '@mui/icons-material';
import { Avatar, Box, IconButton, Typography } from '@mui/material';

import { useArticles } from '@/store/hooks';
import { useComments } from '@/store/hooks/useComments';

const ArticleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchArticleById } = useArticles();
  const { initComments } = useComments();

  const currArticle = useSelector(selectCurrentArticle);

  useEffect(() => {
    if (!id) return;
    fetchArticleById(id);
  }, [id]);

  useEffect(() => {
    if (!currArticle) return;
    initComments(currArticle.comments);
  }, [currArticle]);

  return (
    <Layout
      maxWidth="md"
      sx={{
        py: (theme) => theme.spacing(4),
        minHeight: '100vh',
      }}
    >
      {currArticle && (
        <>
          <Box component="article" sx={{ mb: (theme) => theme.spacing(6) }}>
            <Typography variant="h3" gutterBottom>
              {currArticle.title}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: (theme) => theme.spacing(3),
              }}
            >
              <Avatar
                src={currArticle.user.avatarUrl ?? ''}
                sx={{ mr: (theme) => theme.spacing(2) }}
              />
              <Box>
                <Typography variant="subtitle1">
                  Written by {currArticle.user.displayName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Published on {formatDate(currArticle.createdAt)}
                </Typography>
              </Box>
            </Box>

            <PostContent content={currArticle.content} />

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

          <RelatedPosts articleId={currArticle.id} />
          <CommentList />
        </>
      )}
    </Layout>
  );
};

export default ArticleDetailPage;

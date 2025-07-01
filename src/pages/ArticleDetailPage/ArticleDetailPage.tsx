import { useEffect } from 'react';

import { PostContent } from '@/components/blog';
import { CommentList } from '@/components/comments';
import { Layout } from '@/components/layout';
import { useScrollToTopOnMount } from '@/libs/hooks';
import { formatDate } from '@/libs/utils/dateUtils';
import { selectCurrentArticle } from '@/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Bookmark, Share } from '@mui/icons-material';
import { Avatar, Box, IconButton, Typography } from '@mui/material';

import { useArticles, useComments } from '@/store/hooks';

const ArticleDetailPage = () => {
  useScrollToTopOnMount();

  const { slug } = useParams<{ slug: string }>();
  const { fetchArticleBySlug } = useArticles();
  const { initComments } = useComments();

  const currArticle = useSelector(selectCurrentArticle);

  useEffect(() => {
    if (!slug) return;
    fetchArticleBySlug(slug);
  }, [slug]);

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
            <Typography variant="h4" gutterBottom>
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
                src={currArticle.author.avatarUrl ?? ''}
                sx={{ mr: (theme) => theme.spacing(2) }}
              />
              <Box>
                <Typography variant="subtitle1">
                  Written by {currArticle.author.displayName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Published on {formatDate(currArticle.createdAt)}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {currArticle.tags.map((tag, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{ color: 'text.secondary' }}
                >
                  #{tag}
                </Typography>
              ))}
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

          {/* <RelatedPosts articleId={currArticle.id} /> */}
          <CommentList />
        </>
      )}
    </Layout>
  );
};

export default ArticleDetailPage;

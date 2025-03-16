import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import { Avatar, Box, IconButton, Typography } from '@mui/material';

import FormattedContent from '../../../components/FormattedContent';
import Layout from '../../../components/Layout';
import { getArticleByID } from '../../../store/articleSlice';
import { AppDispatch, RootState } from '../../../store/store';
import { formatDate } from '../../../utils/dateUtils';
import Comments from './Comments';
import RelatedArticles from './RelatedArticles';

const ArticleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { articleData } = useSelector((state: RootState) => state.articles);

  useEffect(() => {
    if (id) dispatch(getArticleByID(id));
    window.scroll(0, 0);
  }, [id, dispatch]);

  if (!articleData) {
    return <Typography>Blog not found</Typography>;
  }

  return (
    <Layout maxWidth="xl" sx={{ py: 4, minHeight: '100vh' }}>
      <Box component="article" sx={{ mb: 6 }}>
        <Typography variant="h2" gutterBottom>
          {articleData.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar src={articleData.author.avatarUrl} sx={{ mr: 2 }} />
          <Box>
            <Typography variant="subtitle1">
              Written by {articleData.author.displayName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Published on {formatDate(articleData.createdAt)}
            </Typography>
          </Box>
        </Box>
        <Box
          component="img"
          src={articleData.imageUrl}
          alt={articleData.title}
          sx={{
            width: '100%',
            height: 400,
            objectFit: 'cover',
            borderRadius: 2,
            mb: 4,
          }}
        />
        <FormattedContent content={articleData.content} />
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
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

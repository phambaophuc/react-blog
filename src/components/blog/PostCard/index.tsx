import React from 'react';

import { useAppNavigation } from '@/libs/hooks';
import { Article } from '@/libs/types';
import { formatDate } from '@/libs/utils';

import {
  Bookmark,
  ModeCommentRounded,
  VisibilityOutlined,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  CardMedia,
  Grid2,
  IconButton,
  Typography,
} from '@mui/material';

import { StyledExcerpt, StyledTitle } from './index.styled';

interface Props {
  article: Article;
}

const PostCard: React.FC<Props> = ({ article }) => {
  const { goToArticleDetail } = useAppNavigation();

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: (theme) => theme.spacing(1),
          mb: (theme) => theme.spacing(1),
        }}
      >
        <Avatar
          alt={article.author.displayName}
          src={article.author.avatarUrl ?? ''}
          sx={{
            width: (theme) => theme.spacing(4),
            height: (theme) => theme.spacing(4),
          }}
        />
        <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
          {article.author.displayName}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {formatDate(article.createdAt)}
        </Typography>
      </Box>

      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, md: article.coverImageUrl ? 8 : 12 }}>
          <Box sx={{ mb: (theme) => theme.spacing(2) }}>
            <StyledTitle onClick={() => goToArticleDetail(article.slug)}>
              {article.title}
            </StyledTitle>
            <StyledExcerpt>{article.excerpt}</StyledExcerpt>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: (theme) => theme.spacing(2),
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: (theme) => theme.spacing(1),
              }}
            >
              <Box>
                <IconButton size="small">
                  <VisibilityOutlined
                    sx={{ fontSize: (theme) => theme.typography.pxToRem(16) }}
                  />
                </IconButton>
                <Typography variant="caption" sx={{ color: '#757575' }}>
                  {new Intl.NumberFormat('en', { notation: 'compact' }).format(
                    article.viewsCount
                  )}{' '}
                  views
                </Typography>
              </Box>

              <Box>
                <IconButton size="small">
                  <ModeCommentRounded
                    sx={{ fontSize: (theme) => theme.typography.pxToRem(16) }}
                  />
                </IconButton>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {article.comments ? article.comments.length : 0}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {article.readingTime} min read
              </Typography>
              <IconButton size="small">
                <Bookmark
                  sx={{ fontSize: (theme) => theme.typography.pxToRem(16) }}
                />
              </IconButton>
            </Box>
          </Box>
        </Grid2>

        {article.coverImageUrl && (
          <Grid2 size={{ xs: 12, md: 4 }}>
            <CardMedia
              component="img"
              height={120}
              image={article.coverImageUrl ?? ''}
              alt={article.title}
              sx={{
                objectFit: 'cover',
                borderRadius: (theme) => theme.shape.borderRadius,
              }}
            />
          </Grid2>
        )}
      </Grid2>
    </Box>
  );
};

export default PostCard;

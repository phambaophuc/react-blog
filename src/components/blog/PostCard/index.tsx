import React from 'react';

import { useAppNavigation } from '@/routes/navigation';
import { Article } from '@/types';
import { formatDate } from '@/utils/dateUtils';

import { Bookmark as BookmarkIcon } from '@mui/icons-material';
import { Avatar, Box, CardMedia, IconButton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { StyledCard, StyledExcerpt, StyledTitle } from './index.styled';

interface Props {
  article: Article;
}

const PostCard: React.FC<Props> = ({ article }) => {
  const { goToArticleDetail } = useAppNavigation();

  return (
    <StyledCard>
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

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ mb: (theme) => theme.spacing(2) }}>
            <StyledTitle onClick={() => goToArticleDetail(article.id)}>
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
              {/* <Chip
                label={article.tag.name}
                sx={{
                  backgroundColor: (theme) => theme.palette.grey[200],
                  color: 'text.primary',
                  borderRadius: (theme) => theme.shape.borderRadius,
                  height: (theme) => theme.spacing(3),
                }}
              /> */}
              <Typography variant="caption" sx={{ color: '#757575' }}>
                {new Intl.NumberFormat('en', { notation: 'compact' }).format(
                  article.viewsCount
                )}{' '}
                views
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {article.readingTime} min read
              </Typography>
              <IconButton size="small">
                <BookmarkIcon
                  sx={{ fontSize: (theme) => theme.typography.pxToRem(16) }}
                />
              </IconButton>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
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
        </Grid>
      </Grid>
    </StyledCard>
  );
};

export default PostCard;

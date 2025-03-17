import ROUTES from '@constant/routes';
import { ArticleType } from '@models/Article';
import { formatDate } from '@utils/dateUtils';
import { useNavigate } from 'react-router-dom';

import { Bookmark as BookmarkIcon } from '@mui/icons-material';
import {
  Avatar,
  Box,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { StyledCard, StyledExcerpt, StyledTitle } from './index.styled';

const CardItem = ({ data }: { data: ArticleType }) => {
  const navigate = useNavigate();

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
          alt={data.author.displayName}
          src={data.author.avatarUrl}
          sx={{
            width: (theme) => theme.spacing(4),
            height: (theme) => theme.spacing(4),
          }}
        />
        <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
          {data.author.displayName}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {formatDate(data.createdAt)}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ mb: (theme) => theme.spacing(2) }}>
            <StyledTitle
              onClick={() => navigate(ROUTES.ARTICLE_DETAIL(data.id))}
            >
              {data.title}
            </StyledTitle>
            <StyledExcerpt>{data.description}</StyledExcerpt>
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
              <Chip
                label={data.tag.name}
                sx={{
                  backgroundColor: (theme) => theme.palette.grey[200],
                  color: 'text.primary',
                  borderRadius: (theme) => theme.shape.borderRadius,
                  height: (theme) => theme.spacing(3),
                }}
              />
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                10 read
              </Typography>
            </Box>
            <IconButton size="small">
              <BookmarkIcon
                sx={{ fontSize: (theme) => theme.typography.pxToRem(16) }}
              />
            </IconButton>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CardMedia
            component="img"
            height={120}
            image={data.imageUrl}
            alt={data.title}
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

export default CardItem;

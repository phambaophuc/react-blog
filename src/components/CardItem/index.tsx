import ROUTES from '@constant/routes';
import { Theme } from '@emotion/react';
import { ArticleType } from '@models/Article';
import { useNavigate } from 'react-router-dom';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShareIcon from '@mui/icons-material/Share';
import {
  Avatar,
  Box,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  SxProps,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { StyledCard } from './index.styled';

const CardItem = ({ data, sx }: { data: ArticleType; sx?: SxProps<Theme> }) => {
  const navigate = useNavigate();

  return (
    <Grid
      component="div"
      size={{ xs: 12, md: 4 }}
      sx={{ cursor: 'pointer', ...sx }}
      onClick={() => navigate(ROUTES.ARTICLE_DETAIL(data.id))}
    >
      <StyledCard>
        <CardMedia
          component="img"
          height="200"
          image={data.imageUrl}
          alt={data.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {data.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              textAlign: 'justify',
              hyphens: 'auto',
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {data.description}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              gap: 1,
            }}
          >
            <Avatar
              src={data.author.avatarUrl}
              alt={data.author.displayName}
              sx={{ width: 32, height: 32 }}
            />
            <Typography variant="body2">{data.author.displayName}</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <AccessTimeIcon sx={{ mr: 0.5 }} />
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            <Chip
              key={data.tag.id}
              label={data.tag.name}
              size="small"
              sx={{ mr: 0.5 }}
            />
            <Box sx={{ flexGrow: 1 }} />
            <IconButton size="small">
              <ShareIcon />
            </IconButton>
          </Box>
        </CardContent>
      </StyledCard>
    </Grid>
  );
};

export default CardItem;

import Author from '@components/Author';
import { Theme } from '@emotion/react';
import { ArticleType } from '@models/Article';
import { useNavigate } from 'react-router-dom';

import { CardMedia, SxProps, Typography } from '@mui/material';

import { StyledTypography, SyledCard, SyledCardContent } from './index.styled';

const CardItem = ({ data, sx }: { data: ArticleType; sx?: SxProps<Theme> }) => {
  const navigate = useNavigate();

  return (
    <SyledCard
      variant="outlined"
      tabIndex={0}
      sx={{ height: '100%', ...sx }}
      onClick={() => navigate(`/articles/${data.id}`)}
    >
      {data.imageUrl && (
        <CardMedia
          component="img"
          alt={data.title}
          image={data.imageUrl}
          sx={{
            height: { sm: 'auto', md: '50%' },
            aspectRatio: { sm: '16 / 9', md: '' },
          }}
        />
      )}
      <SyledCardContent>
        <Typography gutterBottom variant="caption">
          {data.tag.name}
        </Typography>
        <Typography gutterBottom variant="h6">
          {data.title}
        </Typography>
        <StyledTypography variant="body2" color="text.secondary">
          {data.description}
        </StyledTypography>
      </SyledCardContent>
      <Author author={data.author} createdAt={data.createdAt} />
    </SyledCard>
  );
};

export default CardItem;

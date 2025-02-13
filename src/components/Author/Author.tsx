import { Avatar, AvatarGroup, Box, Typography } from '@mui/material';

import { UserType } from '../../models/User';
import { formatDate } from '../../utils/formatDate';

const Author = ({
  author,
  createdAt,
}: {
  author: UserType;
  createdAt: string;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          alignItems: 'center',
        }}
      >
        <AvatarGroup max={3}>
          <Avatar
            alt={author.name}
            src={author.imageUrl}
            sx={{ width: 24, height: 24 }}
          />
        </AvatarGroup>
        <Typography variant="caption">{author.name}</Typography>
      </Box>
      <Typography variant="caption">{formatDate(createdAt)}</Typography>
    </Box>
  );
};

export default Author;

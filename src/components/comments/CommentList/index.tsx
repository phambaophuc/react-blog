import React from 'react';

import { Comment } from '@/types';

import { Box, Divider } from '@mui/material';

import CommentItem from '../CommentItem';

interface Props {
  comments: Comment[];
  onReply: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}

const CommentList: React.FC<Props> = ({ comments, onReply, onDelete }) => {
  return (
    <Box>
      {comments.map((comment, index) => (
        <Box key={comment.id}>
          <CommentItem
            comment={comment}
            onReply={onReply}
            onDelete={onDelete}
          />
          {index < comments.length - 1 && (
            <Divider sx={{ my: (theme) => theme.spacing(2) }} />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default React.memo(CommentList);

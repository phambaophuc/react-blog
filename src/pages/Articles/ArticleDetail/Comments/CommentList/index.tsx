import React from 'react';

import { CommentType } from '@models/CommentType';

import { Box, Divider } from '@mui/material';

import CommentItem from './CommentItem';

const CommentList: React.FC<{
  comments: CommentType[];
  onReply: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}> = ({ comments, onReply, onDelete }) => {
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

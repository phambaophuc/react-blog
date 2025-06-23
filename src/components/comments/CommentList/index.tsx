import { selectCommentList, selectCurrentUser } from '@/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Box, Divider, Paper, Typography } from '@mui/material';

import { useComments } from '@/store/hooks/useComments';

import CommentInput from '../CommentInput';
import CommentItem from '../CommentItem';

const CommentList = () => {
  const { id } = useParams<{ id: string }>();
  const { createComment } = useComments();

  const user = useSelector(selectCurrentUser);
  const comments = useSelector(selectCommentList);

  const handleArticleComment = async (content: string) => {
    createComment({
      content,
      articleId: id ?? '',
    });
  };

  return (
    <Paper
      sx={{ p: (theme) => theme.spacing(3), mb: (theme) => theme.spacing(4) }}
    >
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>
      {user && (
        <CommentInput
          onSubmit={handleArticleComment}
          sx={{ mb: (theme) => theme.spacing(4) }}
        />
      )}

      <Box>
        {comments.map((comment, index) => (
          <Box key={comment.id}>
            <CommentItem comment={comment} />
            {index < comments.length - 1 && (
              <Divider sx={{ my: (theme) => theme.spacing(2) }} />
            )}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default CommentList;

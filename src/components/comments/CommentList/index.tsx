import {
  selectCommentList,
  selectCurrentArticle,
  selectCurrentUser,
} from '@/store';
import { useSelector } from 'react-redux';

import { Box, Button, Typography } from '@mui/material';

import { useComments } from '@/store/hooks/useComments';

import CommentInput from '../CommentInput';
import CommentItem from '../CommentItem';

const CommentList = () => {
  const { createComment } = useComments();

  const user = useSelector(selectCurrentUser);
  const article = useSelector(selectCurrentArticle);
  const comments = useSelector(selectCommentList);

  const handleArticleComment = async (content: string) => {
    if (article) {
      createComment({
        content,
        articleId: article.id,
      });
    }
  };

  const totalResponses = comments.reduce((total, comment) => {
    return total + 1 + comment.replies.length;
  }, 0);

  return (
    <Box sx={{ maxWidth: '680px', px: 3, py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#1a1a1a',
            mb: 1,
          }}
        >
          Responses ({totalResponses})
        </Typography>
      </Box>

      {/* Comment Input */}
      {user && (
        <CommentInput
          onSubmit={handleArticleComment}
          currentUser={user}
          sx={{ mb: 4 }}
        />
      )}

      {/* Comments List */}
      <Box>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </Box>

      {/* Load More Button */}
      {comments.length > 4 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            sx={{
              color: '#1a8917',
              fontSize: '14px',
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#156b13',
              },
            }}
          >
            Show more responses
          </Button>
        </Box>
      )}

      {/* Empty state */}
      {comments.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography
            variant="body1"
            sx={{
              color: '#757575',
              fontFamily: 'Georgia, serif',
              fontSize: '16px',
            }}
          >
            Be the first to respond.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CommentList;

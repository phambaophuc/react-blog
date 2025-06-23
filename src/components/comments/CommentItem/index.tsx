import React, { useState } from 'react';

import { selectCurrentArticle, selectCurrentUser } from '@/store';
import { Comment } from '@/types';
import { timeAgo } from '@/utils/dateUtils';
import { useSelector } from 'react-redux';

import { Close, Reply } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';

import { useComments } from '@/store/hooks/useComments';

import CommentInput from '../CommentInput';

interface Props {
  comment: Comment;
}

const CommentItem: React.FC<Props> = ({ comment }) => {
  const { createComment, deleteComment } = useComments();

  const user = useSelector(selectCurrentUser);
  const currArticle = useSelector(selectCurrentArticle);

  const [showReplies, setShowReplies] = useState(false);
  const [replyingTo, setReplyingTo] = useState<boolean>(false);

  const handleReply = async (content: string) => {
    createComment({
      content,
      parentId: comment.id,
      articleId: currArticle?.id ?? '',
    });
    setReplyingTo(false);
  };

  const handleDeleteComment = async (commentId: string) => {
    deleteComment(commentId);
  };
  console.log(comment);
  return (
    <Box sx={{ mb: (theme) => theme.spacing(2) }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <Avatar
          src={comment.user.avatarUrl ?? ''}
          sx={{ mr: (theme) => theme.spacing(2) }}
        />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle2">
              {comment.user.displayName}
            </Typography>
            {user?.id === comment.user.id && (
              <IconButton
                size="small"
                color="error"
                onClick={() => handleDeleteComment(comment.id)}
              >
                <Close
                  sx={{ fontSize: (theme) => theme.typography.pxToRem(16) }}
                />
              </IconButton>
            )}
          </Box>
          <Typography variant="body2" color="text.secondary">
            {timeAgo(comment.createdAt)}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: (theme) => theme.spacing(1),
              mt: (theme) => theme.spacing(0.5),
            }}
          >
            <Typography variant="body1">{comment.content}</Typography>
            {user && (
              <Button
                startIcon={<Reply />}
                size="small"
                onClick={() => setReplyingTo(!replyingTo)}
                sx={{ display: 'flex', alignItems: 'flex-start' }}
              >
                Reply
              </Button>
            )}
          </Box>

          <Collapse in={replyingTo}>
            <CommentInput
              onSubmit={handleReply}
              sx={{
                mt: (theme) => theme.spacing(2),
                ml: (theme) => theme.spacing(2),
              }}
            />
          </Collapse>

          {comment.replies.length > 0 && (
            <Box
              sx={{
                mt: (theme) => theme.spacing(0.5),
                ml: (theme) => theme.spacing(1),
              }}
            >
              <Button onClick={() => setShowReplies(!showReplies)} size="small">
                {showReplies
                  ? 'Hide Replies'
                  : `Show ${comment.replies.length} Replies`}
              </Button>

              <Collapse in={showReplies}>
                {comment.replies.map((reply) => (
                  <Box
                    key={reply.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      mt: (theme) => theme.spacing(2),
                    }}
                  >
                    <Avatar
                      src={reply.user.avatarUrl ?? ''}
                      sx={{
                        width: (theme) => theme.spacing(4),
                        height: (theme) => theme.spacing(4),
                        mr: (theme) => theme.spacing(1),
                      }}
                    />
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle2">
                          {reply.user.displayName}
                        </Typography>
                        {user?.id === reply.user.id && (
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteComment(reply.id)}
                          >
                            <Close
                              sx={{
                                fontSize: (theme) =>
                                  theme.typography.pxToRem(16),
                              }}
                            />
                          </IconButton>
                        )}
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {timeAgo(reply.createdAt)}
                      </Typography>
                      <Typography variant="body2">{reply.content}</Typography>
                    </Box>
                  </Box>
                ))}
              </Collapse>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(CommentItem);

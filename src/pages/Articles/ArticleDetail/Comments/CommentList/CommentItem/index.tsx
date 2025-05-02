import React, { useState } from 'react';

import { CommentType } from '@models/CommentType';
import { RootState } from '@store/store';
import { timeAgo } from '@utils/dateUtils';
import { useSelector } from 'react-redux';

import { Close as CloseIcon, Reply as ReplyIcon } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';

import CommentInput from '../../CommentInput';

const CommentItem: React.FC<{
  comment: CommentType;
  onReply: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}> = ({ comment, onReply, onDelete }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [showReplies, setShowReplies] = useState(false);
  const [replyingTo, setReplyingTo] = useState<boolean>(false);

  return (
    <Box sx={{ mb: (theme) => theme.spacing(2) }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <Avatar
          src={comment.user.avatarUrl}
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
                onClick={() => onDelete(comment.id)}
              >
                <CloseIcon
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
                startIcon={<ReplyIcon />}
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
              onSubmit={(content) => {
                onReply(comment.id, content);
                setReplyingTo(false);
              }}
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
                      src={reply.user.avatarUrl}
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
                            onClick={() => onDelete(reply.id)}
                          >
                            <CloseIcon
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

import React, { useState } from 'react';

import { Comment } from '@/libs/types';
import { timeAgo } from '@/libs/utils';
import { selectCurrentArticle, selectCurrentUser } from '@/store';
import { useSelector } from 'react-redux';

import {
  DeleteOutline,
  Favorite,
  FavoriteOutlined,
  MoreHorizOutlined,
  ReplyOutlined,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';

import { useComments } from '@/store/hooks';

import CommentInput from '../CommentInput';

interface Props {
  comment: Comment;
  isReply?: boolean;
}

const CommentItem: React.FC<Props> = ({ comment, isReply = false }) => {
  const { createComment, deleteComment } = useComments();
  const user = useSelector(selectCurrentUser);
  const currArticle = useSelector(selectCurrentArticle);

  const [showReplies, setShowReplies] = useState(false);
  const [replyingTo, setReplyingTo] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

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

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <Avatar
          src={comment.user.avatarUrl ?? ''}
          sx={{
            width: isReply ? 28 : 32,
            height: isReply ? 28 : 32,
            flexShrink: 0,
          }}
        >
          {comment.user.displayName[0]}
        </Avatar>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* User info */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 500,
                fontSize: '14px',
                color: '#1a1a1a',
              }}
            >
              {comment.user.displayName}
            </Typography>
            <Typography sx={{ color: '#757575', fontSize: '12px' }}>
              ·
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#757575',
                fontSize: '12px',
              }}
            >
              {timeAgo(comment.createdAt)}
            </Typography>
            {user?.id === comment.user.id && (
              <IconButton
                size="small"
                onClick={() => handleDeleteComment(comment.id)}
                sx={{
                  ml: 'auto',
                  color: '#757575',
                  '&:hover': { color: '#d32f2f' },
                }}
              >
                <DeleteOutline sx={{ fontSize: 16 }} />
              </IconButton>
            )}
          </Box>

          {/* Comment content */}
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Georgia, serif',
              fontSize: '16px',
              lineHeight: 1.6,
              color: '#1a1a1a',
              mb: 2,
              wordBreak: 'break-word',
            }}
          >
            {comment.content}
          </Typography>

          {/* Action buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Button
              startIcon={isLiked ? <Favorite /> : <FavoriteOutlined />}
              onClick={handleLike}
              size="small"
              sx={{
                minWidth: 'auto',
                p: 0,
                color: isLiked ? '#d32f2f' : '#757575',
                fontSize: '12px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: isLiked ? '#b71c1c' : '#424242',
                },
                '& .MuiButton-startIcon': {
                  marginRight: likes > 0 ? '4px' : 0,
                  marginLeft: 0,
                },
              }}
            >
              {likes > 0 && likes}
            </Button>

            {!isReply && user && (
              <Button
                startIcon={<ReplyOutlined />}
                onClick={() => setReplyingTo(!replyingTo)}
                size="small"
                sx={{
                  minWidth: 'auto',
                  p: 0,
                  color: '#757575',
                  fontSize: '12px',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#424242',
                  },
                }}
              >
                Reply
              </Button>
            )}

            {!isReply && comment.replies.length > 0 && (
              <Button
                onClick={() => setShowReplies(!showReplies)}
                size="small"
                sx={{
                  minWidth: 'auto',
                  p: 0,
                  color: '#1a8917',
                  fontSize: '12px',
                  fontWeight: 500,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#156b13',
                  },
                }}
              >
                {showReplies
                  ? 'Hide replies'
                  : `${comment.replies.length} ${comment.replies.length === 1 ? 'reply' : 'replies'}`}
              </Button>
            )}

            <IconButton
              size="small"
              sx={{
                color: '#757575',
                '&:hover': { color: '#424242' },
              }}
            >
              <MoreHorizOutlined sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>

          {/* Reply input */}
          <Collapse in={replyingTo}>
            <Box sx={{ mt: 2 }}>
              <CommentInput
                onSubmit={handleReply}
                placeholder={`Reply to ${comment.user.displayName}...`}
                currentUser={user ?? undefined}
                sx={{
                  borderBottom: 'none',
                  pb: 0,
                  mb: 0,
                }}
              />
            </Box>
          </Collapse>

          {/* Replies */}
          {!isReply && comment.replies.length > 0 && (
            <Collapse in={showReplies}>
              <Box sx={{ mt: 2, ml: 0 }}>
                {comment.replies.map((reply) => (
                  <CommentItem key={reply.id} comment={reply} isReply={true} />
                ))}
              </Box>
            </Collapse>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(CommentItem);

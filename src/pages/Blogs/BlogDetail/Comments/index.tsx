import React, { useEffect, useState } from 'react';

import { CommentType } from '@models/Comment';
import { commentService } from '@services/commentService';
import { RootState } from '@store/store';
import { timeAgo } from '@utils/dateUtils';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ReplyIcon from '@mui/icons-material/Reply';
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Paper,
  Typography,
} from '@mui/material';

import CommentInput from './CommentInput';

const Comments: React.FC<{ comments: CommentType[] }> = ({
  comments: initialComments,
}) => {
  const { id } = useParams<{ id: string }>();
  const { user } = useSelector((state: RootState) => state.auth);

  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [showReplies, setShowReplies] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const toggleReplyForm = (commentId: string) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
  };

  const toggleShowReplies = (commentId: string) => {
    setShowReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handlePostComment = async (content: string) => {
    if (id) {
      const commentData = await commentService.create({
        content,
        postId: id,
      });

      setComments((prevComments) => [commentData, ...prevComments]);
    }
  };

  const handlePostReply = async (commentId: string, content: string) => {
    if (id) {
      const replyData = await commentService.create({
        content,
        parentId: commentId,
        postId: id,
      });

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...comment.replies, replyData] }
            : comment
        )
      );
      setReplyingTo(null);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Comments
      </Typography>
      {user && <CommentInput onSubmit={handlePostComment} sx={{ mb: 4 }} />}

      <Box>
        {comments.map((comment, index) => (
          <Box key={comment.id} sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
              <Avatar src={comment.author.avatarUrl} sx={{ mr: 2 }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2">
                  {comment.author.displayName}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {timeAgo(comment.createdAt)}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body1">{comment.content}</Typography>
                  <Button
                    startIcon={<ReplyIcon />}
                    size="small"
                    onClick={() => toggleReplyForm(comment.id)}
                    disabled={user ? false : true}
                  >
                    Reply
                  </Button>
                </Box>

                <Collapse in={replyingTo === comment.id}>
                  <CommentInput
                    onSubmit={(content) => handlePostReply(comment.id, content)}
                    sx={{ mt: 2, ml: 2 }}
                  />
                </Collapse>

                {comment.replies.length > 0 && (
                  <>
                    <Button
                      onClick={() => toggleShowReplies(comment.id)}
                      sx={{ mt: 2 }}
                      size="small"
                    >
                      {showReplies[comment.id]
                        ? 'Hide Replies'
                        : 'Show Replies'}
                    </Button>
                    <Collapse in={showReplies[comment.id]}>
                      <Box sx={{ mt: 2, ml: 2 }}>
                        {comment.replies.map((reply) => (
                          <Box
                            key={reply.id}
                            sx={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              mt: 2,
                            }}
                          >
                            <Avatar
                              src={reply.author.avatarUrl}
                              sx={{ width: 32, height: 32, mr: 1 }}
                            />
                            <Box>
                              <Typography variant="subtitle2">
                                {reply.author.displayName}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                              >
                                {timeAgo(reply.createdAt)}
                              </Typography>
                              <Typography variant="body2">
                                {reply.content}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Collapse>
                  </>
                )}
              </Box>
            </Box>
            {index < comments.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default React.memo(Comments);

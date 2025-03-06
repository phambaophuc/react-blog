import React, { useState } from 'react';

import { CommentType } from '@models/Comment';
import { timeAgo } from '@utils/dateUtils';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyIcon from '@mui/icons-material/Reply';
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

const Comments: React.FC<{ comments: CommentType[] }> = ({ comments }) => {
  const [newComment, setNewComment] = useState<string>('');
  const [replyForm, setReplyForm] = useState<boolean>(false);

  const toggleReplyForm = () => {
    setReplyForm(!replyForm);
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>
      <Box component="form" sx={{ mb: 4 }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" type="submit">
          Post Comment
        </Button>
      </Box>

      <Box>
        {comments.map((comment) => (
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
                <Typography variant="body1">{comment.content}</Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                  <Button startIcon={<FavoriteIcon />} size="small">
                    0
                  </Button>
                  <Button
                    startIcon={<ReplyIcon />}
                    size="small"
                    onClick={() => toggleReplyForm()}
                  >
                    Reply
                  </Button>
                </Box>

                <Collapse in={replyForm}>
                  <Box sx={{ mt: 2, ml: 2 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Write a reply..."
                      multiline
                      rows={2}
                      sx={{ mb: 1 }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <Button variant="contained" size="small">
                      Reply
                    </Button>
                  </Box>
                </Collapse>

                {comment.replies &&
                  comment.replies.map((reply) => (
                    <Box key={reply.id} sx={{ mt: 2, ml: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
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
                          <Button
                            startIcon={<FavoriteIcon />}
                            size="small"
                            sx={{ mt: 1 }}
                          >
                            0
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  ))}
              </Box>
            </Box>
            <Divider />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default React.memo(Comments);

import React, { useState } from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyIcon from '@mui/icons-material/Reply';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

const Comments = () => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      content: 'Great article! Very insightful.',
      timestamp: '2 hours ago',
      likes: 5,
    },
    {
      id: 2,
      author: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      content: 'Thanks for sharing this valuable information.',
      timestamp: '5 hours ago',
      likes: 3,
    },
  ]);

  const handleCommentSubmit = (e: any) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: 'Guest User',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
        content: newComment,
        timestamp: 'Just now',
        likes: 0,
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>
      <Box component="form" onSubmit={handleCommentSubmit} sx={{ mb: 4 }}>
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
              <Avatar src={comment.avatar} sx={{ mr: 2 }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2">{comment.author}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {comment.timestamp}
                </Typography>
                <Typography variant="body1">{comment.content}</Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                  <Button startIcon={<FavoriteIcon />} size="small">
                    {comment.likes}
                  </Button>
                  <Button startIcon={<ReplyIcon />} size="small">
                    Reply
                  </Button>
                </Box>
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

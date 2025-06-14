import React, { useState } from 'react';

import { Send as SendIcon } from '@mui/icons-material';
import { Box, Button, SxProps, TextField, Theme } from '@mui/material';

interface CommentInputProps {
  placeholder?: string;
  onSubmit: (content: string) => void;
  sx?: SxProps<Theme>;
}

const CommentInput: React.FC<CommentInputProps> = ({
  placeholder = 'Write a comment...',
  onSubmit,
  sx,
}) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content.trim());
    setContent('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ ...sx }}>
      <TextField
        fullWidth
        multiline
        rows={3}
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ mb: (theme) => theme.spacing(1) }}
      />
      <Button variant="contained" type="submit" startIcon={<SendIcon />}>
        Comment
      </Button>
    </Box>
  );
};

export default CommentInput;

import React, { useState } from 'react';

import { User } from '@/libs/types';

import { Box, SxProps, Theme } from '@mui/material';

import {
  ActionBar,
  CancelButton,
  InputContainer,
  StyledTextField,
  SubmitButton,
  UserAvatar,
  Wrapper,
} from './index.styled';

interface Props {
  placeholder?: string;
  onSubmit: (content: string) => void;
  sx?: SxProps<Theme>;
  currentUser?: User;
}

const CommentInput: React.FC<Props> = ({
  placeholder = 'What are your thoughts?',
  onSubmit,
  sx,
  currentUser,
}) => {
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content.trim());
    setContent('');
    setIsFocused(false);
  };

  const handleCancel = () => {
    setContent('');
    setIsFocused(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        borderBottom: '1px solid #e6e6e6',
        pb: 3,
        mb: 4,
        ...sx,
      }}
    >
      <Wrapper>
        {currentUser && (
          <UserAvatar src={currentUser.avatarUrl ?? ''}>
            {currentUser.displayName[0]}
          </UserAvatar>
        )}
        <InputContainer>
          <StyledTextField
            fullWidth
            multiline
            placeholder={placeholder}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsFocused(true)}
            variant="standard"
            slotProps={{
              input: {
                sx: {
                  minHeight: isFocused || content ? '100px' : '40px',
                  transition: 'min-height 0.2s ease',
                  resize: 'none',
                  '&::placeholder': {
                    color: '#757575',
                    opacity: 1,
                  },
                },
              },
            }}
            sx={{
              '& .MuiInput-root:before': { display: 'none' },
              '& .MuiInput-root:after': { display: 'none' },
            }}
          />

          {(isFocused || content) && (
            <ActionBar>
              <CancelButton onClick={handleCancel}>Cancel</CancelButton>
              <SubmitButton type="submit" disabled={!content.trim()}>
                Respond
              </SubmitButton>
            </ActionBar>
          )}
        </InputContainer>
      </Wrapper>
    </Box>
  );
};

export default React.memo(CommentInput);

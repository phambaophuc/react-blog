import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CommentWrapper = styled(Box)({
  marginBottom: 24, // mb: 3
});

export const CommentRow = styled(Box)({
  display: 'flex',
  gap: 12, // gap: 1.5
});

export const CommentAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== 'isReply',
})<{ isReply?: boolean }>(({ isReply }) => ({
  width: isReply ? 28 : 32,
  height: isReply ? 28 : 32,
  flexShrink: 0,
}));

export const CommentBody = styled(Box)({
  flex: 1,
  minWidth: 0,
});

export const UserInfoRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  marginBottom: 4,
});

export const DisplayName = styled(Typography)({
  fontWeight: 500,
  fontSize: '14px',
  color: '#1a1a1a',
});

export const DotText = styled(Typography)({
  color: '#757575',
  fontSize: '12px',
});

export const Timestamp = styled(Typography)({
  color: '#757575',
  fontSize: '12px',
});

export const DeleteButton = styled(IconButton)({
  marginLeft: 'auto',
  color: '#757575',
  '&:hover': {
    color: '#d32f2f',
  },
});

export const CommentText = styled(Typography)({
  fontFamily: 'Georgia, serif',
  fontSize: '16px',
  lineHeight: 1.6,
  color: '#1a1a1a',
  marginBottom: 16,
  wordBreak: 'break-word',
});

export const ActionRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const LikeButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isLiked',
})<{ isLiked?: boolean }>(({ isLiked }) => ({
  minWidth: 'auto',
  color: isLiked ? '#d32f2f' : '#757575',
  fontSize: '12px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'transparent',
    color: isLiked ? '#b71c1c' : '#424242',
  },
}));

export const ReplyButton = styled(Button)({
  minWidth: 'auto',
  padding: 0,
  color: '#757575',
  fontSize: '12px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#424242',
  },
});

export const ToggleRepliesButton = styled(Button)({
  minWidth: 'auto',
  padding: 0,
  color: '#1a8917',
  fontSize: '12px',
  fontWeight: 500,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#156b13',
  },
});

export const MoreButton = styled(IconButton)({
  color: '#757575',
  '&:hover': {
    color: '#424242',
  },
});

export const ReplyInputWrapper = styled(Box)({
  marginTop: 16,
});

export const RepliesWrapper = styled(Box)({
  marginTop: 16,
});

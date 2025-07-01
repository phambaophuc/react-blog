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
import { Collapse } from '@mui/material';

import { useComments } from '@/store/hooks';

import CommentInput from '../CommentInput';
import {
  ActionRow,
  CommentAvatar,
  CommentBody,
  CommentRow,
  CommentText,
  CommentWrapper,
  DeleteButton,
  DisplayName,
  DotText,
  LikeButton,
  MoreButton,
  RepliesWrapper,
  ReplyButton,
  ReplyInputWrapper,
  Timestamp,
  ToggleRepliesButton,
  UserInfoRow,
} from './index.styled';

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
    <CommentWrapper>
      <CommentRow>
        <CommentAvatar src={comment.user.avatarUrl ?? ''} isReply={isReply}>
          {comment.user.displayName[0]}
        </CommentAvatar>

        <CommentBody>
          <UserInfoRow>
            <DisplayName>{comment.user.displayName}</DisplayName>
            <DotText>·</DotText>
            <Timestamp>{timeAgo(comment.createdAt)}</Timestamp>
            {user?.id === comment.user.id && (
              <DeleteButton
                size="small"
                onClick={() => handleDeleteComment(comment.id)}
              >
                <DeleteOutline sx={{ fontSize: 16 }} />
              </DeleteButton>
            )}
          </UserInfoRow>

          <CommentText>{comment.content}</CommentText>

          <ActionRow>
            <LikeButton
              onClick={handleLike}
              startIcon={isLiked ? <Favorite /> : <FavoriteOutlined />}
              isLiked={isLiked}
            >
              {likes > 0 && likes}
            </LikeButton>

            {!isReply && user && (
              <ReplyButton
                onClick={() => setReplyingTo(!replyingTo)}
                startIcon={<ReplyOutlined />}
              >
                Reply
              </ReplyButton>
            )}

            {!isReply && comment.replies.length > 0 && (
              <ToggleRepliesButton onClick={() => setShowReplies(!showReplies)}>
                {showReplies
                  ? 'Hide replies'
                  : `${comment.replies.length} ${comment.replies.length === 1 ? 'reply' : 'replies'}`}
              </ToggleRepliesButton>
            )}

            <MoreButton size="small">
              <MoreHorizOutlined sx={{ fontSize: 16 }} />
            </MoreButton>
          </ActionRow>

          <Collapse in={replyingTo}>
            <ReplyInputWrapper>
              <CommentInput
                onSubmit={handleReply}
                placeholder={`Reply to ${comment.user.displayName}...`}
                currentUser={user ?? undefined}
                sx={{ borderBottom: 'none', pb: 0, mb: 0 }}
              />
            </ReplyInputWrapper>
          </Collapse>

          {!isReply && comment.replies.length > 0 && (
            <Collapse in={showReplies}>
              <RepliesWrapper>
                {comment.replies.map((reply) => (
                  <CommentItem key={reply.id} comment={reply} isReply />
                ))}
              </RepliesWrapper>
            </Collapse>
          )}
        </CommentBody>
      </CommentRow>
    </CommentWrapper>
  );
};

export default React.memo(CommentItem);

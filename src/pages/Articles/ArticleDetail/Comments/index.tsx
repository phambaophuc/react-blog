import React, { useEffect, useState } from 'react';

import CommentInput from '@/components/CommentInput';
import { useApiServices } from '@/services';
import { selectCurrentUser } from '@/store';
import { Comment } from '@/types';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Paper, Typography } from '@mui/material';

import CommentList from './CommentList';

const Comments: React.FC<{ comments: Comment[] }> = ({
  comments: initialComments,
}) => {
  const { id } = useParams<{ id: string }>();
  const user = useSelector(selectCurrentUser);

  const [comments, setComments] = useState<Comment[]>(initialComments);

  const { comments: commentService } = useApiServices();

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleArticleComment = async (content: string) => {
    if (id) {
      const commentData = await commentService.create({
        content,
        articleId: id,
      });
      setComments((prev) => [commentData, ...prev]);
    }
  };

  const handleArticleReply = async (commentId: string, content: string) => {
    if (id) {
      const replyData = await commentService.create({
        content,
        parentId: commentId,
        articleId: id,
      });
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...comment.replies, replyData] }
            : comment
        )
      );
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    await commentService.delete(commentId);
    setComments((prev) =>
      prev
        .map((comment) =>
          comment.id === commentId
            ? null
            : {
                ...comment,
                replies: comment.replies.filter(
                  (reply) => reply.id !== commentId
                ),
              }
        )
        .filter((comment): comment is Comment => comment !== null)
    );
  };

  return (
    <Paper
      sx={{ p: (theme) => theme.spacing(3), mb: (theme) => theme.spacing(4) }}
    >
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>
      {user && (
        <CommentInput
          onSubmit={handleArticleComment}
          sx={{ mb: (theme) => theme.spacing(4) }}
        />
      )}
      <CommentList
        comments={comments}
        onReply={handleArticleReply}
        onDelete={handleDeleteComment}
      />
    </Paper>
  );
};

export default React.memo(Comments);

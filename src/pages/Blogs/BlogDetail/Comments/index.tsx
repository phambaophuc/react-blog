import React, { useEffect, useState } from 'react';

import { CommentType } from '@models/Comment';
import { commentService } from '@services/commentService';
import { useParams } from 'react-router-dom';

import { Paper, Typography } from '@mui/material';

import CommentInput from './CommentInput';
import CommentList from './CommentList';

const Comments: React.FC<{ comments: CommentType[] }> = ({
  comments: initialComments,
}) => {
  const { id } = useParams<{ id: string }>();
  const [comments, setComments] = useState<CommentType[]>(initialComments);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handlePostComment = async (content: string) => {
    if (id) {
      const commentData = await commentService.create({ content, postId: id });
      setComments((prev) => [commentData, ...prev]);
    }
  };

  const handlePostReply = async (commentId: string, content: string) => {
    if (id) {
      const replyData = await commentService.create({
        content,
        parentId: commentId,
        postId: id,
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
    const success = await commentService.delete(commentId);
    if (success) {
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
          .filter((comment): comment is CommentType => comment !== null)
      );
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>
      <CommentInput onSubmit={handlePostComment} sx={{ mb: 4 }} />
      <CommentList
        comments={comments}
        onReply={handlePostReply}
        onDelete={handleDeleteComment}
      />
    </Paper>
  );
};

export default React.memo(Comments);

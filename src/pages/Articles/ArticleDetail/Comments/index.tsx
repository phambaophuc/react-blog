import React, { useEffect, useState } from 'react';

import { CommentType } from '@models/Comment';
import { commentService } from '@services/commentService';
import { RootState } from '@store/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Paper, Typography } from '@mui/material';

import CommentInput from './CommentInput';
import CommentList from './CommentList';

const Comments: React.FC<{ comments: CommentType[] }> = ({
  comments: initialComments,
}) => {
  const { id } = useParams<{ id: string }>();
  const { user } = useSelector((state: RootState) => state.auth);

  const [comments, setComments] = useState<CommentType[]>(initialComments);

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
      {user && <CommentInput onSubmit={handleArticleComment} sx={{ mb: 4 }} />}
      <CommentList
        comments={comments}
        onReply={handleArticleReply}
        onDelete={handleDeleteComment}
      />
    </Paper>
  );
};

export default React.memo(Comments);

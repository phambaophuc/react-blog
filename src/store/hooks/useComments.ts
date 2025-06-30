import { useCallback } from 'react';

import { Comment, CreateCommentRequest } from '@/libs/types';

import { useAppDispatch, useAppSelector } from '..';
import {
  createComment,
  deleteComment,
  setInitComments,
} from '../slices/commentsSlice';

export const useComments = () => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.comments);

  const handleInitComment = useCallback(
    (comments: Comment[]) => dispatch(setInitComments(comments)),
    [dispatch]
  );

  const handleCreateComment = useCallback(
    (comment: CreateCommentRequest) => dispatch(createComment(comment)),
    [dispatch]
  );

  const handleDeleteComment = useCallback(
    (commentId: string) => dispatch(deleteComment(commentId)),
    [dispatch]
  );

  return {
    ...comments,
    initComments: handleInitComment,
    createComment: handleCreateComment,
    deleteComment: handleDeleteComment,
  };
};

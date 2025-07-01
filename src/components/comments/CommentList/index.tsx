import {
  selectCommentList,
  selectCurrentArticle,
  selectCurrentUser,
} from '@/store';
import { useSelector } from 'react-redux';

import { useComments } from '@/store/hooks/useComments';

import CommentInput from '../CommentInput';
import CommentItem from '../CommentItem';
import {
  CommentsWrapper,
  ContainerWrapper,
  EmptyMessage,
  EmptyState,
  HeaderTitle,
  HeaderWrapper,
  LoadMoreButton,
  LoadMoreWrapper,
} from './index.styled';

const CommentList = () => {
  const { createComment } = useComments();

  const user = useSelector(selectCurrentUser);
  const article = useSelector(selectCurrentArticle);
  const comments = useSelector(selectCommentList);

  const handleArticleComment = async (content: string) => {
    if (article) {
      createComment({
        content,
        articleId: article.id,
      });
    }
  };

  const totalResponses = comments.reduce((total, comment) => {
    return total + 1 + comment.replies.length;
  }, 0);

  return (
    <ContainerWrapper>
      <HeaderWrapper>
        <HeaderTitle variant="h4">Responses ({totalResponses})</HeaderTitle>
      </HeaderWrapper>

      {/* Comment Input */}
      {user && (
        <CommentInput
          onSubmit={handleArticleComment}
          currentUser={user}
          sx={{ mb: 4 }}
        />
      )}

      {/* Comments List */}
      <CommentsWrapper>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </CommentsWrapper>

      {/* Load More Button */}
      {comments.length > 4 && (
        <LoadMoreWrapper>
          <LoadMoreButton>Show more responses</LoadMoreButton>
        </LoadMoreWrapper>
      )}

      {/* Empty state */}
      {comments.length === 0 && (
        <EmptyState>
          <EmptyMessage>Be the first to respond.</EmptyMessage>
        </EmptyState>
      )}
    </ContainerWrapper>
  );
};

export default CommentList;

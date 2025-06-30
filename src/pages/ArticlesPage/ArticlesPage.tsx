import { useCallback, useEffect, useState } from 'react';

import { PostCard, RecentPosts, TrendingTags } from '@/components/blog';
import { Layout } from '@/components/layout';
import { selectArticles } from '@/store';
import { useSelector } from 'react-redux';

import { AccessTime, ArrowUpward, BookmarkBorder } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  Divider,
  Fade,
  Grid2,
  Skeleton,
  Typography,
} from '@mui/material';

import { useArticles } from '@/store/hooks';

import {
  EmptyStateWrapper,
  LoadingWrapper,
  ScrollTopButton,
  SidebarTitle,
  StyledDivider,
} from './ArticlesPage.styled';

const ArticlesPage = () => {
  const { articles, loading, hasMore } = useSelector(selectArticles);

  const [page, setPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { resetArticles, fetchArticles } = useArticles();

  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    setShowScrollTop(scrollTop > 400);

    if (loading || !hasMore) return;

    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const pageHeight = document.documentElement.offsetHeight;

    if (scrollPosition >= pageHeight - 100) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    resetArticles();
    setPage(1);
  }, []);

  useEffect(() => {
    fetchArticles({ page });
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const ArticlesSkeleton = () => (
    <Box>
      {[...Array(3)].map((_, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Skeleton variant="text" width="80%" height={40} />
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="90%" height={20} />
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 2 }}>
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="text" width={80} height={20} />
          </Box>
        </Box>
      ))}
    </Box>
  );

  return (
    <Layout footer={false} sx={{ py: (theme) => theme.spacing(4) }}>
      <Grid2 container spacing={4}>
        <Grid2 size={{ xs: 12, md: 8 }}>
          {loading && articles.length === 0 ? (
            <ArticlesSkeleton />
          ) : articles.length > 0 ? (
            <>
              {articles.map((article, index) => (
                <Fade in={true} timeout={300 * (index + 1)} key={article.id}>
                  <div>
                    <PostCard article={article} />
                    {index < articles.length - 1 && <StyledDivider />}
                  </div>
                </Fade>
              ))}

              {loading && (
                <LoadingWrapper>
                  <CircularProgress size={24} />
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    Loading more articles...
                  </Typography>
                </LoadingWrapper>
              )}
            </>
          ) : (
            <EmptyStateWrapper>
              <Typography variant="h6" gutterBottom>
                No articles found
              </Typography>
              <Typography variant="body2">
                Try adjusting your search or selected tags
              </Typography>
            </EmptyStateWrapper>
          )}
        </Grid2>

        <Grid2 size={{ xs: 12, md: 4 }} paddingX={2}>
          <Box sx={{ position: 'sticky', top: (theme) => theme.spacing(2.5) }}>
            <TrendingTags />

            <Divider sx={{ my: (theme) => theme.spacing(2) }} />

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BookmarkBorder sx={{ mr: 1, color: 'primary.main' }} />
                <SidebarTitle>Reading List</SidebarTitle>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Click the bookmark icon on any story to easily add it to your
                reading list or a custom list that you can share.
              </Typography>
            </Box>

            <Divider sx={{ my: (theme) => theme.spacing(2) }} />

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTime sx={{ mr: 1, color: 'primary.main' }} />
                <SidebarTitle>Recent Posts</SidebarTitle>
              </Box>
              <RecentPosts />
            </Box>
          </Box>
        </Grid2>
      </Grid2>

      <Fade in={showScrollTop}>
        <ScrollTopButton onClick={scrollToTop}>
          <ArrowUpward />
        </ScrollTopButton>
      </Fade>
    </Layout>
  );
};

export default ArticlesPage;

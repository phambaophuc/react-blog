import { useScrollToTopButton } from '@/libs/hooks';

import { ArrowUpward } from '@mui/icons-material';
import { Fade } from '@mui/material';

import { ScrollTopButton } from './index.styled';

const ScrollToTopButton = () => {
  const { visible, scrollToTop } = useScrollToTopButton();

  return (
    <Fade in={visible}>
      <ScrollTopButton onClick={scrollToTop}>
        <ArrowUpward color="primary" />
      </ScrollTopButton>
    </Fade>
  );
};

export default ScrollToTopButton;

import { useState } from 'react';

import { UserAvatar } from '@/components/ui';
import { useAppNavigation, useHideOnScroll } from '@/libs/hooks';

import {
  Close,
  EditNote,
  NotificationsOutlined,
  Search,
} from '@mui/icons-material';
import {
  Badge,
  Box,
  ClickAwayListener,
  Fade,
  IconButton,
  InputBase,
} from '@mui/material';

import {
  IconBtn,
  LeftSection,
  LogoImg,
  MobileSearchBox,
  MobileSearchWrapper,
  RightSection,
  SearchBox,
  StyledAppBar,
  StyledToolbar,
  WriteButton,
  WriteLabel,
} from './index.styled';

const Header = () => {
  const { goToArticles, goToWriteArticle } = useAppNavigation();
  const headerRef = useHideOnScroll();
  const [searchExpanded, setSearchExpanded] = useState(false);

  const handleSearchClick = () => {
    setSearchExpanded(true);
  };

  const handleSearchClose = () => {
    setSearchExpanded(false);
  };

  return (
    <StyledAppBar ref={headerRef} elevation={0}>
      <StyledToolbar>
        <LeftSection>
          <LogoImg src="/logo.svg" alt="Blog Logo" onClick={goToArticles} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <SearchBox>
              <Search sx={{ color: '#6b6b6b', fontSize: 20, mr: 1 }} />
              <InputBase
                placeholder="Search stories..."
                sx={{
                  flex: 1,
                  fontSize: '14px',
                  '& input': { padding: '8px 0' },
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </SearchBox>
          </Box>
        </LeftSection>

        <RightSection>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            {!searchExpanded ? (
              <IconBtn onClick={handleSearchClick}>
                <Search />
              </IconBtn>
            ) : (
              <ClickAwayListener onClickAway={handleSearchClose}>
                <Fade in={searchExpanded}>
                  <MobileSearchWrapper>
                    <MobileSearchBox>
                      <Search sx={{ color: '#6b6b6b', mr: 1 }} />
                      <InputBase
                        placeholder="Search stories..."
                        autoFocus
                        sx={{ flex: 1 }}
                      />
                      <IconButton onClick={handleSearchClose} size="small">
                        <Close />
                      </IconButton>
                    </MobileSearchBox>
                  </MobileSearchWrapper>
                </Fade>
              </ClickAwayListener>
            )}
          </Box>

          <WriteButton onClick={goToWriteArticle}>
            <EditNote sx={{ fontSize: 20 }} />
            <WriteLabel variant="body2">Write</WriteLabel>
          </WriteButton>

          <IconBtn>
            <Badge
              variant="dot"
              color="error"
              sx={{
                '& .MuiBadge-dot': {
                  backgroundColor: '#ff6b6b',
                  width: 6,
                  height: 6,
                },
              }}
            >
              <NotificationsOutlined sx={{ fontSize: 20 }} />
            </Badge>
          </IconBtn>

          <UserAvatar />
        </RightSection>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;

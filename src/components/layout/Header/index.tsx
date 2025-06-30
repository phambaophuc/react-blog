import { useState } from 'react';

import UserAvatar from '@/components/ui';
import { useAppNavigation, useHideOnScroll } from '@/libs/hooks';

import {
  Close,
  EditNote,
  NotificationsOutlined,
  Search,
} from '@mui/icons-material';
import {
  AppBar,
  Badge,
  Box,
  ClickAwayListener,
  Fade,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from '@mui/material';

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
    <AppBar
      component="div"
      ref={headerRef}
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        color: '#242424',
        borderBottom: '1px solid rgba(230, 230, 230, 1)',
        position: 'sticky',
        top: 0,
        zIndex: 1100,
      }}
    >
      <Toolbar
        sx={{
          minHeight: '64px !important',
          px: { xs: 2, sm: 3, md: 4 },
          justifyContent: 'space-between',
        }}
      >
        {/* Left section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box
            component="img"
            src="/logo.svg"
            alt="Blog Logo"
            sx={{
              height: 32,
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
              '&:hover': {
                opacity: 0.8,
              },
            }}
            onClick={goToArticles}
          />

          {/* Desktop Search */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              backgroundColor: '#f9f9f9',
              borderRadius: '24px',
              px: 2,
              py: 0.5,
              minWidth: 240,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
              '&:focus-within': {
                backgroundColor: '#ffffff',
                border: '1px solid #e6e6e6',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              },
            }}
          >
            <Search
              sx={{
                color: '#6b6b6b',
                fontSize: 20,
                mr: 1,
              }}
            />
            <InputBase
              placeholder="Search stories..."
              sx={{
                flex: 1,
                fontSize: '14px',
                '& input': {
                  padding: '8px 0',
                },
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Box>
        </Box>

        {/* Right section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1, sm: 2 },
          }}
        >
          {/* Mobile Search */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            {!searchExpanded ? (
              <IconButton
                onClick={handleSearchClick}
                sx={{
                  color: '#6b6b6b',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.04)',
                  },
                }}
              >
                <Search />
              </IconButton>
            ) : (
              <ClickAwayListener onClickAway={handleSearchClose}>
                <Fade in={searchExpanded}>
                  <Box
                    sx={{
                      position: 'fixed',
                      top: 64,
                      left: 0,
                      right: 0,
                      backgroundColor: '#ffffff',
                      borderBottom: '1px solid #e6e6e6',
                      p: 2,
                      zIndex: 1200,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '24px',
                        px: 2,
                        py: 1,
                      }}
                    >
                      <Search sx={{ color: '#6b6b6b', mr: 1 }} />
                      <InputBase
                        placeholder="Search stories..."
                        autoFocus
                        sx={{ flex: 1 }}
                      />
                      <IconButton onClick={handleSearchClose} size="small">
                        <Close />
                      </IconButton>
                    </Box>
                  </Box>
                </Fade>
              </ClickAwayListener>
            )}
          </Box>

          {/* Write Button */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              cursor: 'pointer',
              px: { xs: 1, sm: 1.5 },
              py: 0.5,
              borderRadius: '20px',
              transition: 'all 0.2s ease',
              color: '#6b6b6b',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.04)',
                color: '#242424',
              },
            }}
            onClick={goToWriteArticle}
          >
            <EditNote sx={{ fontSize: 20 }} />
            <Typography
              variant="body2"
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontSize: '14px',
                fontWeight: 400,
              }}
            >
              Write
            </Typography>
          </Box>

          {/* Notifications */}
          <IconButton
            sx={{
              color: '#6b6b6b',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.04)',
              },
            }}
          >
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
          </IconButton>

          <UserAvatar />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

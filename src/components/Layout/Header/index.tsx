import UserAvatar from '@components/UserAvatar';
import ROUTES from '@constant/routes';
import useHideOnScroll from '@hooks/useHideOnScroll';
import { useNavigate } from 'react-router-dom';

import {
  NotificationsOutlined as NotificationsIcon,
  Search as SearchIcon,
  EditNote as WriteIcon,
} from '@mui/icons-material';
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from '@mui/material';

const Header = () => {
  const navigate = useNavigate();
  const headerRef = useHideOnScroll();

  return (
    <AppBar
      component="div"
      ref={headerRef}
      enableColorOnDark
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.primary,
        boxShadow: (theme) => theme.shadows[1],
        borderBottom: (theme) => `0 solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', flexGrow: 1 }} gap={3}>
          <Typography
            variant="h6"
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(ROUTES.ARTICLES)}
          >
            ThoughtSphere
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            paddingX={1}
            sx={{
              backgroundColor: (theme) => theme.palette.grey[200],
              borderRadius: (theme) => theme.shape.borderRadius,
            }}
          >
            <SearchIcon
              sx={{ color: (theme) => theme.palette.text.secondary }}
            />
            <InputBase
              placeholder="Search..."
              sx={{ mx: 1, flex: 1 }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={3}>
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(ROUTES.WRITE_ARTICLE)}
          >
            <WriteIcon />
            <Typography variant="body2">Write</Typography>
          </Box>

          <IconButton color="inherit">
            <Badge color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <UserAvatar />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

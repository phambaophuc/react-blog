import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import { getPosts } from '../../store/postSlice';
import { AppDispatch, RootState } from '../../store/store';
import CardItem from '../CardItem/CardItem';

const Search = () => {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
};

const MainContent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, totalPages } = useSelector((state: RootState) => state.posts);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getPosts({ page: currentPage }));
  }, [currentPage, dispatch]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          Blog
        </Typography>
        <Typography>
          Discover the latest news, updates, and insights about our products.
        </Typography>
      </div>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
          gap: 1,
          width: { xs: '100%', md: 'fit-content' },
          overflow: 'auto',
        }}
      >
        <Search />
        <IconButton size="small" aria-label="RSS feed">
          <RssFeedRoundedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          alignItems: { xs: 'start', md: 'center' },
          gap: 4,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            gap: 3,
            overflow: 'auto',
          }}
        >
          <Chip size="medium" label="All categories" />
          <Chip
            size="medium"
            label="Company"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
          <Chip
            size="medium"
            label="Product"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
          <Chip
            size="medium"
            label="Design"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
          <Chip
            size="medium"
            label="Engineering"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            gap: 1,
            width: { xs: '100%', md: 'fit-content' },
            overflow: 'auto',
          }}
        >
          <Search />
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={2} columns={12}>
        {data.slice(0, 2).map((post) => (
          <Grid size={{ xs: 12, md: 6 }} key={post.ID}>
            <CardItem data={post} />
          </Grid>
        ))}
        {data.slice(2, data.length).map((post) => (
          <Grid size={{ xs: 12, md: 4 }} key={post.ID}>
            <CardItem data={post} />
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
          <Pagination
            color="primary"
            hidePrevButton
            hideNextButton
            page={currentPage}
            count={totalPages}
            onChange={handlePageChange}
          />
        </Box>
      )}
    </Box>
  );
};

export { MainContent, Search };

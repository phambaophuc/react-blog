import { Search } from '@mui/icons-material';
import { TextField } from '@mui/material';

const SearchBox = () => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search articles..."
      value={''}
      slotProps={{
        input: {
          startAdornment: (
            <Search
              sx={{
                fontSize: (theme) => theme.typography.pxToRem(20),
                mr: (theme) => theme.spacing(1),
              }}
            />
          ),
        },
      }}
      sx={{ mb: 3 }}
    />
  );
};

export default SearchBox;

import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';

export const Search = () => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search articles..."
      value={''}
      slotProps={{
        input: {
          startAdornment: (
            <SearchIcon
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

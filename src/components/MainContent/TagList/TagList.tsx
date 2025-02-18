import { useEffect, useMemo, useState } from 'react';
import React from 'react';

import { Box, Chip, Menu, MenuItem } from '@mui/material';

import { TagType } from '../../../models/Tag';
import { tagService } from '../../../services/tagService';

const TagList: React.FC = () => {
  const [tags, setTags] = useState<TagType[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const fetchTags = async () => {
    try {
      const tagList = await tagService.getAllTags();
      setTags(tagList);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const displayedTags = useMemo(() => tags.slice(0, 4), [tags]);
  const additionalTags = useMemo(() => tags.slice(4), [tags]);

  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'row',
        gap: 3,
        overflow: 'auto',
      }}
    >
      <Chip size="medium" label="All categories" />
      {displayedTags.map((tag) => (
        <Chip
          key={tag.id}
          size="medium"
          label={tag.name}
          sx={{
            backgroundColor: 'transparent',
            border: 'none',
          }}
        />
      ))}

      {tags.length > 4 && (
        <>
          <Chip
            size="medium"
            label="More"
            variant="outlined"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {additionalTags.map((tag) => (
              <MenuItem key={tag.id} onClick={() => setAnchorEl(null)}>
                {tag.name}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Box>
  );
};

export default React.memo(TagList);

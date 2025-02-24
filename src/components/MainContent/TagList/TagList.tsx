import { useEffect, useState } from 'react';
import React from 'react';

import { Box, Chip } from '@mui/material';

import { TagType } from '../../../models/Tag';
import { tagService } from '../../../services/tagService';

interface TagListProps {
  onTagSelect: (tag: string | null) => void;
}

const TagList: React.FC<TagListProps> = ({ onTagSelect }) => {
  const [tags, setTags] = useState<TagType[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>();

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

  const handleTagClick = (tagName: string) => {
    if (selectedTag === tagName) {
      setSelectedTag(null);
      onTagSelect(null);
    } else {
      setSelectedTag(tagName);
      onTagSelect(tagName);
    }
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'row',
        columnGap: 3,
        rowGap: 2,
        flexWrap: 'wrap',
        overflow: 'hidden',
      }}
    >
      <Chip
        size="medium"
        label="All categories"
        onClick={() => handleTagClick('')}
        sx={{ backgroundColor: selectedTag && 'transparent' }}
      />
      {tags.map((tag) => (
        <Chip
          key={tag.id}
          size="medium"
          label={tag.name}
          onClick={() => handleTagClick(tag.name)}
          sx={{
            backgroundColor: selectedTag === tag.name ? '' : 'transparent',
            border: 'none',
          }}
        />
      ))}
    </Box>
  );
};

export default React.memo(TagList);

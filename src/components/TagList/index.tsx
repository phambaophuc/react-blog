import { useEffect, useState } from 'react';
import React from 'react';

import { TagType } from '@models/TagType';
import { tagService } from '@services/tagService';

import { Box, Chip } from '@mui/material';

interface TagListProps {
  onTagSelect: (tag: string | null) => void;
}

const TagList: React.FC<TagListProps> = ({ onTagSelect }) => {
  const [tags, setTags] = useState<TagType[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>();

  const fetchTags = async () => {
    try {
      const tagList = await tagService.findAll();
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
        display: 'flex',
        flexWrap: 'wrap',
        gap: (theme) => theme.spacing(1),
        mb: (theme) => theme.spacing(3),
      }}
    >
      <Chip
        size="medium"
        label="All categories"
        onClick={() => handleTagClick('')}
        color={selectedTag ? 'default' : 'primary'}
        sx={{ m: (theme) => theme.spacing(0.5) }}
      />
      {tags.map((tag) => (
        <Chip
          key={tag.id}
          size="medium"
          label={tag.name}
          onClick={() => handleTagClick(tag.name)}
          color={selectedTag === tag.name ? 'primary' : 'default'}
          sx={{ m: (theme) => theme.spacing(0.5) }}
        />
      ))}
    </Box>
  );
};

export default React.memo(TagList);

import React, { useEffect, useState } from 'react';

import { useApiServices } from '@/services';
import { Tag } from '@/types';

import { Box, Chip } from '@mui/material';

interface Props {
  onTagSelect: (tag: string | null) => void;
}

const TagList: React.FC<Props> = ({ onTagSelect }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>();

  const { tags: tagService } = useApiServices();

  useEffect(() => {
    const fetchTags = async () => {
      const tagList = await tagService.findAll();
      setTags(tagList);
    };

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

import React, { useEffect, useState } from 'react';

import { Tag } from '@/libs/types';
import { useApiServices } from '@/services';

import { TrendingUp } from '@mui/icons-material';
import { Box } from '@mui/material';

import { SidebarTitle, TopicChip, TopicChipsContainer } from './index.styled';

const TrendingTags = () => {
  const { tags: tagService } = useApiServices();

  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const tagList = await tagService.findTrendingTags();
      setTags(tagList);
    };

    fetchTags();
  }, []);

  return (
    <Box sx={{ mb: (theme) => theme.spacing(4) }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TrendingUp sx={{ mr: 1, color: 'primary.main' }} />
        <SidebarTitle>Trending Topics</SidebarTitle>
      </Box>
      <TopicChipsContainer>
        {tags.map((tag) => (
          <TopicChip
            key={tag.id}
            label={tag.name}
            variant="outlined"
            clickable
          />
        ))}
      </TopicChipsContainer>
    </Box>
  );
};

export default React.memo(TrendingTags);

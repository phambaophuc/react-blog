import React, { useEffect, useState } from 'react';

import { createSlug } from '@/libs/utils';

import { Typography } from '@mui/material';

import { TocItem, TocLink, TocList, TocWrapper } from './index.styled';

type Heading = {
  id: string;
  text: string;
  level: number;
};

type Props = {
  htmlContent: string;
};

const TableOfContents: React.FC<Props> = ({ htmlContent }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    const headingTags = Array.from(doc.querySelectorAll('h1, h2, h3'));

    const parsed: Heading[] = headingTags.map((el) => {
      const rawText = el.textContent || '';
      const id = el.id || createSlug(rawText);
      return {
        id,
        text: rawText,
        level: parseInt(el.tagName.substring(1), 10),
      };
    });

    setHeadings(parsed);
  }, [htmlContent]);

  if (headings.length === 0) return;

  return (
    <TocWrapper sx={{ display: { xs: 'none', md: 'block' } }}>
      <Typography variant="h6" gutterBottom>
        Mục lục
      </Typography>
      <TocList>
        {headings.map((heading) => (
          <TocItem key={heading.id} level={heading.level}>
            <TocLink href={`#${heading.id}`} level={heading.level}>
              {heading.text}
            </TocLink>
          </TocItem>
        ))}
      </TocList>
    </TocWrapper>
  );
};

export default React.memo(TableOfContents);

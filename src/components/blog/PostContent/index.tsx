import React from 'react';

import parse from 'html-react-parser';

import { StyledImage } from './index.styled';

interface Props {
  content: string;
}

const PostContent: React.FC<Props> = ({ content }) => {
  const transform = (node: any) => {
    if (node.type === 'tag' && node.name === 'img') {
      return (
        <StyledImage src={node.attribs.src} alt={node.attribs.alt || 'Image'} />
      );
    }
  };

  return <>{parse(content, { replace: transform })}</>;
};

export default PostContent;

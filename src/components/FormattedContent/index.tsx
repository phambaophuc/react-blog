import parse from 'html-react-parser';

import { Typography } from '@mui/material';

import { StyledImage } from './index.styled';

const FormattedContent = ({ content }: { content: string }) => {
  const transform = (node: any) => {
    if (node.type === 'tag' && node.name === 'img') {
      return (
        <StyledImage src={node.attribs.src} alt={node.attribs.alt || 'Image'} />
      );
    }
  };

  return (
    <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 4 }}>
      {parse(content, { replace: transform })}
    </Typography>
  );
};

export default FormattedContent;

import React from 'react';

import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

import { Box, Typography } from '@mui/material';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: (props) => <Typography variant="h3" sx={{ my: 2 }} {...props} />,
        h2: (props) => <Typography variant="h4" sx={{ my: 2 }} {...props} />,
        h3: (props) => <Typography variant="h5" sx={{ my: 2 }} {...props} />,
        h4: (props) => <Typography variant="h6" sx={{ my: 2 }} {...props} />,
        h5: (props) => <Typography variant="h6" sx={{ my: 2 }} {...props} />,
        h6: (props) => <Typography variant="h6" sx={{ my: 2 }} {...props} />,
        p: (props) => (
          <Typography
            variant="body1"
            sx={{ my: 2, textAlign: 'justify' }}
            {...props}
          />
        ),
        ul: (props) => (
          <Typography
            component="ul"
            variant="body1"
            sx={{ my: 2 }}
            {...props}
          />
        ),
        ol: (props) => (
          <Typography
            component="ol"
            variant="body1"
            sx={{ my: 2 }}
            {...props}
          />
        ),
        li: (props) => <Typography component="li" variant="body1" {...props} />,
        pre: ({ children }) => (
          <Box
            component="pre"
            sx={{
              backgroundColor: '#272822',
              color: '#fff',
              padding: 2,
              borderRadius: 2,
              overflowX: 'auto',
              fontFamily: 'monospace',
              my: 2,
            }}
          >
            {children}
          </Box>
        ),
        code: (props) => (
          <Box
            component="code"
            sx={{
              backgroundColor: '#f5f5f5',
              p: 1,
              borderRadius: 1,
              fontFamily: 'monospace',
            }}
            {...props}
          />
        ),
        blockquote: (props) => (
          <Box
            component="blockquote"
            sx={{
              borderLeft: '4px solid #ccc',
              margin: '16px 0',
              paddingLeft: '16px',
              color: '#666',
              fontStyle: 'italic',
            }}
            {...props}
          />
        ),
        img: ({ src, alt }) => (
          <Box
            component="img"
            src={src}
            alt={alt}
            sx={{
              width: '100%',
              height: 'auto',
              display: 'block',
              margin: '16px auto',
              borderRadius: 2,
              boxShadow: 1,
            }}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;

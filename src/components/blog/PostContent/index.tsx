import React from 'react';

import parse, { DOMNode, Element, domToReact } from 'html-react-parser';

import {
  PostContentContainer,
  StyledBlockquote,
  StyledCode,
  StyledEm,
  StyledHeading1,
  StyledHeading2,
  StyledHeading3,
  StyledHr,
  StyledImage,
  StyledLink,
  StyledList,
  StyledOrderedList,
  StyledParagraph,
  StyledPre,
  StyledStrong,
  StyledTable,
  StyledTbody,
  StyledTd,
  StyledTh,
  StyledThead,
  StyledTr,
} from './index.styled';

interface Props {
  content: string;
}

interface Props {
  content: string;
}

const PostContent: React.FC<Props> = ({ content }) => {
  const transform = (node: DOMNode) => {
    if (node.type !== 'tag') return;

    const el = node as Element;
    const { name, attribs } = el;

    const children = domToReact(el.children as unknown as DOMNode[], {
      replace: transform,
    });

    switch (name) {
      case 'img':
        return (
          <StyledImage
            src={attribs?.src}
            alt={attribs?.alt || 'Image'}
            loading="lazy"
          />
        );
      case 'p':
        return <StyledParagraph>{children}</StyledParagraph>;
      case 'h1':
        return <StyledHeading1>{children}</StyledHeading1>;
      case 'h2':
        return <StyledHeading2>{children}</StyledHeading2>;
      case 'h3':
        return <StyledHeading3>{children}</StyledHeading3>;
      case 'blockquote':
        return <StyledBlockquote>{children}</StyledBlockquote>;
      case 'ul':
        return <StyledList>{children}</StyledList>;
      case 'ol':
        return <StyledOrderedList>{children}</StyledOrderedList>;
      case 'li':
        return <li>{children}</li>;
      case 'pre':
        return <StyledPre>{children}</StyledPre>;
      case 'code':
        return <StyledCode>{children}</StyledCode>;
      case 'a':
        return (
          <StyledLink
            href={attribs?.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </StyledLink>
        );
      case 'strong':
        return <StyledStrong>{children}</StyledStrong>;
      case 'em':
        return <StyledEm>{children}</StyledEm>;
      case 'hr':
        return <StyledHr />;
      case 'br':
        return <br />;
      case 'table':
        return <StyledTable>{children}</StyledTable>;
      case 'thead':
        return <StyledThead>{children}</StyledThead>;
      case 'tbody':
        return <StyledTbody>{children}</StyledTbody>;
      case 'tr':
        return <StyledTr>{children}</StyledTr>;
      case 'th':
        return <StyledTh>{children}</StyledTh>;
      case 'td':
        return <StyledTd>{children}</StyledTd>;
      default:
        return;
    }
  };

  return (
    <PostContentContainer>
      {parse(content, { replace: transform })}
    </PostContentContainer>
  );
};

export default PostContent;

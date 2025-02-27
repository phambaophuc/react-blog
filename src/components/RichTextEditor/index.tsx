import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatUnderlined,
  InsertPhoto,
  Link as LinkIcon,
  Redo,
  StrikethroughS,
  Title,
  Undo,
} from '@mui/icons-material';
import { Box, IconButton, SxProps, Theme, Tooltip } from '@mui/material';

import { EditorWrapper } from './index.styled';

const RichTextEditor = ({
  content,
  setContent,
  sx,
}: {
  content: string;
  setContent: (c: string) => void;
  sx?: SxProps<Theme>;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: true }),
      Image,
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <Box
      sx={{
        ...sx,
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#fff',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 1,
          p: 1,
          borderBottom: '1px solid #ddd',
        }}
      >
        <Tooltip title="Bold">
          <IconButton onClick={() => editor.chain().focus().toggleBold().run()}>
            <FormatBold />
          </IconButton>
        </Tooltip>

        <Tooltip title="Italic">
          <IconButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <FormatItalic />
          </IconButton>
        </Tooltip>

        <Tooltip title="Underline">
          <IconButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <FormatUnderlined />
          </IconButton>
        </Tooltip>

        <Tooltip title="Strikethrough">
          <IconButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <StrikethroughS />
          </IconButton>
        </Tooltip>

        <Tooltip title="Heading 1">
          <IconButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Title fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Bullet List">
          <IconButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <FormatListBulleted />
          </IconButton>
        </Tooltip>

        <Tooltip title="Numbered List">
          <IconButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <FormatListNumbered />
          </IconButton>
        </Tooltip>

        <Tooltip title="Blockquote">
          <IconButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <FormatQuote />
          </IconButton>
        </Tooltip>

        <Tooltip title="Align Left">
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
          >
            <FormatAlignLeft />
          </IconButton>
        </Tooltip>

        <Tooltip title="Align Center">
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
          >
            <FormatAlignCenter />
          </IconButton>
        </Tooltip>

        <Tooltip title="Align Right">
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
          >
            <FormatAlignRight />
          </IconButton>
        </Tooltip>

        <Tooltip title="Undo">
          <IconButton onClick={() => editor.chain().focus().undo().run()}>
            <Undo />
          </IconButton>
        </Tooltip>

        <Tooltip title="Redo">
          <IconButton onClick={() => editor.chain().focus().redo().run()}>
            <Redo />
          </IconButton>
        </Tooltip>

        <Tooltip title="Insert Image">
          <IconButton
            onClick={() => {
              const url = prompt('Enter image URL');
              if (url) editor.chain().focus().setImage({ src: url }).run();
            }}
          >
            <InsertPhoto />
          </IconButton>
        </Tooltip>

        <Tooltip title="Insert Link">
          <IconButton
            onClick={() => {
              const url = prompt('Enter URL');
              if (url) editor.chain().focus().setLink({ href: url }).run();
            }}
          >
            <LinkIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <EditorWrapper>
        <EditorContent editor={editor} />
      </EditorWrapper>
    </Box>
  );
};

export default RichTextEditor;

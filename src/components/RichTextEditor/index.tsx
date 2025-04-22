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
import { Box, IconButton, Paper, SxProps, Theme, Tooltip } from '@mui/material';

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

  const getButtonColor = (condition: boolean) =>
    condition ? 'primary' : 'default';

  return (
    <Paper
      elevation={2}
      sx={{
        ...sx,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: (theme) => theme.spacing(1),
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          p: (theme) => theme.spacing(1),
        }}
      >
        <Tooltip title="Bold">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().toggleBold().run()}
            color={getButtonColor(editor.isActive('bold'))}
          >
            <FormatBold />
          </IconButton>
        </Tooltip>

        <Tooltip title="Italic">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            color={getButtonColor(editor.isActive('italic'))}
          >
            <FormatItalic />
          </IconButton>
        </Tooltip>

        <Tooltip title="Underline">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            color={getButtonColor(editor.isActive('underline'))}
          >
            <FormatUnderlined />
          </IconButton>
        </Tooltip>

        <Tooltip title="Strikethrough">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            color={getButtonColor(editor.isActive('strike'))}
          >
            <StrikethroughS />
          </IconButton>
        </Tooltip>

        <Tooltip title="Heading 1">
          <IconButton
            size="small"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            color={getButtonColor(editor.isActive('heading', { level: 1 }))}
          >
            <Title fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Bullet List">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            color={getButtonColor(editor.isActive('bulletList'))}
          >
            <FormatListBulleted />
          </IconButton>
        </Tooltip>

        <Tooltip title="Numbered List">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            color={getButtonColor(editor.isActive('orderedList'))}
          >
            <FormatListNumbered />
          </IconButton>
        </Tooltip>

        <Tooltip title="Blockquote">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            color={getButtonColor(editor.isActive('blockquote'))}
          >
            <FormatQuote />
          </IconButton>
        </Tooltip>

        <Tooltip title="Align Left">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            color={getButtonColor(editor.isActive({ textAlign: 'left' }))}
          >
            <FormatAlignLeft />
          </IconButton>
        </Tooltip>

        <Tooltip title="Align Center">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            color={getButtonColor(editor.isActive({ textAlign: 'center' }))}
          >
            <FormatAlignCenter />
          </IconButton>
        </Tooltip>

        <Tooltip title="Align Right">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            color={getButtonColor(editor.isActive({ textAlign: 'right' }))}
          >
            <FormatAlignRight />
          </IconButton>
        </Tooltip>

        <Tooltip title="Undo">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().undo().run()}
          >
            <Undo />
          </IconButton>
        </Tooltip>

        <Tooltip title="Redo">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().redo().run()}
          >
            <Redo />
          </IconButton>
        </Tooltip>

        <Tooltip title="Insert Image">
          <IconButton
            size="small"
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
            size="small"
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
        <EditorContent editor={editor} style={{ minHeight: 400 }} />
      </EditorWrapper>
    </Paper>
  );
};

export default RichTextEditor;

import React, { useCallback, useRef, useState } from 'react';

import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import {
  Code,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatUnderlined,
  HorizontalRule,
  InsertPhoto,
  Link as LinkIcon,
  StrikethroughS,
} from '@mui/icons-material';
import { Divider, IconButton, SxProps, Theme, Tooltip } from '@mui/material';

import {
  EditorContainer,
  EditorFocusContainer,
  EditorWrapper,
  FloatingToolbar,
  ToolbarButton,
  ToolbarWrapper,
} from './index.styled';

interface Props {
  content: string;
  setContent: (c: string) => void;
  sx?: SxProps<Theme>;
  placeholder?: string;
  readOnly?: boolean;
}

const RichTextEditor: React.FC<Props> = ({
  content,
  setContent,
  sx,
  placeholder = 'Tell your story...',
  readOnly = false,
}) => {
  const [showBubbleMenu, setShowBubbleMenu] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        code: {
          HTMLAttributes: {
            class: 'inline-code',
          },
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
          class: 'editor-link',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'editor-image',
        },
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'Title';
          }
          return placeholder;
        },
        includeChildren: true,
      }),
    ],
    content,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    onSelectionUpdate: ({ editor }) => {
      const { empty, from, to } = editor.state.selection;

      // Handle bubble menu visibility
      if (!empty && from !== to) {
        setShowBubbleMenu(true);
      } else {
        setShowBubbleMenu(false);
      }
    },
    editorProps: {
      attributes: {
        class: 'medium-editor prose',
        spellcheck: 'true',
      },
    },
  });

  // Handle image upload with better UX
  const handleImageUpload = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && editor) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const url = event.target?.result as string;
          editor.chain().focus().setImage({ src: url }).run();
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  }, [editor]);

  // Enhanced link handling
  const handleLinkAdd = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = prompt('Enter URL:', previousUrl || 'https://');

    if (url === null) return;

    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // Validate URL
    let validUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      validUrl = 'https://' + url;
    }

    editor
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: validUrl })
      .run();
  }, [editor]);

  if (!editor) return null;

  return (
    <EditorContainer sx={sx}>
      {/* Enhanced Floating Selection Toolbar */}
      {showBubbleMenu && (
        <div>
          <BubbleMenu
            editor={editor}
            tippyOptions={{
              duration: 200,
              animation: 'fade',
              theme: 'dark',
              placement: 'top',
              offset: [0, 10],
              onDestroy: () => {},
            }}
          >
            <FloatingToolbar className="visible">
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'active' : ''}
                title="Bold (Ctrl+B)"
              >
                <FormatBold />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'active' : ''}
                title="Italic (Ctrl+I)"
              >
                <FormatItalic />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'active' : ''}
                title="Underline (Ctrl+U)"
              >
                <FormatUnderlined />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'active' : ''}
                title="Strikethrough"
              >
                <StrikethroughS />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={editor.isActive('code') ? 'active' : ''}
                title="Inline Code"
              >
                <Code />
              </ToolbarButton>

              <ToolbarButton
                onClick={handleLinkAdd}
                className={editor.isActive('link') ? 'active' : ''}
                title="Add Link (Ctrl+K)"
              >
                <LinkIcon />
              </ToolbarButton>
            </FloatingToolbar>
          </BubbleMenu>
        </div>
      )}

      {/* Enhanced Sticky Toolbar */}
      {!readOnly && (
        <ToolbarWrapper>
          <Tooltip title="Bold (Ctrl+B)">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleBold().run()}
              color={editor.isActive('bold') ? 'primary' : 'default'}
            >
              <FormatBold />
            </IconButton>
          </Tooltip>

          <Tooltip title="Italic (Ctrl+I)">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              color={editor.isActive('italic') ? 'primary' : 'default'}
            >
              <FormatItalic />
            </IconButton>
          </Tooltip>

          <Tooltip title="Underline (Ctrl+U)">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              color={editor.isActive('underline') ? 'primary' : 'default'}
            >
              <FormatUnderlined />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          <Tooltip title="Heading 1">
            <IconButton
              size="small"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              color={
                editor.isActive('heading', { level: 1 }) ? 'primary' : 'default'
              }
              sx={{ fontSize: '16px', fontWeight: 'bold' }}
            >
              H1
            </IconButton>
          </Tooltip>

          <Tooltip title="Heading 2">
            <IconButton
              size="small"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              color={
                editor.isActive('heading', { level: 2 }) ? 'primary' : 'default'
              }
              sx={{ fontSize: '14px', fontWeight: 'bold' }}
            >
              H2
            </IconButton>
          </Tooltip>

          <Tooltip title="Heading 3">
            <IconButton
              size="small"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              color={
                editor.isActive('heading', { level: 3 }) ? 'primary' : 'default'
              }
              sx={{ fontSize: '12px', fontWeight: 'bold' }}
            >
              H3
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          <Tooltip title="Quote">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              color={editor.isActive('blockquote') ? 'primary' : 'default'}
            >
              <FormatQuote />
            </IconButton>
          </Tooltip>

          <Tooltip title="Bullet List">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              color={editor.isActive('bulletList') ? 'primary' : 'default'}
            >
              <FormatListBulleted />
            </IconButton>
          </Tooltip>

          <Tooltip title="Numbered List">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              color={editor.isActive('orderedList') ? 'primary' : 'default'}
            >
              <FormatListNumbered />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          <Tooltip title="Insert Image">
            <IconButton size="small" onClick={handleImageUpload}>
              <InsertPhoto />
            </IconButton>
          </Tooltip>

          <Tooltip title="Insert Link">
            <IconButton size="small" onClick={handleLinkAdd}>
              <LinkIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Horizontal Rule">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
              <HorizontalRule />
            </IconButton>
          </Tooltip>
        </ToolbarWrapper>
      )}

      {/* Editor */}
      <EditorFocusContainer>
        <EditorWrapper ref={editorRef}>
          <EditorContent editor={editor} />
        </EditorWrapper>
      </EditorFocusContainer>
    </EditorContainer>
  );
};

export default RichTextEditor;

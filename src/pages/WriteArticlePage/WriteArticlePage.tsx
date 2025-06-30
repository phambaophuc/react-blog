import { useCallback, useEffect, useRef, useState } from 'react';

import { RichTextEditor } from '@/components/editor';
import { useAppNavigation } from '@/libs/hooks';
import { CreateArticleRequest } from '@/libs/types';
import { useApiServices } from '@/services';

import {
  Check,
  CheckCircle,
  Close,
  Error,
  MoreHoriz,
  Publish,
  Save,
  Visibility,
} from '@mui/icons-material';
import { CircularProgress } from '@mui/material';

import {
  ActionSection,
  EditorSection,
  ErrorMessage,
  FloatingActions,
  FloatingButton,
  HeaderBar,
  HeaderContent,
  LoadingContent,
  LoadingOverlay,
  LogoSection,
  PublishButton,
  SecondaryButton,
  StatusIndicator,
  SuccessMessage,
  TitleInput,
  WriteContainer,
} from './WriteArticlePage.styled';

const WriteArticlePage = () => {
  const { goToArticles } = useAppNavigation();
  const { articles: articleService } = useApiServices();

  // States
  const [article, setArticle] = useState<CreateArticleRequest>({
    title: '',
    content: '',
  });
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState('');
  const [autoSaveStatus, setAutoSaveStatus] = useState<
    'saved' | 'saving' | 'error'
  >('saved');

  const autoSaveTimeout = useRef<NodeJS.Timeout | null>(null);
  const isUnmountingRef = useRef(false);
  const editorContentRef = useRef<string>('');

  useEffect(() => {
    return () => {
      isUnmountingRef.current = true;
      if (autoSaveTimeout.current) {
        clearTimeout(autoSaveTimeout.current);
        autoSaveTimeout.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isUnmountingRef.current) return;

    if (autoSaveTimeout.current) {
      clearTimeout(autoSaveTimeout.current);
      autoSaveTimeout.current = null;
    }

    if (
      (article.title.trim() || article.content.trim()) &&
      !isSaving &&
      !isPublishing &&
      autoSaveStatus !== 'saving'
    ) {
      setAutoSaveStatus('saving');
      autoSaveTimeout.current = setTimeout(() => {
        if (!isUnmountingRef.current) {
          handleAutoSave();
        }
      }, 2000);
    }

    // Cleanup function
    return () => {
      if (autoSaveTimeout.current) {
        clearTimeout(autoSaveTimeout.current);
        autoSaveTimeout.current = null;
      }
    };
  }, [article.title, article.content, isSaving, isPublishing, autoSaveStatus]);

  const handleAutoSave = useCallback(async () => {
    if (isUnmountingRef.current) return;

    try {
      // Simulate auto-save
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (!isUnmountingRef.current) {
        setAutoSaveStatus('saved');
      }
    } catch {
      if (!isUnmountingRef.current) {
        setAutoSaveStatus('error');
      }
    }
  }, []);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isUnmountingRef.current) return;

      const newTitle = e.target.value;
      setArticle((prev) => ({ ...prev, title: newTitle }));

      // Clear title error if exists
      if (newTitle.trim() && errors.title) {
        setErrors((prev) => {
          const { ...rest } = prev;
          return rest;
        });
      }
    },
    [errors.title]
  );

  const handleContentChange = useCallback(
    (content: string) => {
      if (isUnmountingRef.current) return;

      if (editorContentRef.current !== content) {
        editorContentRef.current = content;
        setArticle((prev) => ({ ...prev, content }));

        // Clear content error if exists
        if (content.trim() && errors.content) {
          setErrors((prev) => {
            const { ...rest } = prev;
            return rest;
          });
        }
      }
    },
    [errors.content]
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!article.title?.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!article.content?.trim()) {
      newErrors.content = 'Content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [article.title, article.content]);

  const handleSaveDraft = useCallback(async () => {
    if (isUnmountingRef.current || isSaving) return;

    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!isUnmountingRef.current) {
        setSuccess('Draft saved successfully');
        setTimeout(() => {
          if (!isUnmountingRef.current) {
            setSuccess('');
          }
        }, 3000);
      }
    } catch {
      if (!isUnmountingRef.current) {
        setErrors({ save: 'Failed to save draft' });
      }
    } finally {
      if (!isUnmountingRef.current) {
        setIsSaving(false);
      }
    }
  }, [isSaving]);

  const handlePreview = useCallback(() => {
    if (isUnmountingRef.current) return;
    console.log('Preview article:', article);
  }, [article]);

  const handlePublish = useCallback(async () => {
    if (isUnmountingRef.current || isPublishing) return;

    setErrors({});

    if (!validateForm()) return;

    setIsPublishing(true);
    try {
      await articleService.create(article);

      if (!isUnmountingRef.current) {
        setSuccess('Article published successfully!');
        setTimeout(() => {
          if (!isUnmountingRef.current) {
            goToArticles();
          }
        }, 1500);
      }
    } catch {
      if (!isUnmountingRef.current) {
        setErrors({ publish: 'Failed to publish article. Please try again.' });
      }
    } finally {
      if (!isUnmountingRef.current) {
        setIsPublishing(false);
      }
    }
  }, [article, articleService, goToArticles, isPublishing, validateForm]);

  const clearError = useCallback((field: string) => {
    if (isUnmountingRef.current) return;

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const clearSuccess = useCallback(() => {
    if (isUnmountingRef.current) return;
    setSuccess('');
  }, []);

  const getAutoSaveContent = useCallback(() => {
    switch (autoSaveStatus) {
      case 'saving':
        return { icon: <CircularProgress size={8} />, text: 'Saving...' };
      case 'saved':
        return { icon: <Check sx={{ fontSize: 12 }} />, text: 'Saved' };
      case 'error':
        return { icon: <Error sx={{ fontSize: 12 }} />, text: 'Save failed' };
      default:
        return { icon: null, text: '' };
    }
  }, [autoSaveStatus]);

  const autoSaveContent = getAutoSaveContent();

  return (
    <WriteContainer>
      {/* Header */}
      <HeaderBar>
        <HeaderContent>
          <LogoSection>
            <a href="/" className="logo">
              ThoughtSphere
            </a>
            <StatusIndicator>
              <span className="status-dot" />
              {autoSaveContent.icon}
              <span>{autoSaveContent.text}</span>
            </StatusIndicator>
          </LogoSection>

          <ActionSection>
            <SecondaryButton onClick={handlePreview}>
              <Visibility sx={{ fontSize: 16 }} />
              Preview
            </SecondaryButton>

            <SecondaryButton onClick={handleSaveDraft} disabled={isSaving}>
              {isSaving ? (
                <CircularProgress size={16} />
              ) : (
                <Save sx={{ fontSize: 16 }} />
              )}
              {isSaving ? 'Saving...' : 'Save'}
            </SecondaryButton>

            <PublishButton onClick={handlePublish} disabled={isPublishing}>
              {isPublishing ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <Publish sx={{ fontSize: 16 }} />
              )}
              {isPublishing ? 'Publishing...' : 'Publish'}
            </PublishButton>

            <SecondaryButton>
              <MoreHoriz sx={{ fontSize: 16 }} />
            </SecondaryButton>
          </ActionSection>
        </HeaderContent>
      </HeaderBar>

      {/* Main Editor */}
      <EditorSection>
        {/* Error Messages */}
        {Object.entries(errors).map(([field, message]) => (
          <ErrorMessage key={field}>
            <Error sx={{ fontSize: 16 }} />
            <span>{message}</span>
            <Close
              sx={{ fontSize: 16, marginLeft: 'auto', cursor: 'pointer' }}
              onClick={() => clearError(field)}
            />
          </ErrorMessage>
        ))}

        {/* Success Message */}
        {success && (
          <SuccessMessage>
            <CheckCircle sx={{ fontSize: 16 }} />
            <span>{success}</span>
            <Close
              sx={{ fontSize: 16, marginLeft: 'auto', cursor: 'pointer' }}
              onClick={clearSuccess}
            />
          </SuccessMessage>
        )}

        {/* Title Input */}
        <TitleInput
          placeholder="Title"
          value={article.title}
          onChange={handleTitleChange}
          maxLength={100}
        />

        <RichTextEditor
          key="main-editor"
          content={article.content}
          setContent={handleContentChange}
          placeholder="Tell your story..."
        />
      </EditorSection>

      {/* Floating Actions */}
      <FloatingActions>
        <FloatingButton
          onClick={handleSaveDraft}
          disabled={isSaving}
          title="Save Draft"
        >
          {isSaving ? <CircularProgress size={20} /> : <Save />}
        </FloatingButton>

        <FloatingButton onClick={handlePreview} title="Preview">
          <Visibility />
        </FloatingButton>

        <FloatingButton
          className="primary"
          onClick={handlePublish}
          disabled={isPublishing}
          title="Publish"
        >
          {isPublishing ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <Publish />
          )}
        </FloatingButton>
      </FloatingActions>

      {/* Loading Overlay */}
      {isPublishing && (
        <LoadingOverlay>
          <LoadingContent>
            <CircularProgress size={32} sx={{ color: '#1a8917' }} />
            <span className="loading-text">Publishing your story...</span>
          </LoadingContent>
        </LoadingOverlay>
      )}
    </WriteContainer>
  );
};

export default WriteArticlePage;

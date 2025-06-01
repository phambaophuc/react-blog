import { useEffect, useState } from 'react';

import Layout from '@/components/Layout';
import RichTextEditor from '@/components/RichTextEditor';
import { useApiServices } from '@/services';
import { RootState } from '@/store';
import { CreateArticleType } from '@/types/ArticleType';
import { TagType } from '@/types/TagType';
import { useAppNavigation } from '@/utils/navigation';
import { useSelector } from 'react-redux';

import {
  Publish as PublishIcon,
  Save as SaveIcon,
  LocalOffer as TagIcon,
  Title as TitleIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { ActionButtons, StyledPaper } from './index.styled';

const WriteArticlePage = () => {
  const { goToSignin, goToArticles } = useAppNavigation();
  const { user } = useSelector((state: RootState) => state.auth);

  const [tags, setTags] = useState<TagType[]>([]);
  const [article, setArticle] = useState<CreateArticleType>({
    title: '',
    content: '',
    tagId: '',
  });
  const [isPublishing, setIsPublishing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { tags: tagService, articles: articleService } = useApiServices();

  useEffect(() => {
    if (!user) goToSignin();
  }, [goToSignin, user]);

  useEffect(() => {
    const fetchTags = async () => {
      const tagList = await tagService.findAll();
      setTags(tagList);
    };

    fetchTags();
  }, [tagService]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!article.title) newErrors.title = 'Title is required';
    if (!article.content) newErrors.content = 'Content is required';
    if (!article.tagId) newErrors.tagId = 'Tag is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePublish = async () => {
    if (!validateForm()) return;

    setIsPublishing(true);
    try {
      await articleService.create(article);
      goToArticles();
    } catch {
      throw new Error('Something went wrong!');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Layout maxWidth="lg">
      <StyledPaper>
        <Typography
          sx={{ mb: (theme) => theme.spacing(4) }}
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          📝 Write a Blog
        </Typography>

        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              label="Title"
              name="title"
              variant="outlined"
              fullWidth
              value={article.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <TitleIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth error={!!errors.tagId}>
              <InputLabel>Tag</InputLabel>
              <Select
                value={article.tagId}
                label="Tag"
                onChange={(e) =>
                  setArticle({ ...article, tagId: e.target.value })
                }
                input={
                  <OutlinedInput
                    startAdornment={
                      <InputAdornment position="start">
                        <TagIcon color="action" />
                      </InputAdornment>
                    }
                    label="Tag"
                  />
                }
              >
                {tags.map((tag) => (
                  <MenuItem key={tag.id} value={tag.id}>
                    {tag.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.tagId && (
                <Typography variant="caption" color="error">
                  {errors.tagId}
                </Typography>
              )}
            </FormControl>
          </Grid>
        </Grid>

        <RichTextEditor
          sx={{ mt: (theme) => theme.spacing(2) }}
          content={article.content}
          setContent={(c) => setArticle({ ...article, content: c })}
        />
        {errors.content && (
          <Typography variant="caption" color="error">
            {errors.content}
          </Typography>
        )}

        <ActionButtons>
          <Button variant="contained" color="primary" startIcon={<SaveIcon />}>
            Save Draft
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<VisibilityIcon />}
          >
            Preview
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handlePublish}
            startIcon={<PublishIcon />}
            disabled={isPublishing}
          >
            Publish
            {isPublishing && (
              <CircularProgress
                size={24}
                sx={{
                  color: 'white',
                  ml: (theme) => theme.spacing(1),
                }}
              />
            )}
          </Button>
        </ActionButtons>
      </StyledPaper>
    </Layout>
  );
};

export default WriteArticlePage;

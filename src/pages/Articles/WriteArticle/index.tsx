import { useEffect, useState } from 'react';

import Layout from '@components/Layout';
import RichTextEditor from '@components/RichTextEditor';
import ROUTES from '@constant/routes';
import { CreateArticleType } from '@models/Article';
import { TagType } from '@models/Tag';
import { articleService } from '@services/articleService';
import { storageService } from '@services/storageService';
import { tagService } from '@services/tagService';
import { RootState } from '@store/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  CloudUpload as CloudUploadIcon,
  Description as DescriptionIcon,
  Publish as PublishIcon,
  Save as SaveIcon,
  LocalOffer as TagIcon,
  Title as TitleIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import {
  ActionButtons,
  StyledPaper,
  UploadBox,
  VisuallyHiddenInput,
} from './index.styled';

const WriteArticlePage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const [tags, setTags] = useState<TagType[]>([]);
  const [article, setArticle] = useState<CreateArticleType>({
    title: '',
    description: '',
    content: '',
    imageUrl: '',
    tagId: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [useLink, setUseLink] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const fetchTags = async () => {
    const tagList = await tagService.findAll();
    setTags(tagList);
  };

  useEffect(() => {
    if (!user) navigate(ROUTES.SIGNIN);
  }, [navigate, user]);

  useEffect(() => {
    fetchTags();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!article.title) newErrors.title = 'Title is required';
    if (!article.description) newErrors.description = 'Description is required';
    if (!article.content) newErrors.content = 'Content is required';
    if (!article.tagId) newErrors.tagId = 'Tag is required';
    if (useLink && !article.imageUrl)
      newErrors.imageUrl = 'Image URL is required';
    if (!useLink && !imageFile) newErrors.imageFile = 'Image file is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePublish = async () => {
    if (!validateForm()) return;

    setIsPublishing(true);
    try {
      let uploadedImageUrl = article.imageUrl;
      if (imageFile) {
        uploadedImageUrl = await storageService.uploadFile(imageFile);
      }
      await articleService.create({ ...article, imageUrl: uploadedImageUrl });
      navigate(ROUTES.ARTICLES, { replace: true });
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

        <TextField
          label="Short Description"
          name="description"
          variant="outlined"
          fullWidth
          rows={2}
          value={article.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
          sx={{ mt: (theme) => theme.spacing(3) }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        <Box sx={{ my: (theme) => theme.spacing(2) }}>
          <FormControlLabel
            control={
              <Switch checked={useLink} onChange={() => setUseLink(!useLink)} />
            }
            label="Use Image URL"
          />

          {useLink ? (
            <TextField
              label="Image URL"
              name="imageUrl"
              variant="outlined"
              fullWidth
              value={article.imageUrl}
              onChange={handleChange}
              error={!!errors.imageUrl}
              helperText={errors.imageUrl}
              placeholder="Paste image URL here..."
            />
          ) : (
            <UploadBox as="label" sx={{ mt: (theme) => theme.spacing(1) }}>
              {imagePreview ? (
                <CardMedia
                  component="img"
                  image={imagePreview}
                  alt="Preview"
                  sx={{
                    height: '100%',
                    objectFit: 'none',
                    borderRadius: (theme) => theme.shape.borderRadius,
                  }}
                />
              ) : (
                <>
                  <CloudUploadIcon
                    sx={{
                      fontSize: (theme) => theme.typography.pxToRem(48),
                      color: 'gray',
                    }}
                  />
                  <Typography variant="body2" color="textSecondary">
                    Click to upload or drag & drop an image
                  </Typography>
                </>
              )}
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
              {errors.imageFile && (
                <Typography variant="caption" color="error">
                  {errors.imageFile}
                </Typography>
              )}
            </UploadBox>
          )}
        </Box>

        <RichTextEditor
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

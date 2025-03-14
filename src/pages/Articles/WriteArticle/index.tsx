import { useEffect, useState } from 'react';

import Layout from '@components/Layout';
import RichTextEditor from '@components/RichTextEditor';
import ROUTES from '@constant/routes';
import { CreateArticleType } from '@models/Article';
import { TagType } from '@models/Tag';
import { articleService } from '@services/articleService';
import { storageService } from '@services/storageService';
import { tagService } from '@services/tagService';
import { useNavigate } from 'react-router-dom';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DescriptionIcon from '@mui/icons-material/Description';
import TagIcon from '@mui/icons-material/LocalOffer';
import PublishIcon from '@mui/icons-material/Publish';
import SaveIcon from '@mui/icons-material/Save';
import TitleIcon from '@mui/icons-material/Title';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Box,
  Button,
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

const WriteBlogPage = () => {
  const navigate = useNavigate();

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

  const fetchTags = async () => {
    const tagList = await tagService.findAll();
    setTags(tagList);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePublish = async () => {
    let uploadedImageUrl = article.imageUrl;
    if (imageFile) {
      uploadedImageUrl = await storageService.uploadFile(imageFile);
    }
    await articleService.create({ ...article, imageUrl: uploadedImageUrl });
    navigate(ROUTES.ARTICLES, { replace: true });
  };

  return (
    <Layout maxWidth="lg">
      <StyledPaper>
        <Typography sx={{ mb: 4 }} variant="h4" fontWeight="bold" gutterBottom>
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
            <FormControl fullWidth>
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
          sx={{ marginTop: 3 }}
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

        <Box sx={{ my: 2 }}>
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
              placeholder="Paste image URL here..."
            />
          ) : (
            <UploadBox as="label" sx={{ marginTop: 1 }}>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
              ) : (
                <>
                  <CloudUploadIcon sx={{ fontSize: 48, color: 'gray' }} />
                  <Typography variant="body2" color="textSecondary">
                    Click to upload or drag & drop an image
                  </Typography>
                </>
              )}
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </UploadBox>
          )}
        </Box>

        <RichTextEditor
          content={article.content}
          setContent={(c) => setArticle({ ...article, content: c })}
        />

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
          >
            Publish
          </Button>
        </ActionButtons>
      </StyledPaper>
    </Layout>
  );
};

export default WriteBlogPage;

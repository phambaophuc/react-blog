import { useEffect, useState } from 'react';

import Layout from '@components/Layout';
import RichTextEditor from '@components/RichTextEditor';
import ROUTES from '@constant/routes';
import { CreatePostType } from '@models/Post';
import { TagType } from '@models/Tag';
import { postService } from '@services/postService';
import { storageService } from '@services/storageService';
import { tagService } from '@services/tagService';
import { useNavigate } from 'react-router-dom';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import {
  ButtonGroup,
  StyledPaper,
  UploadBox,
  VisuallyHiddenInput,
} from './index.styled';

const WriteBlogPage = () => {
  const navigate = useNavigate();

  const [tags, setTags] = useState<TagType[]>([]);
  const [post, setPost] = useState<CreatePostType>({
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
    try {
      const tagList = await tagService.findAll();
      setTags(tagList);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePublish = async () => {
    try {
      let uploadedImageUrl = post.imageUrl;
      if (imageFile) {
        uploadedImageUrl = await storageService.uploadFile(imageFile);
      }
      await postService.create({ ...post, imageUrl: uploadedImageUrl });
      navigate(ROUTES.BLOGS, { replace: true });
    } catch (error) {
      console.error('Error publishing post:', error);
    }
  };

  return (
    <Layout maxWidth="lg">
      <StyledPaper>
        <Typography sx={{ mb: 4 }} variant="h4" fontWeight="bold" gutterBottom>
          Write a Blog
        </Typography>

        <Grid container spacing={2}>
          <Grid size={4}>
            <TextField
              label="Title"
              name="title"
              variant="outlined"
              fullWidth
              value={post.title}
              onChange={handleChange}
            />

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Tag</InputLabel>
              <Select
                value={post.tagId}
                label="Tag"
                onChange={(e) => setPost({ ...post, tagId: e.target.value })}
              >
                {tags.map((tag) => (
                  <MenuItem key={tag.id} value={tag.id}>
                    {tag.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Short Description"
              name="description"
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              value={post.description}
              onChange={handleChange}
              sx={{ marginTop: 3 }}
            />

            <Box sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={useLink}
                    onChange={() => setUseLink(!useLink)}
                  />
                }
                label="Use Image URL"
              />

              {useLink ? (
                <TextField
                  label="Image URL"
                  name="imageUrl"
                  variant="outlined"
                  fullWidth
                  value={post.imageUrl}
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
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange}
                  />
                </UploadBox>
              )}
            </Box>
          </Grid>

          <Grid size={8}>
            <RichTextEditor
              content={post.content}
              setContent={(c) => setPost({ ...post, content: c })}
            />
          </Grid>
        </Grid>

        <ButtonGroup>
          <Button variant="outlined" size="large">
            Save Draft
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handlePublish}
          >
            Publish
          </Button>
        </ButtonGroup>
      </StyledPaper>
    </Layout>
  );
};

export default WriteBlogPage;

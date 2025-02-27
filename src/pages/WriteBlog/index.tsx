import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import Layout from '../../components/Layout';
import RichTextEditor from '../../components/RichTextEditor';
import { CreatePostType } from '../../models/Post';
import { TagType } from '../../models/Tag';
import { postService } from '../../services/postService';
import { storageService } from '../../services/storageService';
import { tagService } from '../../services/tagService';
import { ButtonGroup, StyledPaper, VisuallyHiddenInput } from './index.styled';

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

  useEffect(() => {
    tagService.getAllTags().then((val) => setTags(val));
  }, [tags]);

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
      await postService.createPost({ ...post, imageUrl: uploadedImageUrl });
      navigate('/');
    } catch (error) {
      console.error('Error publishing post:', error);
    }
  };

  return (
    <Layout maxWidth="lg">
      <StyledPaper elevation={3}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Write a Blog
        </Typography>

        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              label="Title"
              name="title"
              variant="outlined"
              fullWidth
              value={post.title}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth>
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
          </Grid>
        </Grid>

        <TextField
          label="Short Description"
          name="description"
          variant="outlined"
          fullWidth
          multiline
          rows={2}
          value={post.description}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />

        <Box
          sx={{
            border: '2px dashed #ccc',
            mb: '8px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            cursor: 'pointer',
            transition: '0.3s',
            '&:hover': { borderColor: '#1976d2' },
          }}
          component="label"
        >
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
              <CloudUploadIcon sx={{ fontSize: 40, color: '#888' }} />
              <Typography variant="body2" color="textSecondary">
                Click to upload or drag and drop
              </Typography>
            </>
          )}
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Box>

        <RichTextEditor
          content={post.content}
          setContent={(c) => setPost({ ...post, content: c })}
          sx={{ mt: 2 }}
        />

        <ButtonGroup>
          <Button variant="outlined">Save Draft</Button>
          <Button variant="contained" color="primary" onClick={handlePublish}>
            Publish
          </Button>
        </ButtonGroup>
      </StyledPaper>
    </Layout>
  );
};

export default WriteBlogPage;

import { useNavigate } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';

import { StyledButton } from './index.styled';

const WriteBlogButton = () => {
  const navigate = useNavigate();

  return (
    <StyledButton onClick={() => navigate('/posts/write')}>
      <EditIcon sx={{ fontSize: 18 }} />
      Viết Blog
    </StyledButton>
  );
};

export default WriteBlogButton;

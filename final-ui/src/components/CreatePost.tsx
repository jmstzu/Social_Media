import { useState } from 'react';
import { 
  Modal, 
  Box, 
  Button, 
  TextField, 
  IconButton, 
  Typography,
  CircularProgress
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { createPost } from '../services/api';
import { NewPost } from '../interface/post';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  maxWidth: '90vw',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 3,
};

export default function CreatePost({ open, onClose, onPostCreated }: { 
  open: boolean; 
  onClose: () => void;
  onPostCreated: (post: NewPost) => void;
}) {
  const [postData, setPostData] = useState<NewPost>({
    content: '',
    imageUrl: '',
    author: 'current_user' // Replace with actual user from auth context
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Handle image URL input
    if (name === 'imageUrl') {
      setImagePreview(value); // Show preview for the image URL
    }

    setPostData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postData.imageUrl) {
      setError('Please provide an image URL');
      return;
    }

    setIsSubmitting(true);
    try {
      const createdPost = await createPost(postData);
      onPostCreated(createdPost);
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setPostData({ content: '', imageUrl: '', author: 'current_user' });
    setImagePreview(null);
    setError('');
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Create New Post</Typography>
          <IconButton onClick={onClose} disabled={isSubmitting}>
            <Close />
          </IconButton>
        </Box>
        
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            {imagePreview ? (
              <Box sx={{ position: 'relative' }}>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  style={{ 
                    width: '100%', 
                    maxHeight: '400px', 
                    objectFit: 'contain', 
                    borderRadius: '8px' 
                  }}
                />
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Enter an image URL to preview it here.
              </Typography>
            )}
          </Box>

          <TextField
            fullWidth
            label="Image URL"
            name="imageUrl"
            value={postData.imageUrl}
            onChange={handleChange}
            sx={{ mb: 2 }}
            placeholder="Enter image URL..."
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          
          <TextField
            fullWidth
            label="Caption"
            name="content"
            value={postData.content}
            onChange={handleChange}
            multiline
            rows={3}
            sx={{ mb: 2 }}
            placeholder="Write a caption..."
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={!postData.imageUrl || isSubmitting}
              sx={{ 
                backgroundColor: '#0095f6',
                '&:hover': { backgroundColor: '#0077cc' },
                minWidth: '100px'
              }}
            >
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Share'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
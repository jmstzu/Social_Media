import { 
    Card, 
    CardHeader, 
    CardMedia, 
    IconButton, 
    Typography, 
    Avatar, 
    CardContent,
    CardActions,
    Box,
    Menu,
    MenuItem,
    TextField,
    Button
  } from '@mui/material';
  import { 
    FavoriteBorder, 
    MoreVert, 
    BookmarkBorder, 
    ChatBubbleOutline,
    ShareOutlined,
    Favorite,
    Edit,
    Delete,
    Close
  } from '@mui/icons-material';
  import { PostType } from '../interface/post';
  import { useState } from 'react';
  import { deletePost, updatePost, } from '../services/api';
  import avatarimage from '../assets/jms.jpg'
  
  interface PostProps {
    post: PostType;
    onDelete: (id: number) => void;
    onUpdate: (post: PostType) => void;
  }
  
  export default function Post({ post, onDelete, onUpdate }: PostProps) {
    const [liked, setLiked] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(post.content);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const open = Boolean(anchorEl);
  
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    const handleDelete = async () => {
      try {
        setIsSubmitting(true);
        await deletePost(post.id);
        onDelete(post.id);
      } catch (error) {
        console.error('Error deleting post:', error);
      } finally {
        setIsSubmitting(false);
        handleMenuClose();
      }
    };
  
    const handleEdit = () => {
      setIsEditing(true);
      handleMenuClose();
    };
  
    const handleSaveEdit = async () => {
      try {
        setIsSubmitting(true);
        const updatedPost = await updatePost(post.id, { content: editedContent });
        onUpdate(updatedPost);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating post:', error);
      } finally {
        setIsSubmitting(false);
      }
    };
  
    return (
      <Card sx={{ 
        maxWidth: 600, 
        my: 2,
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: 1,
        boxShadow: 'none'
      }}>
        <CardHeader
          avatar={<Avatar src={avatarimage} />}
          action={
            <>
              <IconButton aria-label="settings" onClick={handleMenuClick}>
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleEdit} disabled={isSubmitting}>
                  <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
                </MenuItem>
                <MenuItem onClick={handleDelete} disabled={isSubmitting}>
                  <Delete fontSize="small" sx={{ mr: 1 }} /> Delete
                </MenuItem>
              </Menu>
            </>
          }
          title={post.author}
          subheader={new Date(post.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })}
          sx={{
            py: 1,
            px: 2
          }}
        />
        <CardMedia
          component="img"
          height="600"
          image={post.imageUrl || '/placeholder.jpg'}
          alt={post.content}
          sx={{
            objectFit: 'cover'
          }}
        />
        <CardContent sx={{ py: 0, px: 2 }}>
          {isEditing ? (
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                multiline
                rows={3}
                sx={{ mb: 1 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button 
                  onClick={() => setIsEditing(false)} 
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  onClick={handleSaveEdit}
                  disabled={isSubmitting || !editedContent.trim()}
                  sx={{ backgroundColor: '#0095f6' }}
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                {liked ? 'You and 243 others' : '243 likes'}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <Box component="span" sx={{ fontWeight: 600, mr: 1 }}>{post.author}</Box>
                {post.content}
              </Typography>
            </>
          )}
          <Typography variant="caption" color="text.secondary">
            View all 24 comments
          </Typography>
        </CardContent>
        <CardActions sx={{ px: 2, py: 1 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton 
              aria-label="like" 
              onClick={() => setLiked(!liked)}
              disabled={isSubmitting}
            >
              {liked ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
            <IconButton aria-label="comment" disabled={isSubmitting}>
              <ChatBubbleOutline />
            </IconButton>
            <IconButton aria-label="share" disabled={isSubmitting}>
              <ShareOutlined />
            </IconButton>
          </Box>
          <IconButton aria-label="save" sx={{ ml: 'auto' }} disabled={isSubmitting}>
            <BookmarkBorder />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
import { AppBar, Toolbar, IconButton, InputBase, Box, Badge, Typography } from '@mui/material';
import { Search, Home, AddBox, FavoriteBorder, AccountCircle, SendOutlined } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CreatePost from './CreatePost';
import { NewPost } from '../interface/post'
import logo from '../assets/logo.png';

const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '25ch',
      },
    },
  },
}));

export default function Navbar() {
  const navigate = useNavigate();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handlePostCreated = (newPost: NewPost) => {
    // Handle the newly created post (e.g., update state in parent component)
    console.log('New post created:', newPost);
  };

  return (
    <>
      <AppBar 
        position="sticky" 
        color="default" 
        elevation={0}
        sx={{ 
          backgroundColor: 'background.paper',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
        }}
      >
        <Toolbar sx={{ 
            justifyContent: 'space-between',
            maxWidth: 1000,
            width: '100%',
            mx: 'auto',
            px: 2
          }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src={logo} 
              alt="Logo" 
              height={29} 
              style={{ marginRight: 16, cursor: 'pointer' }}
              onClick={() => navigate('/')}
            />
             <Typography 
      variant="h6" 
      sx={{ 
        fontFamily: "'Instagram Sans', sans-serif",
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: '28px',
        color: '#f71b1b',
        display: { xs: 'none', sm: 'block' }
      }}
    >
      Twicetagram
    </Typography>
          </Box>
          
          <SearchWrapper>
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
              sx={{
                backgroundColor: '#efefef',
                borderRadius: 1,
                px: 2,
                width: 268
              }}
            />
          </SearchWrapper>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton size="large" color="inherit" onClick={() => navigate('/')}>
              <Home fontSize="medium" />
            </IconButton>
            <IconButton size="large" color="inherit">
              <SendOutlined fontSize="medium" />
            </IconButton>
            <IconButton 
              size="large" 
              color="inherit" 
              onClick={() => setCreateModalOpen(true)}
            >
              <AddBox fontSize="medium" />
            </IconButton>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={4} color="error">
                <FavoriteBorder fontSize="medium" />
              </Badge>
            </IconButton>
            <IconButton size="large" color="inherit" onClick={() => navigate('/profile')}>
              <AccountCircle fontSize="medium" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
      <CreatePost 
        open={createModalOpen} 
        onClose={() => setCreateModalOpen(false)}
        onPostCreated={handlePostCreated}
      />
    </>
  );
}
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Post from '../components/Post.tsx';
import { fetchPosts, createPost } from '../services/api';
import { PostType, NewPost } from '../interface/post.ts';
import { Box } from '@mui/material';
import CreatePost from '../components/CreatePost';

export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        console.error('Failed to load posts:', err);
      }
    };
    loadPosts();
  }, []);

  const handlePostCreated = async (newPost: NewPost) => {
    try {
      const createdPost = await createPost(newPost);
      setPosts(prev => [createdPost, ...prev]);
    } catch (error) {
      console.error('Error adding new post:', error);
    }
  };

  const handleDeletePost = (id: number) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const handleUpdatePost = (updatedPost: PostType) => {
    setPosts(prev => prev.map(post => post.id === updatedPost.id ? updatedPost : post));
  };

  return (
    <Box sx={{ backgroundColor: '#fafafa' }}>
      <Navbar />
      <Box 
        sx={{ 
          maxWidth: 600, 
          mx: 'auto', 
          pt: 2,
          pb: 6
        }}
      >
        <CreatePost 
          open={createModalOpen} 
          onClose={() => setCreateModalOpen(false)}
          onPostCreated={handlePostCreated}
        />
        {posts.map((post) => (
          <Post 
            key={post.id} 
            post={post} 
            onDelete={handleDeletePost}
            onUpdate={handleUpdatePost}
          />
        ))}
      </Box>
    </Box>
  );
}
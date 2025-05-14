import axios from 'axios';
import { PostType, NewPost } from '../interface/post.ts';

const API = axios.create({
  baseURL: 'http://localhost:8080/api/posts', // Make sure this matches your Spring Boot endpoint
});

// Fetch all posts
export const fetchPosts = async (): Promise<PostType[]> => {
    const { data } = await API.get(''); // Remove the '/'
    return data;
  };

// Create a post
export const createPost = async (post: NewPost): Promise<PostType> => {
  const { data } = await API.post('', post);
  return data;
};

// Update a post
export const updatePost = async (id: number, post: Partial<PostType>): Promise<PostType> => {
  const { data } = await API.put(`/${id}`, post);
  return data;
};

// Delete a post
export const deletePost = async (id: number): Promise<void> => {
  await API.delete(`/${id}`);
};
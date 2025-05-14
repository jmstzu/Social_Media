export type PostType = {
  id: number;
  content: string;
  imageUrl?: string;
  author: string;
  createdAt: string;
  updatedAt: string;
};

export type NewPost = Omit<PostType, 'id' | 'createdAt' | 'updatedAt'>;
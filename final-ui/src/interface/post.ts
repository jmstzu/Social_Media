// In post.ts:
export type PostType = {
  id: number;
  content: string;
  imageUrl?: string | null; // Make it explicitly optional
  author: string;
  createdAt: string;
  updatedAt: string;
};

export type NewPost = Omit<PostType, 'id' | 'createdAt' | 'updatedAt'> & {
  imageUrl?: string | null; // Ensure it's optional in NewPost as well
};
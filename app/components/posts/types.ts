// types.ts - Updated to match your database schema

export interface Author {
  id: string;
  name: string;
  username: string; // Changed from nickname to username
  avatarUrl: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
}

export interface Post {
  id: string;
  type: "PHOTO" | "TEXT" | "PROJECT"; // Changed to match PostType enum
  author: Author;
  authorId: string;

  // Content fields
  textContent?: string;
  caption?: string;
  imageUrls: string[]; // Always array as per schema

  // Project relation
  project?: Project;
  projectId?: string;

  // Computed stats from relations
  stats?: {
    stars: number;
    comments: number;
  };

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

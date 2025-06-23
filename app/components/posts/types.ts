// Definisikan tipe data Author secara terpisah agar bisa dipakai ulang
export interface Author {
  name: string;
  nickname: string;
  avatarUrl: string;
}

// Definisikan tipe data untuk sebuah Post
export interface Post {
  id: string;
  type: "photo" | "text" | "project";
  author: Author;
  timestamp: string;
  caption?: string;
  imageUrls?: string[];
  textContent?: string;
  project?: {
    title: string;
    description: string;
    link: string;
  };
  // Tambahkan data untuk stats
  stats?: {
    stars: number;
    comments: number;
  };
}

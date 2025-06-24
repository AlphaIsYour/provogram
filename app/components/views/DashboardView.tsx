// app/page.tsx
"use client";

import Scene from "@/app/components/Scene";
import { Suspense, useEffect, useState } from "react";
import PostCard from "@/app/components/posts/PostCard";
import { Post } from "@/app/components/posts/types";
import Navbar from "@/app/components/layout/Navbar";
// Pindahkan data dummy ke dalam sebuah array
const postsData: Post[] = [
  {
    id: "1",
    type: "photo",
    author: {
      name: "Yoralph",
      nickname: "yoralph",
      avatarUrl: "/path/to/avatar.png",
    },
    timestamp: "20 hours ago",
    caption: "Mencoba membuat komponen card yang reusable. Ternyata seru juga!",
    imageUrls: ["/posts/21.png"],
    stats: { stars: 102, comments: 12 },
  },
  {
    id: "2",
    type: "photo",
    author: { name: "Yoralph", nickname: "yoralph", avatarUrl: "" },
    timestamp: "10 hours ago",
    caption: "Koleksi foto dari perjalanan kemarin. Ada 5 foto di sini!",
    imageUrls: [
      "/posts/21.png",
      "/posts/22.png",
      "/posts/23.png",
      "/posts/24.png",
      "/posts/21.png",
    ],
    stats: { stars: 300, comments: 45 },
  },
  {
    id: "3",
    type: "text",
    author: {
      name: "Yoralph",
      nickname: "yoralph",
      avatarUrl: "/path/to/avatar.png",
    },
    timestamp: "1 day ago",
    textContent:
      "Baru saja selesai mengimplementasikan sistem authentikasi menggunakan NextAuth.js. Prosesnya cukup lurus, tapi ada beberapa 'gotcha' terkait provider OAuth. Overall, pengalaman yang sangat positif!",
    stats: { stars: 78, comments: 5 },
  },
  {
    id: "4",
    type: "project",
    author: {
      name: "Yoralph",
      nickname: "yoralph",
      avatarUrl: "/path/to/avatar.png",
    },
    timestamp: "June 01, 2025",
    project: {
      title: "Portfolio 3D Interaktif",
      description:
        "Sebuah website portfolio yang menggabungkan Three.js dan React untuk menciptakan pengalaman 3D yang imersif saat user scroll halaman.",
      link: "https://github.com/yoralph/provogram",
    },
    stats: { stars: 256, comments: 23 },
  },
];

export default function Home() {
  const [viewportHeight, setViewportHeight] = useState("100vh");

  useEffect(() => {
    // Logika untuk mengatur tinggi viewport ini sudah bagus, biarkan saja.
    const updateHeight = () => {
      const navbar = document.querySelector("nav");
      const navbarHeight = navbar ? navbar.offsetHeight : 64;
      setViewportHeight(`calc(100vh - ${navbarHeight}px)`);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <>
      <Navbar />
      {/* Gunakan viewportHeight untuk mengatur tinggi container utama */}
      <div
        className="w-full bg-black relative"
        style={{ height: viewportHeight }}
      >
        {/* Container untuk feed postingan (sebagai background) */}
        <div className="w-full h-full overflow-y-auto">
          <div className="flex flex-col items-center gap-4 py-8 px-4">
            {/* Gunakan .map untuk merender semua postingan */}
            {postsData.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Container untuk 3D Model (di pojok kiri bawah, lebih kecil) */}
        <div className="fixed bottom-2 left-2 w-58 h-58 z-20 pointer-events-auto">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full text-white">
                Loading...
              </div>
            }
          >
            <Scene />
          </Suspense>
        </div>
      </div>
    </>
  );
}

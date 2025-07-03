/* eslint-disable @typescript-eslint/no-explicit-any */
// DashboardView.tsx - Updated for dynamic data
"use client";

import { useEffect, useState } from "react";
import PostCard from "@/app/components/posts/PostCard";
import { Post } from "@/app/components/posts/types";
import Navbar from "@/app/components/layout/Navbar";

export default function DashboardView() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewportHeight, setViewportHeight] = useState("100vh");

  // Fetch posts from your API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/posts"); // Adjust API endpoint as needed
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();

        // Transform data to match your Post interface if needed
        const transformedPosts = data.map((post: any) => ({
          ...post,
          createdAt: new Date(post.createdAt),
          updatedAt: new Date(post.updatedAt),
          // Calculate stats from likes and comments if available
          stats: {
            stars: post.likes?.length || 0,
            comments: post.comments?.length || 0,
          },
        }));

        setPosts(transformedPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Viewport height calculation
  useEffect(() => {
    const updateHeight = () => {
      const navbar = document.querySelector("nav");
      const navbarHeight = navbar ? navbar.offsetHeight : 64;
      setViewportHeight(`calc(100vh - ${navbarHeight}px)`);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div
          className="w-full bg-black relative flex items-center justify-center"
          style={{ height: viewportHeight }}
        >
          <div className="text-white text-lg">Loading posts...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div
          className="w-full bg-black relative flex items-center justify-center"
          style={{ height: viewportHeight }}
        >
          <div className="text-red-400 text-lg">Error: {error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div
        className="w-full bg-black relative"
        style={{ height: viewportHeight, fontFamily: "mona-sans" }}
      >
        {/* Container untuk feed postingan (sebagai background) */}
        <div className="w-full h-full overflow-y-auto">
          <div className="flex flex-col items-center gap-4 py-8 px-4">
            {posts.length === 0 ? (
              <div className="text-gray-400 text-lg">No posts found</div>
            ) : (
              posts.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>
        </div>
      </div>
    </>
  );
}

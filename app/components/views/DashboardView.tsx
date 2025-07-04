/* eslint-disable @typescript-eslint/no-explicit-any */
// DashboardView.tsx - Revisi Final Layout
"use client";

import { useEffect, useState, useCallback } from "react";
import PostCard from "@/app/components/posts/PostCard";
import CreatePost from "@/app/components/posts/CreatePost";
import FeedTabs from "@/app/components/layout/FeedTabs"; // Pastikan path ini benar
import { Post } from "@/app/components/posts/types";
import Navbar from "@/app/components/layout/Navbar";

type FeedTab = "for-you" | "following";

export default function DashboardView() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<FeedTab>("for-you");

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch(`/api/posts?feed=${activeTab}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch posts for "${activeTab}"`);
      }
      const data = await response.json();
      const transformedPosts = data.map((post: any) => ({
        ...post,
        author: post.author,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt),
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
  }, [activeTab]);

  useEffect(() => {
    setLoading(true);
    fetchPosts();
  }, [fetchPosts, activeTab]);

  const handlePostCreated = () => {
    // Refresh tab saat ini setelah post baru dibuat
    if (activeTab !== "for-you") {
      // Jika user sedang di tab 'following', paling logis pindah ke 'for-you' untuk melihat post-nya
      setActiveTab("for-you");
    } else {
      // Jika sudah di 'for-you', cukup refresh
      fetchPosts();
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="w-full min-h-screen bg-black text-white"
        style={{ fontFamily: "mona-sans" }}
      >
        <div className="max-w-6xl min-h-screen mx-auto border-x border-gray-700">
          {/* BAGIAN KUNCI: Header dengan Tab Sticky */}
          {/* div ini yang akan menempel di atas dan memiliki background transparan */}
          <div className="sticky top-16 z-10 bg-black/80 backdrop-blur-md">
            {/* Judul Utama, tetap di atas tab */}
            <FeedTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Konten yang bisa di-scroll */}
          <div className="flex flex-col">
            {/* Komponen CreatePost sekarang di sini, akan ikut scroll */}
            <div className="border-b border-gray-700">
              <CreatePost onPostCreated={handlePostCreated} />
            </div>

            {/* Feed Content */}
            {loading ? (
              <div className="text-gray-400 text-lg text-center py-10">
                Loading...
              </div>
            ) : error ? (
              <div className="text-red-400 text-lg text-center py-10">
                Error: {error}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-gray-400 text-lg text-center py-10 px-4">
                {activeTab === "for-you"
                  ? "Welcome! The feed is quiet... Be the first to post!"
                  : "Follow other users to see their posts here."}
              </div>
            ) : (
              posts.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>
        </div>
      </div>
    </>
  );
}

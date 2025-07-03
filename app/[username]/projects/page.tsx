/* eslint-disable @typescript-eslint/no-unused-vars */
// app/[username]/projects/page.tsx

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Code,
  Star,
  Globe,
  Database,
  Server,
  Palette,
  Smartphone,
} from "lucide-react";
import ProjectsList from "./ProjectsList"; // <-- IMPORT KOMPONEN BARU
import { getIconComponent } from "@/lib/icons";

// ==================================
// KOMPONEN UTAMA (SERVER)
// ==================================
export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  // 1. Fetch user untuk mendapatkan ID
  const user = await prisma.user.findUnique({
    where: { username: username },
  });

  if (!user) {
    notFound();
  }

  // 2. Fetch semua project milik user dengan relasi yang dibutuhkan
  const projects = await prisma.project.findMany({
    where: { authorId: user.id, isPublished: true },
    include: {
      technologies: true,
      category: true,
    },
    orderBy: {
      isFeatured: "desc", // Tampilkan yang featured dulu
    },
  });

  // 3. Fetch semua kategori project untuk filter
  const categories = await prisma.projectCategory.findMany({
    include: {
      _count: {
        select: {
          projects: { where: { authorId: user.id, isPublished: true } },
        },
      },
    },
  });

  // 4. Hitung statistik proyek secara dinamis
  const projectStats = await prisma.project.aggregate({
    where: { authorId: user.id, isPublished: true },
    _count: {
      id: true,
      isFeatured: true,
    },
    _sum: {
      stars: true,
      views: true,
    },
  });

  const activeCount = await prisma.project.count({
    where: {
      authorId: user.id,
      isPublished: true,
      status: { in: ["ACTIVE", "ONGOING"] },
    },
  });
  const completedCount = await prisma.project.count({
    where: { authorId: user.id, isPublished: true, status: "COMPLETED" },
  });

  const stats = {
    total: projectStats._count.id,
    active: activeCount,
    completed: completedCount,
    totalStars: projectStats._sum.stars || 0,
    totalViews: projectStats._sum.views || 0,
    featured: await prisma.project.count({
      where: { authorId: user.id, isPublished: true, isFeatured: true },
    }),
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href={`/${username}`}
            className="p-2 bg-[#161B22] hover:bg-[#21262D] rounded-lg border border-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold flex items-center">
              <Code className="w-6 h-6 mr-2 text-blue-400" />
              Projects Portfolio
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Showcase of my development work and contributions
            </p>
          </div>
        </div>
        <div className="bg-[#161B22] p-2 rounded-lg border border-gray-800">
          <div className="text-center">
            <div className="text-xl font-bold text-blue-400">{stats.total}</div>
            <div className="text-sm text-gray-400">Total Projects</div>
          </div>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 p-4 rounded-lg border border-blue-800/30">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {stats.total}
            </div>
            <div className="text-sm text-blue-300">Total</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-900/50 to-green-800/50 p-4 rounded-lg border border-green-800/30">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {stats.active}
            </div>
            <div className="text-sm text-green-300">Active</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 p-4 rounded-lg border border-purple-800/30">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {stats.completed}
            </div>
            <div className="text-sm text-purple-300">Completed</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 p-4 rounded-lg border border-yellow-800/30">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {stats.totalStars}
            </div>
            <div className="text-sm text-yellow-300">Total Stars</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-pink-900/50 to-pink-800/50 p-4 rounded-lg border border-pink-800/30">
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-400">
              {stats.totalViews}
            </div>
            <div className="text-sm text-pink-300">Total Views</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-900/50 to-orange-800/50 p-4 rounded-lg border border-orange-800/30">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">
              {stats.featured}
            </div>
            <div className="text-sm text-orange-300">Featured</div>
          </div>
        </div>
      </div>

      {/* Melempar data ke Client Component */}
      <ProjectsList projects={projects} categories={categories} />
    </div>
  );
}

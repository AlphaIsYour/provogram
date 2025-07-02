/* eslint-disable @typescript-eslint/no-unused-vars */
// app/[username]/achievements/page.tsx

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Trophy,
  Medal,
  Star,
  Flame,
  Users,
  Crown,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import AchievementsList from "./AchievementsList"; // <-- IMPORT KOMPONEN BARU

export default async function AchievementsPage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;

  // 1. Fetch user untuk mendapatkan ID dan data sidebar
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      // Hanya ambil achievement yang sudah didapat untuk sidebar
      userAchievements: {
        where: { earnedAt: { not: null } },
        include: {
          achievement: true,
        },
        orderBy: {
          earnedAt: "desc",
        },
        take: 3, // Ambil 3 terbaru
      },
    },
  });

  if (!user) {
    notFound();
  }

  // 2. Fetch SEMUA achievement, tapi sertakan data spesifik user ini (progress, earnedAt)
  const allAchievements = await prisma.achievement.findMany({
    include: {
      category: true,
      awardedTo: {
        where: { userId: user.id },
      },
    },
    orderBy: {
      xp: "desc",
    },
  });

  // 3. Fetch SEMUA kategori untuk filter, beserta jumlah total achievement di dalamnya
  const allCategories = await prisma.category.findMany({
    include: {
      _count: {
        select: { achievements: true },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  // 4. Kalkulasi statistik untuk sidebar
  const earnedCount = await prisma.userAchievement.count({
    where: { userId: user.id, earnedAt: { not: null } },
  });

  const rareEarnedCount = await prisma.userAchievement.count({
    where: {
      userId: user.id,
      earnedAt: { not: null },
      achievement: {
        rarity: { in: ["EPIC", "LEGENDARY"] },
      },
    },
  });

  const achievementStats = {
    totalBadges: earnedCount,
    rareAchievements: rareEarnedCount,
    currentStreak: user.streak,
    totalXP: user.totalXp,
    rank: user.communityRank || "#-",
    level: user.level,
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-4">
          <Link
            href={`/${username}`}
            className="p-2 bg-[#161B22] hover:bg-[#21262D] rounded-lg border border-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold flex items-center">
              <Trophy className="w-6 h-6 mr-2 text-blue-400" />
              Achievements & Badges
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Track your learning journey and accomplishments
            </p>
          </div>
        </div>
        <div className="bg-[#161B22] p-2 rounded-lg border border-gray-800">
          <div className="text-center">
            <div className="text-xl font-bold text-green-400">
              Level {achievementStats.level}
            </div>
            <div className="text-sm text-gray-400">
              {achievementStats.totalXP} XP Total
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Stats Sidebar (Tetap di Server Component) */}
        <div className="lg:col-span-1">
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800 sticky top-24">
            <div className="flex flex-col items-center mb-6">
              <Image
                src={user.image || "/default-avatar.png"}
                alt={user.name || "User"}
                width={80}
                height={80}
                className="rounded-full border-2 border-gray-700 mb-3"
              />
              <h2 className="text-lg font-bold">{user.name}</h2>
              <p className="text-gray-400">@{user.username}</p>
            </div>
            <div className="space-y-4">
              <div className="bg-[#0D1117] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Total Badges</span>
                  <Medal className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-yellow-400">
                  {achievementStats.totalBadges}
                </div>
              </div>
              <div className="bg-[#0D1117] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Rare Achievements</span>
                  <Crown className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-purple-400">
                  {achievementStats.rareAchievements}
                </div>
              </div>
              <div className="bg-[#0D1117] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Current Streak</span>
                  <Flame className="w-4 h-4 text-orange-400" />
                </div>
                <div className="text-2xl font-bold text-orange-400">
                  {achievementStats.currentStreak} days
                </div>
              </div>
              <div className="bg-[#0D1117] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Community Rank</span>
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-green-400">
                  {achievementStats.rank}
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                Recent
              </h3>
              <div className="space-y-3">
                {user.userAchievements.length > 0 ? (
                  //...
                  user.userAchievements.map(({ achievement }) => {
                    return (
                      <div
                        key={achievement.id}
                        className="bg-[#0D1117] p-3 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          {/* Gunakan ikon default atau yang relevan */}
                          <Award className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-semibold truncate">
                              {achievement.name}
                            </p>
                            <p className="text-xs text-gray-400 capitalize">
                              {achievement.rarity.toLowerCase()}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500 text-center">
                    No recent achievements.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content (Sekarang memanggil Client Component) */}
        <div className="lg:col-span-3 space-y-6">
          <AchievementsList
            allAchievements={allAchievements}
            allCategories={allCategories}
          />
        </div>
      </div>
    </div>
  );
}

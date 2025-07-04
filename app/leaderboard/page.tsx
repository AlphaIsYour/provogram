// app/leaderboard/page.tsx

import prisma from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/app/components/layout/Navbar";
import Link from "next/link";
import LeaderboardTabs from "./LeaderboardTabs"; // Nanti kita buat ini

export default async function LeaderboardPage() {
  const take = 100; // Ambil 100 user teratas untuk setiap kategori

  // 1. Fetch data untuk setiap kategori leaderboard
  const topLearners = await prisma.user.findMany({
    orderBy: { totalXp: "desc" },
    take,
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      totalXp: true,
      level: true,
      streak: true,
    },
  });

  const topContributors = await prisma.user.findMany({
    orderBy: { skillPoints: "desc" },
    take,
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      skillPoints: true,
      communityRank: true,
    },
  });

  const topCreators = await prisma.user.findMany({
    include: { _count: { select: { projects: true } } },
    orderBy: { projects: { _count: "desc" } },
    take,
  });

  const topAchievers = await prisma.user.findMany({
    include: { _count: { select: { userAchievements: true } } },
    orderBy: { userAchievements: { _count: "desc" } },
    take,
  });

  // Gabungkan semua data ke dalam satu objek untuk dilempar ke client component
  const leaderboards = {
    topLearners,
    topContributors,
    topCreators,
    topAchievers,
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#0D1117]">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="p-2 bg-[#161B22] hover:bg-[#21262D] rounded-lg border border-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center text-gray-200">
                Community Leaderboard
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                See who is leading the pack in our community!
              </p>
            </div>
          </div>
        </div>

        {/* Client Component untuk menampilkan Tabs dan Tabel */}
        <LeaderboardTabs leaderboards={leaderboards} />
      </div>
    </>
  );
}

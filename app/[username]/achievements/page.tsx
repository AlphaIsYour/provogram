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
  Target,
  Zap,
  Crown,
  Shield,
  Flame,
  Users,
  BookOpen,
  Code,
  Heart,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Clock,
  Gift,
  Sparkles,
  BadgeCheck,
  MapPin,
  Globe,
  Coffee,
  Lightbulb,
  Brain,
  Rocket,
  Diamond,
  Gem,
} from "lucide-react";

export default async function AchievementsPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  // Await the params Promise
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    notFound();
  }

  // Mock data untuk achievements
  const achievementStats = {
    totalBadges: 47,
    rareAchievements: 8,
    currentStreak: 47,
    totalXP: 12847,
    rank: "#156",
    level: 28,
  };

  const categories = [
    { name: "All", count: 47, active: true },
    { name: "Programming", count: 15, active: false },
    { name: "Learning", count: 12, active: false },
    { name: "Community", count: 8, active: false },
    { name: "Projects", count: 7, active: false },
    { name: "Mentoring", count: 5, active: false },
  ];

  const achievements = [
    {
      id: 1,
      title: "Code Master",
      description: "Completed 100+ coding challenges",
      icon: Code,
      rarity: "Legendary",
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      textColor: "text-purple-400",
      borderColor: "border-purple-500",
      xp: 500,
      earnedDate: "2024-12-15",
      progress: 100,
      category: "Programming",
      requirements: "Complete 100 coding challenges",
    },
    {
      id: 2,
      title: "Learning Streak Champion",
      description: "Maintained 50+ day learning streak",
      icon: Flame,
      rarity: "Epic",
      color: "bg-gradient-to-br from-orange-500 to-red-500",
      textColor: "text-orange-400",
      borderColor: "border-orange-500",
      xp: 300,
      earnedDate: "2024-12-10",
      progress: 100,
      category: "Learning",
      requirements: "Maintain 50+ day learning streak",
    },
    {
      id: 3,
      title: "Community Hero",
      description: "Helped 100+ students in the community",
      icon: Users,
      rarity: "Epic",
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
      textColor: "text-blue-400",
      borderColor: "border-blue-500",
      xp: 400,
      earnedDate: "2024-12-08",
      progress: 100,
      category: "Community",
      requirements: "Help 100+ students",
    },
    {
      id: 4,
      title: "Project Builder",
      description: "Built and deployed 25+ projects",
      icon: Rocket,
      rarity: "Rare",
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
      textColor: "text-green-400",
      borderColor: "border-green-500",
      xp: 250,
      earnedDate: "2024-12-05",
      progress: 100,
      category: "Projects",
      requirements: "Build and deploy 25+ projects",
    },
    {
      id: 5,
      title: "Mentor Excellence",
      description: "Conducted 20+ mentoring sessions",
      icon: Crown,
      rarity: "Epic",
      color: "bg-gradient-to-br from-yellow-500 to-orange-500",
      textColor: "text-yellow-400",
      borderColor: "border-yellow-500",
      xp: 350,
      earnedDate: "2024-12-01",
      progress: 100,
      category: "Mentoring",
      requirements: "Conduct 20+ mentoring sessions",
    },
    {
      id: 6,
      title: "Speed Learner",
      description: "Completed 5 courses in 1 month",
      icon: Zap,
      rarity: "Rare",
      color: "bg-gradient-to-br from-indigo-500 to-purple-500",
      textColor: "text-indigo-400",
      borderColor: "border-indigo-500",
      xp: 200,
      earnedDate: "2024-11-28",
      progress: 100,
      category: "Learning",
      requirements: "Complete 5 courses in 1 month",
    },
    {
      id: 7,
      title: "JavaScript Ninja",
      description: "Mastered JavaScript fundamentals",
      icon: Brain,
      rarity: "Common",
      color: "bg-gradient-to-br from-gray-500 to-gray-600",
      textColor: "text-gray-400",
      borderColor: "border-gray-500",
      xp: 100,
      earnedDate: "2024-11-25",
      progress: 100,
      category: "Programming",
      requirements: "Complete JavaScript mastery course",
    },
    {
      id: 8,
      title: "React Expert",
      description: "Built 10+ React applications",
      icon: Shield,
      rarity: "Rare",
      color: "bg-gradient-to-br from-teal-500 to-blue-500",
      textColor: "text-teal-400",
      borderColor: "border-teal-500",
      xp: 300,
      earnedDate: "2024-11-20",
      progress: 100,
      category: "Programming",
      requirements: "Build 10+ React applications",
    },
    {
      id: 9,
      title: "Coffee Lover",
      description: "Coded for 100+ hours with coffee",
      icon: Coffee,
      rarity: "Common",
      color: "bg-gradient-to-br from-amber-600 to-orange-600",
      textColor: "text-amber-400",
      borderColor: "border-amber-500",
      xp: 50,
      earnedDate: "2024-11-15",
      progress: 100,
      category: "Fun",
      requirements: "Code for 100+ hours",
    },
    {
      id: 10,
      title: "Innovation Master",
      description: "Created 3 innovative solutions",
      icon: Lightbulb,
      rarity: "Epic",
      color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
      textColor: "text-yellow-300",
      borderColor: "border-yellow-400",
      xp: 400,
      earnedDate: "2024-11-10",
      progress: 100,
      category: "Projects",
      requirements: "Create 3 innovative solutions",
    },
    // Progress achievements (belum tercapai)
    {
      id: 11,
      title: "Full Stack Master",
      description: "Master both frontend and backend",
      icon: Diamond,
      rarity: "Legendary",
      color: "bg-gradient-to-br from-purple-600 to-pink-600",
      textColor: "text-purple-300",
      borderColor: "border-purple-400",
      xp: 1000,
      earnedDate: null,
      progress: 75,
      category: "Programming",
      requirements: "Complete full-stack mastery path",
    },
    {
      id: 12,
      title: "Open Source Contributor",
      description: "Contribute to 10 open source projects",
      icon: Globe,
      rarity: "Epic",
      color: "bg-gradient-to-br from-green-400 to-blue-500",
      textColor: "text-green-300",
      borderColor: "border-green-400",
      xp: 500,
      earnedDate: null,
      progress: 30,
      category: "Community",
      requirements: "Contribute to 10 open source projects",
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary":
        return "text-purple-400 bg-purple-900/20 border-purple-500";
      case "Epic":
        return "text-orange-400 bg-orange-900/20 border-orange-500";
      case "Rare":
        return "text-blue-400 bg-blue-900/20 border-blue-500";
      default:
        return "text-gray-400 bg-gray-900/20 border-gray-500";
    }
  };

  const recentAchievements = achievements
    .filter((a) => a.earnedDate)
    .sort(
      (a, b) =>
        new Date(b.earnedDate!).getTime() - new Date(a.earnedDate!).getTime()
    )
    .slice(0, 3);

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
            <div className="text-xl font-bold text-green-400">Level 28</div>
            <div className="text-sm text-gray-400">12847 XP Totals</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Stats Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800 sticky top-24">
            {/* Profile Summary */}
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

            {/* Achievement Stats */}
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

            {/* Recent Achievements */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                Recent
              </h3>
              <div className="space-y-3">
                {recentAchievements.map((achievement) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div
                      key={achievement.id}
                      className="bg-[#0D1117] p-3 rounded-lg"
                    >
                      <div className="flex items-center mb-2">
                        <div
                          className={`p-2 rounded-full ${achievement.color} mr-3`}
                        >
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold">
                            {achievement.title}
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(
                              achievement.earnedDate!
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Category Filter */}
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    category.active
                      ? "bg-blue-600 text-white"
                      : "bg-[#0D1117] text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon;
              const isEarned = achievement.earnedDate !== null;

              return (
                <div
                  key={achievement.id}
                  className={`bg-[#161B22] rounded-lg p-6 border transition-all duration-200 hover:scale-105 ${
                    isEarned
                      ? `${achievement.borderColor} border-opacity-50`
                      : "border-gray-800"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div
                        className={`p-3 rounded-full ${
                          isEarned ? achievement.color : "bg-gray-800"
                        } mr-4`}
                      >
                        <IconComponent
                          className={`w-6 h-6 ${
                            isEarned ? "text-white" : "text-gray-500"
                          }`}
                        />
                      </div>
                      <div>
                        <h3
                          className={`text-lg font-bold ${
                            isEarned ? achievement.textColor : "text-gray-500"
                          }`}
                        >
                          {achievement.title}
                        </h3>
                        <div
                          className={`text-xs px-2 py-1 rounded-full border inline-block ${getRarityColor(
                            achievement.rarity
                          )}`}
                        >
                          {achievement.rarity}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-bold ${
                          isEarned ? "text-green-400" : "text-gray-500"
                        }`}
                      >
                        +{achievement.xp} XP
                      </div>
                    </div>
                  </div>

                  <p
                    className={`mb-4 ${
                      isEarned ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {achievement.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-400">Progress</span>
                      <span
                        className={
                          isEarned ? "text-green-400" : "text-gray-400"
                        }
                      >
                        {achievement.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          isEarned
                            ? "bg-gradient-to-r from-green-500 to-emerald-500"
                            : "bg-gradient-to-r from-gray-600 to-gray-500"
                        }`}
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      {achievement.requirements}
                    </span>
                    {isEarned && (
                      <div className="flex items-center text-green-400">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        <span>
                          {new Date(
                            achievement.earnedDate!
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

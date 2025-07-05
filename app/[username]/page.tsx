/* eslint-disable @typescript-eslint/no-unused-vars */
// app/[username]/page.tsx

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Link as LinkIcon,
  Calendar,
  Download,
  Users,
  Star,
  GitFork,
  Building,
  Github,
  Twitter,
  Linkedin,
  Globe,
  Flame,
  BookOpen,
  Target,
  TrendingUp,
  Award,
  Code,
  Trophy,
  Medal,
  Share2,
  Zap,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// ==================================
// HELPER FUNCTIONS
// ==================================
// Import Prisma's ActivityType enum for type safety
import type { $Enums } from "@prisma/client";

// Tipe aktivitas yang didukung (sinkron dengan Prisma)
type ActivityType = $Enums.ActivityType;

// Helper untuk memetakan tipe aktivitas ke ikon dan warna
const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case "COURSE_COMPLETED":
      return { icon: CheckCircle2, color: "text-green-400" };
    case "PROJECT_SHARED":
      return { icon: Share2, color: "text-blue-400" };
    case "MENTORING":
      return { icon: Users, color: "text-purple-400" };
    case "ACHIEVEMENT_EARNED":
      return { icon: Award, color: "text-yellow-400" };
    case "CERTIFICATE_ADDED":
      return { icon: Trophy, color: "text-pink-400" };
    // Tambahkan case lain sesuai enum Prisma jika ada
    default:
      return { icon: Zap, color: "text-gray-400" };
  }
};

// ==================================
// KOMPONEN UTAMA
// ==================================
export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  // 1. Query utama untuk mengambil semua data yang dibutuhkan di halaman ini
  const user = await prisma.user.findUnique({
    where: { username: username },
    include: {
      projects: {
        where: { isPublished: true, isFeatured: true },
        include: { technologies: true },
        take: 2,
        orderBy: { createdAt: "desc" },
      },
      activityLogs: {
        take: 4,
        orderBy: { createdAt: "desc" },
      },
      userAchievements: {
        where: { earnedAt: { not: null } },
        take: 8,
        orderBy: { earnedAt: "desc" },
        include: {
          achievement: true,
        },
      },
      learningGoals: {
        take: 4,
        orderBy: { progress: "desc" },
      },
    },
  });

  if (!user) {
    notFound();
  }

  // 2. Kalkulasi statistik dinamis
  const learningStats = {
    coursesCompleted: await prisma.onlineCourse.count({
      where: { userId: user.id, status: "GRADUATED" },
    }),
    projectsBuilt: await prisma.project.count({ where: { authorId: user.id } }),
    // Field mentoringSessions dan helpedStudents perlu ditambahkan di skema User jika ingin dinamis
    // Untuk saat ini, kita bisa gunakan nilai statis atau dari field lain
    mentoringSessions: user.totalXp / 100, // Contoh kalkulasi
    helpedStudents: user.totalXp / 50, // Contoh kalkulasi
    totalLearningHours: await prisma.certificate
      .aggregate({ where: { userId: user.id }, _sum: { hours: true } })
      .then((res) => res._sum.hours || 0),
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800 sticky top-24">
            {/* Avatar & Basic Info */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <Image
                  src={user.image || "/default-avatar.png"}
                  alt={user.name || "User"}
                  width={120}
                  height={120}
                  className="rounded-full border-2 border-gray-700 mb-4"
                />
                {user.streak > 0 && (
                  <div className="absolute top-[12vh] right-[1vh] bg-orange-500 text-white rounded-full p-1.5 border-2 border-[#161B22]">
                    <Flame className="w-5 h-5" />
                  </div>
                )}
              </div>
              <h1 className="text-xl font-bold text-center">{user.name}</h1>
              <p className="text-gray-400 text-sm">@{user.username}</p>
              {user.streak > 0 && (
                <div className="flex items-center mt-2 text-orange-400">
                  <Flame className="w-4 h-4 mr-1" />
                  <span className="font-semibold">
                    {user.streak} day streak
                  </span>
                </div>
              )}
            </div>

            {/* Download CV Button */}
            {user.cvUrl && (
              <a
                href={user.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 mb-6 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span className="font-semibold">Download CV</span>
              </a>
            )}

            {/* Bio */}
            {user.bio && (
              <div className="mb-6">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {user.bio}
                </p>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-[#0D1117] p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-blue-400">
                  {user.skillPoints}
                </div>
                <div className="text-xs text-gray-400">Skill Points</div>
              </div>
              <div className="bg-[#0D1117] p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-green-400">
                  {user.communityRank || "#N/A"}
                </div>
                <div className="text-xs text-gray-400">Community Rank</div>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-3 mb-6 text-[14px] sm:text-[8px]">
              {user.jobTitle && (
                <div className="flex items-center text-gray-300">
                  <Building className="w-4 h-4 mr-2" />
                  <span>
                    {user.jobTitle} {user.company && `@${user.company}`}
                  </span>
                </div>
              )}
              {user.location && (
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.websiteUrl && (
                <div className="flex items-center text-gray-300">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  <a
                    href={user.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {user.websiteUrl.replace(/https?:\/\//, "")}
                  </a>
                </div>
              )}
              <div className="flex items-center text-gray-300">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  Learning since{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {user.githubUrl && (
                <a
                  href={user.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-white transition-colors bg-[#0D1117] rounded-lg"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {user.twitterUrl && (
                <a
                  href={user.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-white transition-colors bg-[#0D1117] rounded-lg"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {user.linkedinUrl && (
                <a
                  href={user.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-white transition-colors bg-[#0D1117] rounded-lg"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Welcome Message & Stats */}
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-6 border border-blue-800/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] sm:text-[18px] font-bold flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                Learning Journey
              </h2>
              <div className="text-right">
                <div className="text-[18px] sm:text-[18px] font-bold text-blue-400">
                  {learningStats.totalLearningHours}h
                </div>
                <div className="text-[10px] sm:text-[10px] text-gray-400">
                  Total Learning Time
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-black/30 rounded-lg">
                <BookOpen className="w-6 h-6 mx-auto mb-2 text-green-400" />
                <div className="text-xl font-bold">
                  {learningStats.coursesCompleted}
                </div>
                <div className="text-xs text-gray-400">Courses Completed</div>
              </div>
              <div className="text-center p-3 bg-black/30 rounded-lg">
                <Code className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                <div className="text-xl font-bold">
                  {learningStats.projectsBuilt}
                </div>
                <div className="text-xs text-gray-400">Projects Built</div>
              </div>
              <div className="text-center p-3 bg-black/30 rounded-lg">
                <Users className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                <div className="text-xl font-bold">
                  {Math.round(learningStats.helpedStudents)}
                </div>
                <div className="text-xs text-gray-400">Students Helped</div>
              </div>
              <div className="text-center p-3 bg-black/30 rounded-lg">
                <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                <div className="text-xl font-bold">
                  {Math.round(learningStats.mentoringSessions)}
                </div>
                <div className="text-xs text-gray-400">Mentoring Sessions</div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
            <h2 className="text-[18px] sm:text-[18px] font-semibold mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {user.activityLogs.map((activity) => {
                const { icon: IconComponent, color } = getActivityIcon(
                  activity.type
                );
                return (
                  <div
                    key={activity.id}
                    className="flex items-center p-3 bg-[#0D1117] rounded-lg hover:bg-[#21262D] transition-colors"
                  >
                    <div className="p-2 rounded-full bg-gray-800 mr-4">
                      <IconComponent className={`w-4 h-4 ${color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.message}</p>
                      <p className="text-sm text-gray-400">
                        {formatDistanceToNow(activity.createdAt, {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-400">
                        +{activity.points} XP
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Skill Badges */}
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] sm:text-[18px] font-semibold flex items-center">
                <Medal className="w-5 h-5 mr-2" />
                Skill Badges
              </h2>
              <Link
                href={`/${username}/achievements`}
                className="text-blue-400 hover:underline text-sm"
              >
                View all badges →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {user.userAchievements.map(({ achievement }) => (
                <div
                  key={achievement.id}
                  className="bg-[#0D1117] p-3 rounded-lg text-center hover:bg-[#21262D] transition-colors cursor-pointer"
                >
                  <div
                    className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center bg-gray-800`}
                  >
                    <Award className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="text-xs font-semibold">
                    {achievement.name}
                  </div>
                  <div className="text-xs text-gray-400 capitalize">
                    {achievement.rarity.toLowerCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Goals */}
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
            <h2 className="text-[18px] sm:text-[18px] font-semibold mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Current Learning Goals
            </h2>
            <div className="space-y-4">
              {user.learningGoals.map((goal) => (
                <div key={goal.id} className="bg-[#0D1117] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{goal.title}</h3>
                    {goal.targetDate && (
                      <span className="text-sm text-gray-400">
                        {new Date(goal.targetDate).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-sm text-gray-400 mt-1">
                    {goal.progress}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] sm:text-[18px] font-semibold flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Featured Projects
              </h2>
              <Link
                href={`/${username}/projects`}
                className="text-blue-400 hover:underline text-sm"
              >
                View all projects →
              </Link>
            </div>
            {/* Mobile: Horizontal scroll, Desktop: Grid */}
            <div className="flex overflow-x-auto space-x-4 pb-4 md:grid md:grid-cols-2 md:gap-6 md:space-x-0 md:overflow-visible md:pb-0">
              {user.projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-[#0D1117] border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 flex-shrink-0 w-80 md:w-auto md:flex-shrink"
                >
                  <div className="h-40 bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center">
                    <Code className="w-12 h-12 text-gray-400" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-blue-400 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech.id}
                          className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          <span>{project.stars}</span>
                        </div>
                        <div className="flex items-center">
                          <GitFork className="w-4 h-4 mr-1" />
                          <span>{project.forks}</span>
                        </div>
                      </div>
                      <button className="text-blue-400 hover:text-blue-300">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

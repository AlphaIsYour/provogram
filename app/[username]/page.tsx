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
  Mail,
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
  Clock,
  MessageCircle,
  Heart,
  Share2,
  Zap,
  Trophy,
  Medal,
  Brain,
  Lightbulb,
  Coffee,
  CheckCircle2,
} from "lucide-react";

export default async function ProfilePage({
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

  // Mock data untuk learning community
  const learningData = {
    streak: 47,
    totalLearningHours: 324,
    coursesCompleted: 12,
    projectsBuilt: 28,
    communityRank: "#156",
    skillPoints: 2847,
    mentoringSessions: 15,
    helpedStudents: 89,
  };

  const recentActivity = [
    {
      type: "course_completed",
      title: "Advanced React Patterns",
      time: "2 hours ago",
      points: 150,
      icon: CheckCircle2,
      color: "text-green-400",
    },
    {
      type: "project_shared",
      title: "E-commerce Dashboard",
      time: "1 day ago",
      points: 75,
      icon: Share2,
      color: "text-blue-400",
    },
    {
      type: "mentoring",
      title: "Helped 3 students with JavaScript",
      time: "2 days ago",
      points: 50,
      icon: Users,
      color: "text-purple-400",
    },
    {
      type: "achievement",
      title: "Earned 'Code Reviewer' badge",
      time: "3 days ago",
      points: 100,
      icon: Award,
      color: "text-yellow-400",
    },
  ];

  const skillBadges = [
    {
      name: "React Master",
      level: "Expert",
      color: "bg-blue-500",
      earned: "2024",
    },
    {
      name: "JavaScript Ninja",
      level: "Expert",
      color: "bg-yellow-500",
      earned: "2024",
    },
    {
      name: "TypeScript Pro",
      level: "Advanced",
      color: "bg-blue-600",
      earned: "2024",
    },
    {
      name: "Node.js Expert",
      level: "Expert",
      color: "bg-green-500",
      earned: "2023",
    },
    {
      name: "Python Developer",
      level: "Intermediate",
      color: "bg-green-600",
      earned: "2023",
    },
    {
      name: "UI/UX Enthusiast",
      level: "Intermediate",
      color: "bg-pink-500",
      earned: "2024",
    },
    {
      name: "Mentor",
      level: "Community",
      color: "bg-purple-500",
      earned: "2024",
    },
    {
      name: "Team Player",
      level: "Community",
      color: "bg-orange-500",
      earned: "2023",
    },
  ];

  const learningGoals = [
    { title: "Master Next.js 14", progress: 75, target: "July 2025" },
    { title: "Build 5 Full-stack Projects", progress: 60, target: "Aug 2025" },
    { title: "Mentor 50+ Students", progress: 89, target: "Dec 2025" },
    { title: "Contribute to Open Source", progress: 30, target: "Sep 2025" },
  ];

  const featuredProjects = [
    {
      title: "Smart Learning Platform",
      description:
        "AI-powered learning platform with personalized curriculum and progress tracking",
      tech: ["Next.js", "OpenAI", "PostgreSQL"],
      stars: 234,
      forks: 45,
      image: "/api/placeholder/300/200",
      featured: true,
    },
    {
      title: "Community Forum App",
      description: "Real-time discussion platform for programming communities",
      tech: ["React", "Socket.io", "MongoDB"],
      stars: 156,
      forks: 32,
      image: "/api/placeholder/300/200",
      featured: true,
    },
  ];

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
                {/* Learning Streak Badge */}
                <div className="absolute top-[12vh] right-[1vh] bg-orange-500 text-white rounded-full p-1.5 border-2 border-[#161B22]">
                  <Flame className="w-5 h-5" />
                </div>
              </div>
              <h1 className="text-xl font-bold text-center">{user.name}</h1>
              <p className="text-gray-400 text-sm">@{user.username}</p>
              <div className="flex items-center mt-2 text-orange-400">
                <Flame className="w-4 h-4 mr-1" />
                <span className="font-semibold">
                  {learningData.streak} day streak
                </span>
              </div>
            </div>

            {/* Download CV Button */}
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 mb-6 shadow-lg">
              <Download className="w-4 h-4" />
              <span className="font-semibold">Download CV</span>
            </button>

            {/* Bio */}
            <div className="mb-6">
              <p className="text-gray-300 text-2sm leading-relaxed">
                🚀 Full-stack developer & mentor passionate about teaching and
                building amazing web experiences. Always learning, always
                sharing knowledge!
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-[#0D1117] p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-blue-400">
                  {learningData.skillPoints}
                </div>
                <div className="text-xs text-gray-400">Skill Points</div>
              </div>
              <div className="bg-[#0D1117] p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-green-400">
                  #{learningData.communityRank.slice(1)}
                </div>
                <div className="text-xs text-gray-400">Community Rank</div>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex items-center text-gray-300">
                <Building className="w-4 h-4 mr-2" />
                <span>Senior Developer @TechCorp</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Jakarta, Indonesia</span>
              </div>
              <div className="flex items-center text-gray-300">
                <LinkIcon className="w-4 h-4 mr-2" />
                <a href="#" className="text-blue-400 hover:underline">
                  youralpha.com
                </a>
              </div>
              <div className="flex items-center text-gray-300">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Learning since June 2023</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              <a
                href="#"
                className="p-2 text-gray-400 hover:text-white transition-colors bg-[#0D1117] rounded-lg"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 text-gray-400 hover:text-white transition-colors bg-[#0D1117] rounded-lg"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 text-gray-400 hover:text-white transition-colors bg-[#0D1117] rounded-lg"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 text-gray-400 hover:text-white transition-colors bg-[#0D1117] rounded-lg"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Welcome Message & Stats */}
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-6 border border-blue-800/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                Learning Journey
              </h2>
              <div className="text-right">
                <div className="text-xl font-bold text-blue-400">
                  {learningData.totalLearningHours}h
                </div>
                <div className="text-sm text-gray-400">Total Learning Time</div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-black/30 rounded-lg">
                <BookOpen className="w-6 h-6 mx-auto mb-2 text-green-400" />
                <div className="text-xl font-bold">
                  {learningData.coursesCompleted}
                </div>
                <div className="text-xs text-gray-400">Courses Completed</div>
              </div>
              <div className="text-center p-3 bg-black/30 rounded-lg">
                <Code className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                <div className="text-xl font-bold">
                  {learningData.projectsBuilt}
                </div>
                <div className="text-xs text-gray-400">Projects Built</div>
              </div>
              <div className="text-center p-3 bg-black/30 rounded-lg">
                <Users className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                <div className="text-xl font-bold">
                  {learningData.helpedStudents}
                </div>
                <div className="text-xs text-gray-400">Students Helped</div>
              </div>
              <div className="text-center p-3 bg-black/30 rounded-lg">
                <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                <div className="text-xl font-bold">
                  {learningData.mentoringSessions}
                </div>
                <div className="text-xs text-gray-400">Mentoring Sessions</div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const IconComponent = activity.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-[#0D1117] rounded-lg hover:bg-[#21262D] transition-colors"
                  >
                    <div className={`p-2 rounded-full bg-gray-800 mr-4`}>
                      <IconComponent className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-gray-400">{activity.time}</p>
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
              <h2 className="text-xl font-semibold flex items-center">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {skillBadges.slice(0, 8).map((badge, index) => (
                <div
                  key={index}
                  className="bg-[#0D1117] p-3 rounded-lg text-center hover:bg-[#21262D] transition-colors cursor-pointer"
                >
                  <div
                    className={`w-8 h-8 mx-auto mb-2 rounded-full ${badge.color} flex items-center justify-center`}
                  >
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-xs font-semibold">{badge.name}</div>
                  <div className="text-xs text-gray-400">{badge.level}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Goals */}
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Current Learning Goals
            </h2>
            <div className="space-y-4">
              {learningGoals.map((goal, index) => (
                <div key={index} className="bg-[#0D1117] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{goal.title}</h3>
                    <span className="text-sm text-gray-400">{goal.target}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
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
              <h2 className="text-xl font-semibold flex items-center">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProjects.map((project, index) => (
                <div
                  key={index}
                  className="bg-[#0D1117] border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-all hover:scale-105 duration-200"
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
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                        >
                          {tech}
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

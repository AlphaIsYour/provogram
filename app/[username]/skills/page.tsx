/* eslint-disable @typescript-eslint/no-unused-vars */
// app/[username]/skills/page.tsx

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Code2,
  Database,
  Palette,
  Server,
  Smartphone,
  Globe,
  Brain,
  Trophy,
  TrendingUp,
  Star,
  Zap,
  Target,
  Award,
  BookOpen,
  Calendar,
  Users,
  GitBranch,
  Layers,
  Shield,
  Cloud,
  Cpu,
  Monitor,
  Terminal,
  Package,
  Wrench,
  LineChart,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default async function SkillsPage({
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

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Monitor,
      color: "from-blue-600 to-cyan-600",
      skills: [
        { name: "React", level: 95, years: 4, projects: 45, icon: "⚛️" },
        { name: "Next.js", level: 90, years: 3, projects: 28, icon: "▲" },
        { name: "TypeScript", level: 88, years: 3, projects: 35, icon: "📘" },
        { name: "JavaScript", level: 95, years: 5, projects: 60, icon: "🟨" },
        { name: "Tailwind CSS", level: 92, years: 3, projects: 40, icon: "🎨" },
        { name: "HTML5/CSS3", level: 98, years: 6, projects: 80, icon: "🌐" },
        { name: "Vue.js", level: 75, years: 2, projects: 12, icon: "💚" },
        { name: "Sass/SCSS", level: 85, years: 4, projects: 25, icon: "🎨" },
      ],
    },
    {
      title: "Backend Development",
      icon: Server,
      color: "from-green-600 to-emerald-600",
      skills: [
        { name: "Node.js", level: 90, years: 4, projects: 35, icon: "🟢" },
        { name: "Express.js", level: 88, years: 4, projects: 30, icon: "🚀" },
        { name: "Python", level: 82, years: 3, projects: 20, icon: "🐍" },
        { name: "Django", level: 78, years: 2, projects: 15, icon: "🎸" },
        { name: "REST APIs", level: 92, years: 4, projects: 40, icon: "🔗" },
        { name: "GraphQL", level: 75, years: 2, projects: 10, icon: "📊" },
        { name: "Prisma ORM", level: 85, years: 2, projects: 18, icon: "🔺" },
        { name: "Socket.io", level: 80, years: 2, projects: 8, icon: "⚡" },
      ],
    },
    {
      title: "Database & Storage",
      icon: Database,
      color: "from-purple-600 to-pink-600",
      skills: [
        { name: "PostgreSQL", level: 88, years: 3, projects: 25, icon: "🐘" },
        { name: "MongoDB", level: 85, years: 3, projects: 22, icon: "🍃" },
        { name: "Redis", level: 75, years: 2, projects: 12, icon: "🔴" },
        { name: "MySQL", level: 82, years: 4, projects: 20, icon: "🐬" },
        { name: "Firebase", level: 80, years: 2, projects: 15, icon: "🔥" },
        { name: "Supabase", level: 78, years: 1, projects: 8, icon: "⚡" },
      ],
    },
    {
      title: "DevOps & Tools",
      icon: Cloud,
      color: "from-orange-600 to-red-600",
      skills: [
        { name: "Docker", level: 82, years: 2, projects: 18, icon: "🐳" },
        { name: "AWS", level: 78, years: 2, projects: 15, icon: "☁️" },
        { name: "Vercel", level: 90, years: 3, projects: 30, icon: "▲" },
        { name: "Git/GitHub", level: 95, years: 5, projects: 100, icon: "🐙" },
        { name: "CI/CD", level: 75, years: 2, projects: 12, icon: "🔄" },
        { name: "Nginx", level: 70, years: 1, projects: 8, icon: "🟢" },
      ],
    },
    {
      title: "Design & UI/UX",
      icon: Palette,
      color: "from-pink-600 to-rose-600",
      skills: [
        { name: "Figma", level: 85, years: 3, projects: 25, icon: "🎨" },
        { name: "Adobe XD", level: 75, years: 2, projects: 15, icon: "🟦" },
        { name: "Framer", level: 70, years: 1, projects: 8, icon: "🖼️" },
        { name: "UI Design", level: 82, years: 3, projects: 30, icon: "✨" },
        { name: "Prototyping", level: 80, years: 2, projects: 20, icon: "🔧" },
      ],
    },
    {
      title: "Mobile Development",
      icon: Smartphone,
      color: "from-teal-600 to-cyan-600",
      skills: [
        { name: "React Native", level: 80, years: 2, projects: 12, icon: "📱" },
        { name: "Expo", level: 78, years: 2, projects: 10, icon: "🚀" },
        { name: "Flutter", level: 65, years: 1, projects: 5, icon: "🦋" },
        {
          name: "iOS Development",
          level: 60,
          years: 1,
          projects: 3,
          icon: "🍎",
        },
      ],
    },
  ];

  const achievements = [
    {
      title: "Full Stack Master",
      description: "Completed 50+ projects across frontend and backend",
      icon: Trophy,
      color: "text-yellow-400",
      date: "Dec 2024",
    },
    {
      title: "React Expert",
      description: "Built 45+ React applications with advanced patterns",
      icon: Award,
      color: "text-blue-400",
      date: "Nov 2024",
    },
    {
      title: "Mentor of the Month",
      description: "Helped 50+ developers level up their skills",
      icon: Users,
      color: "text-purple-400",
      date: "Jan 2025",
    },
    {
      title: "Open Source Contributor",
      description: "Contributed to 20+ open source projects",
      icon: GitBranch,
      color: "text-green-400",
      date: "Oct 2024",
    },
  ];

  const skillProgress = [
    {
      skill: "Overall Frontend",
      current: 92,
      target: 95,
      category: "Frontend",
    },
    {
      skill: "Backend Architecture",
      current: 85,
      target: 90,
      category: "Backend",
    },
    { skill: "Database Design", current: 83, target: 88, category: "Database" },
    { skill: "DevOps Pipeline", current: 78, target: 85, category: "DevOps" },
    { skill: "UI/UX Design", current: 80, target: 85, category: "Design" },
    {
      skill: "Mobile Development",
      current: 72,
      target: 80,
      category: "Mobile",
    },
  ];

  const certifications = [
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2024",
      status: "Active",
      icon: "☁️",
    },
    {
      name: "React Advanced Patterns",
      issuer: "Meta",
      date: "2024",
      status: "Active",
      icon: "⚛️",
    },
    {
      name: "TypeScript Professional",
      issuer: "Microsoft",
      date: "2023",
      status: "Active",
      icon: "📘",
    },
    {
      name: "Node.js Application Developer",
      issuer: "Node.js Foundation",
      date: "2023",
      status: "Active",
      icon: "🟢",
    },
  ];

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
              <Brain className="w-6 h-6 mr-2 text-blue-400" />
              Skills & Expertise
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Technical skills, achievements, and learning progress
            </p>
          </div>
        </div>
        <div className="bg-[#161B22] p-2 rounded-lg border border-gray-800">
          <div className="text-center">
            <div className="text-xl font-bold text-green-400">95%</div>
            <div className="text-sm text-gray-400">Skill Level</div>
          </div>
        </div>
      </div>

      {/* Skill Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 p-6 rounded-lg border border-blue-800/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-sm">Total Skills</p>
              <p className="text-3xl font-bold">32</p>
            </div>
            <Code2 className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-900/50 to-green-800/50 p-6 rounded-lg border border-green-800/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm">Years Experience</p>
              <p className="text-3xl font-bold">5+</p>
            </div>
            <Calendar className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 p-6 rounded-lg border border-purple-800/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-300 text-sm">Projects Built</p>
              <p className="text-3xl font-bold">200+</p>
            </div>
            <Target className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 p-6 rounded-lg border border-yellow-800/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-300 text-sm">Certifications</p>
              <p className="text-3xl font-bold">4</p>
            </div>
            <Award className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Skill Categories */}
      <div className="space-y-8">
        {skillCategories.map((category, categoryIndex) => {
          const IconComponent = category.icon;
          return (
            <div
              key={categoryIndex}
              className="bg-[#161B22] rounded-lg p-6 border border-gray-800"
            >
              <div className="flex items-center mb-6">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-r ${category.color} mr-4`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{category.title}</h2>
                  <p className="text-gray-400 text-sm">
                    {category.skills.length} skills in this category
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="bg-[#0D1117] p-4 rounded-lg hover:bg-[#21262D] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{skill.icon}</span>
                        <h3 className="font-semibold">{skill.name}</h3>
                      </div>
                      <span className="text-sm font-bold text-blue-400">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                      <div
                        className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{skill.years} years</span>
                      <span>{skill.projects} projects</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Skill Progress Goals */}
      <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Learning Progress & Goals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillProgress.map((progress, index) => (
            <div key={index} className="bg-[#0D1117] p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{progress.skill}</h3>
                <div className="text-sm text-gray-400">
                  {progress.current}% → {progress.target}%
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full relative"
                  style={{ width: `${progress.current}%` }}
                >
                  <div
                    className="absolute top-0 right-0 w-1 h-2 bg-yellow-400 rounded-full"
                    style={{ left: `${progress.target}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{progress.category}</span>
                <span>{progress.target - progress.current}% to goal</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements & Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Achievements */}
        <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2" />
            Recent Achievements
          </h2>
          <div className="space-y-4">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div
                  key={index}
                  className="bg-[#0D1117] p-4 rounded-lg hover:bg-[#21262D] transition-colors"
                >
                  <div className="flex items-start">
                    <div className="p-2 bg-gray-800 rounded-lg mr-4">
                      <IconComponent
                        className={`w-5 h-5 ${achievement.color}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">
                        {achievement.description}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{achievement.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Certifications
          </h2>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-[#0D1117] p-4 rounded-lg hover:bg-[#21262D] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg mr-3">{cert.icon}</span>
                    <div>
                      <h3 className="font-semibold">{cert.name}</h3>
                      <p className="text-gray-400 text-sm">{cert.issuer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-400">
                      {cert.status}
                    </div>
                    <div className="text-xs text-gray-400">{cert.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

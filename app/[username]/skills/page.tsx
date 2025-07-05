/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// app/[username]/skills/page.tsx

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Code2,
  Database,
  Code,
  Brain,
  Globe,
  Palette,
  Server,
  Smartphone,
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
import { ProfessionalSkill, SkillCategory, User } from "@prisma/client"; // Import tipe

// ==================================
// HELPER FUNCTIONS (Logika Tampilan)
// ==================================
const iconMap: { [key: string]: React.ComponentType<any> } = {
  Monitor,
  Server,
  Database,
  Cloud,
  Code,
  Brain,
  Globe,
  Palette,
  Smartphone,
  Trophy,
  Award,
  Users,
  GitBranch,
};

const getIconComponent = (
  iconName: string | null | undefined
): React.ComponentType<any> => {
  if (!iconName) return Brain;
  return iconMap[iconName as string] || Brain;
};

// ==================================
// KOMPONEN UTAMA
// ==================================
export default async function SkillsPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  // 1. Fetch User dan relasi penting lainnya
  const user = await prisma.user.findUnique({
    where: { username: username },
    include: {
      // Ambil relasi ini untuk bagian bawah halaman
      learningGoals: { orderBy: { progress: "desc" } },
      userAchievements: {
        where: { earnedAt: { not: null } },
        orderBy: { earnedAt: "desc" },
        take: 4,
        include: { achievement: true },
      },
      certificates: { orderBy: { completionDate: "desc" }, take: 4 },
    },
  });

  if (!user) {
    notFound();
  }

  // 2. Query terpisah untuk Skill Categories, yang di-include ProfessionalSkill milik user ini
  const skillCategories = await prisma.skillCategory.findMany({
    orderBy: { order: "asc" },
    include: {
      skills: {
        where: { userId: user.id, type: "TECHNICAL" },
        orderBy: { proficiency: "desc" },
      },
    },
  });

  // 3. Kalkulasi Statistik Skill secara Dinamis
  const allSkills = skillCategories.flatMap((cat) => cat.skills);
  const totalSkills = allSkills.length;
  const totalProjects = allSkills.reduce(
    (sum, skill) => sum + (skill.projectCount || 0),
    0
  );
  const totalYearsExp =
    totalSkills > 0
      ? Math.max(...allSkills.map((skill) => skill.yearsOfExperience || 0))
      : 0;
  const totalCerts = await prisma.certificate.count({
    where: { userId: user.id },
  });

  const totalProficiency = allSkills.reduce(
    (sum, skill) => sum + skill.proficiency,
    0
  );
  const averageProficiency =
    totalSkills > 0 ? Math.round(totalProficiency / totalSkills) : 0;

  const skillStats = {
    totalSkills,
    yearsExperience: `${totalYearsExp}+`,
    projectsBuilt: `${totalProjects}+`,
    certifications: totalCerts,
    averageLevel: `${averageProficiency}%`,
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 sm:space-y-4">
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
            <h1 className="text-[18px] sm:text[18px] font-bold flex items-center">
              <Brain className="w-6 h-6 mr-2 text-blue-400" />
              Skills & Expertise
            </h1>
            <p className="text-gray-400 text-[10px] sm:text-[14px] mt-1">
              Technical skills, achievements, and learning progress
            </p>
          </div>
        </div>
        <div className="bg-[#161B22] w-[13vh] p-2 rounded-lg border border-gray-800">
          <div className="text-center">
            <div className="text-[18px] sm:text-[18px] font-bold text-green-400">
              {skillStats.averageLevel}
            </div>
            <div className="text-[10px] sm:text-[14px] text-gray-400">
              Skill Level
            </div>
          </div>
        </div>
      </div>

      {/* Skill Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 p-6 rounded-lg border border-blue-800/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-sm">Total Skills</p>
              <p className="text-2xl font-bold">{skillStats.totalSkills}</p>
            </div>
            <Code2 className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-900/50 to-green-800/50 p-6 rounded-lg border border-green-800/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm">Years Experience</p>
              <p className="text-2xl font-bold">{skillStats.yearsExperience}</p>
            </div>
            <Calendar className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 p-6 rounded-lg border border-purple-800/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-300 text-sm">Projects Built</p>
              <p className="text-2xl font-bold">{skillStats.projectsBuilt}</p>
            </div>
            <Target className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 p-6 rounded-lg border border-yellow-800/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-300 text-sm">Certifications</p>
              <p className="text-2xl font-bold">{skillStats.certifications}</p>
            </div>
            <Award className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Skill Categories */}
      <div className="space-y-8">
        {skillCategories.map((category) => {
          if (category.skills.length === 0) return null; // Jangan render kategori jika tidak ada skill user di dalamnya
          const IconComponent = getIconComponent(category.icon);
          return (
            <div
              key={category.id}
              className="bg-[#161B22] rounded-lg p-6 border border-gray-800"
            >
              <div className="flex items-center mb-6">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-r ${
                    category.color || "from-gray-600 to-gray-700"
                  } mr-4`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{category.name}</h2>
                  <p className="text-gray-400 text-sm">
                    {category.skills.length} skills in this category
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.skills.map(
                  (
                    skill: ProfessionalSkill // Tambahkan tipe di sini
                  ) => (
                    <div
                      key={skill.id}
                      className="bg-[#0D1117] p-4 rounded-lg hover:bg-[#21262D] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{skill.icon}</span>
                          <h3 className="font-semibold">{skill.name}</h3>
                        </div>
                        <span className="text-sm font-bold text-blue-400">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                        <div
                          className={`bg-gradient-to-r ${
                            category.color || "from-gray-600 to-gray-700"
                          } h-2 rounded-full`}
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{skill.yearsOfExperience || "-"} years</span>
                        <span>{skill.projectCount || "-"} projects</span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Skill Progress Goals */}
      <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
        <h2 className="text-[18px] sm:text-[18px] font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" /> Learning Progress & Goals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {user.learningGoals.map((goal) => (
            <div key={goal.id} className="bg-[#0D1117] p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{goal.title}</h3>
                <div className="text-sm text-gray-400">
                  {goal.progress}% → {goal.targetProgress || 100}%
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2 relative">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  style={{ width: `${goal.progress}%` }}
                ></div>
                {goal.targetProgress && (
                  <div
                    className="absolute top-0 h-2 w-1 bg-yellow-400 rounded-r-full"
                    style={{ left: `${goal.targetProgress}%` }}
                    title={`Target: ${goal.targetProgress}%`}
                  ></div>
                )}
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{goal.category}</span>
                {goal.targetProgress && (
                  <span>{goal.targetProgress - goal.progress}% to goal</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements & Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
          <h2 className="text-[18px] sm:text-[18px] font-semibold mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2" /> Recent Achievements
          </h2>
          <div className="space-y-4">
            {user.userAchievements.map(({ achievement }) => {
              const IconComponent = getIconComponent(achievement.icon);
              return (
                <div
                  key={achievement.id}
                  className="bg-[#0D1117] p-4 rounded-lg"
                >
                  <div className="flex items-start">
                    <div className="p-2 bg-gray-800 rounded-lg mr-4">
                      {achievement.icon &&
                      typeof achievement.icon === "string" &&
                      achievement.icon.length <= 2 ? (
                        <span className="text-lg">{achievement.icon}</span>
                      ) : (
                        <IconComponent className="w-5 h-5 text-yellow-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{achievement.name}</h3>
                      <p className="text-gray-400 text-sm mb-2">
                        {achievement.description}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{achievement.requirements}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
          <h2 className="text-[18px] sm:text-[18px] font-semibold mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2" /> Certifications
          </h2>
          <div className="space-y-4">
            {user.certificates.map((cert) => {
              const IconComponent = getIconComponent(cert.icon);
              return (
                <div key={cert.id} className="bg-[#0D1117] p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 bg-gray-800 rounded-lg mr-3">
                        <IconComponent className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{cert.title}</h3>
                        <p className="text-gray-400 text-sm">{cert.issuer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-400">
                        Active
                      </div>
                      <div className="text-xs text-gray-400">
                        {cert.completionDate.getFullYear()}
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
  );
}

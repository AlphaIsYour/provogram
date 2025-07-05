/* eslint-disable @typescript-eslint/no-unused-vars */
// app/classroom/components/DivisionSelection.tsx

import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  ChevronRight,
  Code,
  Smartphone,
  Cpu,
  Shield,
  Users,
  BookOpen,
  Trophy,
  Lock,
  Wifi,
  Globe,
  Zap,
} from "lucide-react";
import Image from "next/image";

// Helper untuk ikon
const getDivisionIcon = (
  iconName: string | null
): React.ComponentType<{ className?: string }> => {
  const map: { [key: string]: React.ComponentType<{ className?: string }> } = {
    Code,
    Smartphone,
    Cpu,
    Shield,
  };
  if (!iconName || !map[iconName]) return Code;
  return map[iconName];
};

// Data keterangan untuk setiap divisi
const getDivisionInfo = (divisionName: string) => {
  const divisionInfoMap: {
    [key: string]: {
      subtitle: string;
      description: string;
      skills: string[];
      icon: React.ComponentType<{ className?: string }>;
      color: string;
    };
  } = {
    Cybersecurity: {
      subtitle: "Protect Digital Assets & Systems",
      description:
        "Master the art of defending against cyber threats, vulnerability assessment, and ethical hacking. Learn to secure networks, applications, and data from malicious attacks.",
      skills: [
        "Penetration Testing",
        "Network Security",
        "Incident Response",
        "Risk Assessment",
      ],
      icon: Shield,
      color: "red",
    },
    IoT: {
      subtitle: "Internet of Things Innovation",
      description:
        "Explore the connected world of smart devices, sensors, and embedded systems. Build innovative solutions that bridge the physical and digital realms.",
      skills: [
        "Embedded Systems",
        "Sensor Networks",
        "Cloud Integration",
        "Device Security",
      ],
      icon: Wifi,
      color: "green",
    },
    Mobile: {
      subtitle: "Mobile Application Development",
      description:
        "Create powerful mobile applications for iOS and Android platforms. Design user-friendly interfaces and develop robust mobile solutions for modern users.",
      skills: [
        "iOS Development",
        "Android Development",
        "Cross-Platform",
        "UI/UX Design",
      ],
      icon: Smartphone,
      color: "blue",
    },
    Web: {
      subtitle: "Full-Stack Web Development",
      description:
        "Build dynamic web applications using modern frameworks and technologies. Master both frontend and backend development for comprehensive web solutions.",
      skills: [
        "Frontend Frameworks",
        "Backend APIs",
        "Database Design",
        "Cloud Deployment",
      ],
      icon: Globe,
      color: "purple",
    },
  };

  return (
    divisionInfoMap[divisionName] || {
      subtitle: "Specialized Technology Track",
      description:
        "Develop expertise in cutting-edge technology and innovative solutions.",
      skills: [
        "Technical Skills",
        "Problem Solving",
        "Innovation",
        "Collaboration",
      ],
      icon: Code,
      color: "blue",
    }
  );
};

export default async function DivisionSelection() {
  type Division = {
    id: string;
    name: string;
    description: string;
    icon: string | null;
  };

  // 1. Ambil semua divisi dari database
  const divisions: Division[] = await prisma.division.findMany({
    orderBy: { name: "asc" },
  });

  // 2. Hitung total user di database (Active Members)
  const totalUsers = await prisma.user.count();

  // 3. Query statistik enrollment per divisi
  const enrollmentStats = await prisma.enrollment.groupBy({
    by: ["divisionId", "status"],
    _count: {
      _all: true,
    },
  });

  // 4. Proses data statistik menjadi format yang mudah digunakan
  const divisionStats = divisions.map((division) => {
    // Hitung user yang PASSED untuk divisi ini
    const passedCount =
      enrollmentStats.find(
        (s) => s.divisionId === division.id && s.status === "PASSED"
      )?._count._all || 0;

    // Hitung total enrollment untuk divisi ini (semua status)
    const totalEnrollments = enrollmentStats
      .filter((s) => s.divisionId === division.id)
      .reduce((sum, s) => sum + s._count._all, 0);

    // Hitung pass rate
    const passRate =
      totalEnrollments > 0
        ? Math.round((passedCount / totalEnrollments) * 100)
        : 0;

    return {
      ...division,
      memberCount: passedCount, // Member yang sudah PASSED
      totalEnrollments: totalEnrollments, // Total yang mendaftar
      passRate: passRate, // Persentase kelulusan
    };
  });

  // 5. Hitung statistik total untuk header
  const totalActiveMembers = totalUsers; // Total user di database
  const totalTestsCompleted = enrollmentStats.reduce(
    (acc, stat) => acc + stat._count._all,
    0
  );

  return (
    <div className="max-w-7xl -mt-[15vh] mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-26 h-26 mb-6">
          <Image
            src="/logo.svg"
            alt="Provoks Logo"
            width={128}
            height={128}
            className="w-26 h-26"
          />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Join the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Provoks
          </span>{" "}
          Community
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Choose your specialization and start your learning journey. Each
          division offers unique challenges designed to test and enhance your
          skills.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#0D1117] border border-gray-800 rounded-lg p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-900/30 rounded-lg mb-4">
            <Users className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {totalActiveMembers}
          </div>
          <div className="text-sm text-gray-400">Active Members</div>
        </div>

        <div className="bg-[#0D1117] border border-gray-800 rounded-lg p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-900/30 rounded-lg mb-4">
            <Trophy className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {divisions.length}
          </div>
          <div className="text-sm text-gray-400">Divisions Available</div>
        </div>

        <div className="bg-[#0D1117] border border-gray-800 rounded-lg p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-900/30 rounded-lg mb-4">
            <BookOpen className="w-6 h-6 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {totalTestsCompleted}
          </div>
          <div className="text-sm text-gray-400">Tests Completed</div>
        </div>
      </div>

      {/* Division Cards with Info */}
      <div className="space-y-8">
        {divisionStats.map((division, index) => {
          const Icon = getDivisionIcon(division.icon);
          const divisionInfo = getDivisionInfo(division.name);
          const InfoIcon = divisionInfo.icon;

          return (
            <div
              key={division.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
            >
              {/* Division Info Section */}
              <div
                className={`${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}
              >
                <div className="bg-[#0D1117] border border-gray-800 rounded-lg p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div
                      className={`p-3 bg-${divisionInfo.color}-900/30 rounded-lg`}
                    >
                      <InfoIcon
                        className={`w-8 h-8 text-${divisionInfo.color}-400`}
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {division.name}
                      </h3>
                      <p
                        className={`text-${divisionInfo.color}-400 font-medium`}
                      >
                        {divisionInfo.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-base leading-relaxed mb-6">
                    {divisionInfo.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">
                      Key Skills You&apos;ll Learn:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {divisionInfo.skills.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className="flex items-center space-x-2"
                        >
                          <div
                            className={`w-2 h-2 bg-${divisionInfo.color}-400 rounded-full`}
                          ></div>
                          <span className="text-gray-400 text-sm">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{division.memberCount} active members</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy className="w-4 h-4" />
                      <span>{division.passRate}% pass rate</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Division Card */}
              <div
                className={`${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}
              >
                <div className="group bg-[#0D1117] border border-gray-800 rounded-lg overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                  {/* Card Header */}
                  <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-900/30 rounded-lg group-hover:bg-blue-900/50 transition-colors">
                          <Icon className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {division.name}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <Users className="w-3 h-3" />
                            <span>{division.memberCount} members</span>
                          </div>
                        </div>
                      </div>

                      {/* Pass Rate Badge */}
                      <div className="text-right">
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            division.passRate >= 80
                              ? "bg-green-900/30 text-green-400"
                              : division.passRate >= 60
                              ? "bg-yellow-900/30 text-yellow-400"
                              : "bg-red-900/30 text-red-400"
                          }`}
                        >
                          {division.passRate}% pass rate
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed">
                      {division.description}
                    </p>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Beginner Friendly</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span>Active</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>{division.totalEnrollments} applied</span>
                        </div>
                      </div>
                    </div>

                    {/* Enrollment Button */}
                    <Link
                      href={`/classroom/enroll/${division.name
                        .toLowerCase()
                        .replace(/ /g, "-")}`}
                      className="flex items-center justify-center w-full px-4 py-3 bg-[#161B22] border border-gray-700 text-white font-medium rounded-lg hover:bg-[#21262D] hover:border-blue-500/50 transition-all duration-200 group-hover:border-blue-500/70"
                    >
                      <span>Start Enrollment Test</span>
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Hover Effect Line */}
                  <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

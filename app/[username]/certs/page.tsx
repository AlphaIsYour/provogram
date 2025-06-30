/* eslint-disable @typescript-eslint/no-unused-vars */
// app/[username]/certs/page.tsx

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Download,
  Calendar,
  Building,
  ExternalLink,
  Star,
  Clock,
  CheckCircle2,
  Filter,
  Search,
  Share2,
  Eye,
  BookOpen,
  GraduationCap,
  Shield,
  Zap,
  Trophy,
  Medal,
  Target,
  Users,
  Globe,
  Briefcase,
  Code,
  Database,
  Palette,
  Server,
  Smartphone,
  Brain,
  TrendingUp,
  BadgeCheck,
} from "lucide-react";

export default async function CertificatesPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    notFound();
  }

  // Mock data untuk certificates
  const certStats = {
    totalCertificates: 24,
    verifiedCertificates: 22,
    activeCertificates: 20,
    expiringSoon: 2,
    totalSkillHours: 567,
    avgRating: 4.8,
  };

  const categories = [
    { name: "All", count: 24, active: true },
    { name: "Web Development", count: 8, active: false },
    { name: "Data Science", count: 5, active: false },
    { name: "Mobile Development", count: 4, active: false },
    { name: "Cloud Computing", count: 3, active: false },
    { name: "Design", count: 2, active: false },
    { name: "DevOps", count: 2, active: false },
  ];

  const certificates = [
    {
      id: 1,
      title: "Advanced React Development",
      issuer: "Meta",
      issuerLogo: "/api/placeholder/50/50",
      category: "Web Development",
      level: "Advanced",
      duration: "6 months",
      completionDate: "2024-12-01",
      expiryDate: "2026-12-01",
      credentialId: "META-REACT-2024-001",
      verificationUrl: "https://verify.meta.com/certificates/001",
      skills: ["React", "Redux", "TypeScript", "Testing"],
      rating: 4.9,
      description:
        "Comprehensive course covering advanced React patterns, state management, and performance optimization.",
      hours: 120,
      projects: 8,
      status: "Active",
      color: "bg-blue-500",
      icon: Code,
    },
    {
      id: 2,
      title: "Full Stack Web Development",
      issuer: "Google",
      issuerLogo: "/api/placeholder/50/50",
      category: "Web Development",
      level: "Professional",
      duration: "8 months",
      completionDate: "2024-11-15",
      expiryDate: "2026-11-15",
      credentialId: "GOOGLE-FULLSTACK-2024-002",
      verificationUrl: "https://verify.google.com/certificates/002",
      skills: ["JavaScript", "Node.js", "MongoDB", "Express"],
      rating: 4.8,
      description:
        "Complete full-stack development program with hands-on projects and industry mentorship.",
      hours: 200,
      projects: 12,
      status: "Active",
      color: "bg-green-500",
      icon: Server,
    },
    {
      id: 3,
      title: "Data Science Fundamentals",
      issuer: "IBM",
      issuerLogo: "/api/placeholder/50/50",
      category: "Data Science",
      level: "Intermediate",
      duration: "4 months",
      completionDate: "2024-10-20",
      expiryDate: "2026-10-20",
      credentialId: "IBM-DS-2024-003",
      verificationUrl: "https://verify.ibm.com/certificates/003",
      skills: ["Python", "Pandas", "Machine Learning", "SQL"],
      rating: 4.7,
      description:
        "Foundational data science course covering statistics, machine learning, and data visualization.",
      hours: 80,
      projects: 6,
      status: "Active",
      color: "bg-purple-500",
      icon: Database,
    },
    {
      id: 4,
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      issuerLogo: "/api/placeholder/50/50",
      category: "Cloud Computing",
      level: "Foundational",
      duration: "2 months",
      completionDate: "2024-09-10",
      expiryDate: "2027-09-10",
      credentialId: "AWS-CP-2024-004",
      verificationUrl: "https://verify.aws.com/certificates/004",
      skills: ["AWS", "Cloud Computing", "EC2", "S3"],
      rating: 4.6,
      description:
        "Foundational AWS certification covering core cloud services and best practices.",
      hours: 40,
      projects: 3,
      status: "Active",
      color: "bg-orange-500",
      icon: Globe,
    },
    {
      id: 5,
      title: "Mobile App Development with React Native",
      issuer: "Coursera",
      issuerLogo: "/api/placeholder/50/50",
      category: "Mobile Development",
      level: "Intermediate",
      duration: "3 months",
      completionDate: "2024-08-25",
      expiryDate: "2026-08-25",
      credentialId: "COURSERA-RN-2024-005",
      verificationUrl: "https://verify.coursera.com/certificates/005",
      skills: ["React Native", "JavaScript", "Mobile UI", "API Integration"],
      rating: 4.5,
      description:
        "Comprehensive mobile development course with cross-platform application building.",
      hours: 60,
      projects: 4,
      status: "Active",
      color: "bg-cyan-500",
      icon: Smartphone,
    },
    {
      id: 6,
      title: "UI/UX Design Fundamentals",
      issuer: "Adobe",
      issuerLogo: "/api/placeholder/50/50",
      category: "Design",
      level: "Beginner",
      duration: "2 months",
      completionDate: "2024-07-15",
      expiryDate: "2026-07-15",
      credentialId: "ADOBE-UIUX-2024-006",
      verificationUrl: "https://verify.adobe.com/certificates/006",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      rating: 4.4,
      description:
        "Design fundamentals course covering user experience and interface design principles.",
      hours: 35,
      projects: 5,
      status: "Active",
      color: "bg-pink-500",
      icon: Palette,
    },
    {
      id: 7,
      title: "DevOps Engineering",
      issuer: "Microsoft",
      issuerLogo: "/api/placeholder/50/50",
      category: "DevOps",
      level: "Advanced",
      duration: "5 months",
      completionDate: "2024-06-30",
      expiryDate: "2025-06-30",
      credentialId: "MS-DEVOPS-2024-007",
      verificationUrl: "https://verify.microsoft.com/certificates/007",
      skills: ["Azure", "Docker", "Kubernetes", "CI/CD"],
      rating: 4.7,
      description:
        "Advanced DevOps certification with hands-on Azure and containerization experience.",
      hours: 90,
      projects: 7,
      status: "Expiring Soon",
      color: "bg-indigo-500",
      icon: Shield,
    },
    {
      id: 8,
      title: "Python for Data Analysis",
      issuer: "edX",
      issuerLogo: "/api/placeholder/50/50",
      category: "Data Science",
      level: "Intermediate",
      duration: "3 months",
      completionDate: "2024-05-20",
      expiryDate: "2026-05-20",
      credentialId: "EDX-PYTHON-2024-008",
      verificationUrl: "https://verify.edx.com/certificates/008",
      skills: ["Python", "NumPy", "Matplotlib", "Jupyter"],
      rating: 4.6,
      description:
        "Specialized Python course focusing on data analysis and visualization techniques.",
      hours: 45,
      projects: 6,
      status: "Active",
      color: "bg-yellow-500",
      icon: Brain,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-400 bg-green-900/20 border-green-500";
      case "Expiring Soon":
        return "text-yellow-400 bg-yellow-900/20 border-yellow-500";
      case "Expired":
        return "text-red-400 bg-red-900/20 border-red-500";
      default:
        return "text-gray-400 bg-gray-900/20 border-gray-500";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "text-green-400 bg-green-900/20";
      case "Intermediate":
        return "text-yellow-400 bg-yellow-900/20";
      case "Advanced":
        return "text-red-400 bg-red-900/20";
      case "Professional":
        return "text-purple-400 bg-purple-900/20";
      default:
        return "text-gray-400 bg-gray-900/20";
    }
  };

  const recentCertificates = certificates
    .sort(
      (a, b) =>
        new Date(b.completionDate).getTime() -
        new Date(a.completionDate).getTime()
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
              <GraduationCap className="w-6 h-6 mr-2 text-blue-400" />
              Certificates & Credentials
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Professional certifications and learning achievements
            </p>
          </div>
        </div>
        <div className="bg-[#161B22] p-2 rounded-lg border border-gray-800">
          <div className="text-center">
            <div className="text-xl font-bold text-green-400">24</div>
            <div className="text-sm text-gray-400">Total Certificates</div>
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

            {/* Certificate Stats */}
            <div className="space-y-4">
              <div className="bg-[#0D1117] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Verified Certs</span>
                  <BadgeCheck className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-green-400">
                  {certStats.verifiedCertificates}
                </div>
              </div>

              <div className="bg-[#0D1117] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Active Certs</span>
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-blue-400">
                  {certStats.activeCertificates}
                </div>
              </div>

              <div className="bg-[#0D1117] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Expiring Soon</span>
                  <Clock className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-yellow-400">
                  {certStats.expiringSoon}
                </div>
              </div>

              <div className="bg-[#0D1117] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Skill Hours</span>
                  <BookOpen className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-purple-400">
                  {certStats.totalSkillHours}h
                </div>
              </div>
            </div>

            {/* Recent Certificates */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                Recent
              </h3>
              <div className="space-y-3">
                {recentCertificates.map((cert) => {
                  const IconComponent = cert.icon;
                  return (
                    <div key={cert.id} className="bg-[#0D1117] p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className={`p-2 rounded-full ${cert.color} mr-3`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold line-clamp-1">
                            {cert.title}
                          </div>
                          <div className="text-xs text-gray-400">
                            {cert.issuer}
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
          {/* Search and Filter */}
          <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search certificates..."
                  className="w-full bg-[#0D1117] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button className="flex items-center px-4 py-2 bg-[#0D1117] border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-600 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>

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

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 gap-6">
            {certificates.map((cert) => {
              const IconComponent = cert.icon;

              return (
                <div
                  key={cert.id}
                  className="bg-[#161B22] rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-all duration-200"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Certificate Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div
                            className={`p-3 rounded-full ${cert.color} mr-4`}
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">
                              {cert.title}
                            </h3>
                            <div className="flex items-center text-gray-400 mb-2">
                              <Building className="w-4 h-4 mr-1" />
                              <span>{cert.issuer}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <div
                                className={`px-2 py-1 rounded-full border text-xs ${getStatusColor(
                                  cert.status
                                )}`}
                              >
                                {cert.status}
                              </div>
                              <div
                                className={`px-2 py-1 rounded-full text-xs ${getLevelColor(
                                  cert.level
                                )}`}
                              >
                                {cert.level}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center text-yellow-400">
                            <Star className="w-4 h-4 mr-1" />
                            <span className="text-sm">{cert.rating}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-4">{cert.description}</p>

                      {/* Skills */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">
                          Skills Covered
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {cert.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-[#0D1117] text-gray-300 rounded-full text-sm border border-gray-700"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-2 bg-[#0D1117] rounded-lg">
                          <Clock className="w-4 h-4 mx-auto mb-1 text-blue-400" />
                          <div className="text-sm font-semibold">
                            {cert.hours}h
                          </div>
                          <div className="text-xs text-gray-400">Duration</div>
                        </div>
                        <div className="text-center p-2 bg-[#0D1117] rounded-lg">
                          <Briefcase className="w-4 h-4 mx-auto mb-1 text-green-400" />
                          <div className="text-sm font-semibold">
                            {cert.projects}
                          </div>
                          <div className="text-xs text-gray-400">Projects</div>
                        </div>
                        <div className="text-center p-2 bg-[#0D1117] rounded-lg">
                          <Calendar className="w-4 h-4 mx-auto mb-1 text-purple-400" />
                          <div className="text-sm font-semibold">
                            {new Date(cert.completionDate).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-400">Completed</div>
                        </div>
                        <div className="text-center p-2 bg-[#0D1117] rounded-lg">
                          <Shield className="w-4 h-4 mx-auto mb-1 text-yellow-400" />
                          <div className="text-sm font-semibold">
                            {new Date(cert.expiryDate).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-400">Expires</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <Eye className="w-4 h-4 mr-2" />
                          View Certificate
                        </button>
                        <button className="flex items-center px-4 py-2 bg-[#0D1117] border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </button>
                        <button className="flex items-center px-4 py-2 bg-[#0D1117] border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Verify
                        </button>
                        <button className="flex items-center px-4 py-2 bg-[#0D1117] border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </button>
                      </div>
                    </div>

                    {/* Certificate Preview */}
                    <div className="lg:w-80">
                      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700 text-center">
                        <div className="mb-4">
                          <div
                            className={`p-4 rounded-full ${cert.color} mx-auto w-fit mb-3`}
                          >
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                          <h4 className="font-bold text-white mb-1">
                            {cert.title}
                          </h4>
                          <p className="text-gray-400 text-sm">{cert.issuer}</p>
                        </div>
                        <div className="border-t border-gray-700 pt-4">
                          <p className="text-xs text-gray-400 mb-2">
                            Credential ID
                          </p>
                          <p className="text-xs font-mono text-gray-300 break-all">
                            {cert.credentialId}
                          </p>
                        </div>
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

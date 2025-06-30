/* eslint-disable @typescript-eslint/no-unused-vars */
// app/[username]/projects/page.tsx

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Code,
  Star,
  GitFork,
  ExternalLink,
  Github,
  Calendar,
  Users,
  TrendingUp,
  Filter,
  Search,
  Eye,
  Download,
  Share2,
  BookOpen,
  Smartphone,
  Globe,
  Database,
  Server,
  Palette,
  Zap,
  Award,
  Clock,
  Heart,
  MessageCircle,
  Play,
  CheckCircle2,
  AlertCircle,
  Loader,
} from "lucide-react";

export default async function ProjectsPage({
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

  const projects = [
    {
      id: 1,
      title: "Smart Learning Platform",
      description:
        "AI-powered learning platform with personalized curriculum, progress tracking, and interactive coding challenges. Built with modern technologies for scalable education.",
      longDescription:
        "A comprehensive learning management system that uses artificial intelligence to create personalized learning paths for each student. Features include real-time code collaboration, automated assessment, progress analytics, and community forums.",
      category: "Full Stack",
      status: "Active",
      featured: true,
      image: "/api/placeholder/400/250",
      tech: [
        "Next.js",
        "TypeScript",
        "Prisma",
        "PostgreSQL",
        "OpenAI",
        "Tailwind CSS",
        "Vercel",
      ],
      stars: 234,
      forks: 45,
      views: 1250,
      downloads: 89,
      likes: 156,
      comments: 23,
      demoUrl: "https://smart-learning.demo",
      githubUrl: "https://github.com/user/smart-learning",
      startDate: "2024-03-15",
      endDate: "2024-12-01",
      teamSize: 1,
      role: "Full Stack Developer",
      highlights: [
        "AI-powered personalization",
        "Real-time collaboration",
        "Advanced analytics",
      ],
    },
    {
      id: 2,
      title: "Community Forum App",
      description:
        "Real-time discussion platform for programming communities with advanced moderation tools, reputation system, and knowledge sharing features.",
      longDescription:
        "A modern forum application designed specifically for programming communities. Features include real-time messaging, code syntax highlighting, reputation-based moderation, and advanced search capabilities.",
      category: "Full Stack",
      status: "Active",
      featured: true,
      image: "/api/placeholder/400/250",
      tech: ["React", "Node.js", "Socket.io", "MongoDB", "Express", "Redis"],
      stars: 156,
      forks: 32,
      views: 890,
      downloads: 67,
      likes: 124,
      comments: 18,
      demoUrl: "https://community-forum.demo",
      githubUrl: "https://github.com/user/community-forum",
      startDate: "2024-01-10",
      endDate: "2024-08-15",
      teamSize: 2,
      role: "Lead Developer",
      highlights: [
        "Real-time messaging",
        "Advanced moderation",
        "Code highlighting",
      ],
    },
    {
      id: 3,
      title: "E-commerce Dashboard",
      description:
        "Comprehensive admin dashboard for e-commerce management with analytics, inventory tracking, and customer management features.",
      longDescription:
        "A complete dashboard solution for e-commerce businesses featuring sales analytics, inventory management, customer relationship tools, and automated reporting systems.",
      category: "Frontend",
      status: "Completed",
      featured: false,
      image: "/api/placeholder/400/250",
      tech: ["React", "Chart.js", "Material-UI", "Redux", "REST API"],
      stars: 89,
      forks: 21,
      views: 542,
      downloads: 34,
      likes: 78,
      comments: 12,
      demoUrl: "https://ecommerce-dash.demo",
      githubUrl: "https://github.com/user/ecommerce-dashboard",
      startDate: "2023-11-01",
      endDate: "2024-02-28",
      teamSize: 3,
      role: "Frontend Lead",
      highlights: [
        "Real-time analytics",
        "Inventory automation",
        "Mobile responsive",
      ],
    },
    {
      id: 4,
      title: "Task Management Mobile App",
      description:
        "Cross-platform mobile application for team task management with offline support, push notifications, and collaboration tools.",
      longDescription:
        "A feature-rich mobile app for project management and team collaboration. Includes offline functionality, real-time sync, file sharing, and advanced project tracking capabilities.",
      category: "Mobile",
      status: "Active",
      featured: false,
      image: "/api/placeholder/400/250",
      tech: [
        "React Native",
        "Expo",
        "Firebase",
        "AsyncStorage",
        "Push Notifications",
      ],
      stars: 67,
      forks: 15,
      views: 423,
      downloads: 156,
      likes: 89,
      comments: 9,
      demoUrl: "https://taskapp.demo",
      githubUrl: "https://github.com/user/task-mobile-app",
      startDate: "2024-06-01",
      endDate: "2024-11-30",
      teamSize: 2,
      role: "Mobile Developer",
      highlights: ["Offline support", "Real-time sync", "Cross-platform"],
    },
    {
      id: 5,
      title: "Weather Analytics API",
      description:
        "RESTful API service for weather data aggregation and analysis with machine learning predictions and historical data insights.",
      longDescription:
        "A robust API service that aggregates weather data from multiple sources, provides historical analysis, and uses machine learning to generate weather predictions and climate insights.",
      category: "Backend",
      status: "Completed",
      featured: false,
      image: "/api/placeholder/400/250",
      tech: [
        "Python",
        "FastAPI",
        "PostgreSQL",
        "Pandas",
        "Scikit-learn",
        "Docker",
      ],
      stars: 45,
      forks: 12,
      views: 334,
      downloads: 28,
      likes: 52,
      comments: 7,
      demoUrl: "https://weather-api.demo",
      githubUrl: "https://github.com/user/weather-api",
      startDate: "2023-08-15",
      endDate: "2023-12-20",
      teamSize: 1,
      role: "Backend Developer",
      highlights: [
        "ML predictions",
        "Multi-source data",
        "Scalable architecture",
      ],
    },
    {
      id: 6,
      title: "Design System Library",
      description:
        "Comprehensive React component library with design tokens, accessibility features, and comprehensive documentation.",
      longDescription:
        "A complete design system and component library built for scalable web applications. Includes design tokens, accessibility compliance, theming support, and interactive documentation.",
      category: "Frontend",
      status: "Active",
      featured: false,
      image: "/api/placeholder/400/250",
      tech: ["React", "TypeScript", "Storybook", "Styled Components", "Jest"],
      stars: 123,
      forks: 34,
      views: 678,
      downloads: 234,
      likes: 145,
      comments: 19,
      demoUrl: "https://design-system.demo",
      githubUrl: "https://github.com/user/design-system",
      startDate: "2024-02-01",
      endDate: "Ongoing",
      teamSize: 4,
      role: "Component Lead",
      highlights: [
        "Accessibility compliant",
        "Design tokens",
        "Interactive docs",
      ],
    },
  ];

  const projectStats = {
    total: projects.length,
    active: projects.filter((p) => p.status === "Active").length,
    completed: projects.filter((p) => p.status === "Completed").length,
    totalStars: projects.reduce((sum, p) => sum + p.stars, 0),
    totalViews: projects.reduce((sum, p) => sum + p.views, 0),
    featured: projects.filter((p) => p.featured).length,
  };

  const categories = [
    { name: "All", count: projects.length, icon: Code, color: "text-gray-400" },
    {
      name: "Full Stack",
      count: projects.filter((p) => p.category === "Full Stack").length,
      icon: Globe,
      color: "text-blue-400",
    },
    {
      name: "Frontend",
      count: projects.filter((p) => p.category === "Frontend").length,
      icon: Palette,
      color: "text-green-400",
    },
    {
      name: "Backend",
      count: projects.filter((p) => p.category === "Backend").length,
      icon: Server,
      color: "text-purple-400",
    },
    {
      name: "Mobile",
      count: projects.filter((p) => p.category === "Mobile").length,
      icon: Smartphone,
      color: "text-pink-400",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-400 bg-green-900/30 border-green-800";
      case "Completed":
        return "text-blue-400 bg-blue-900/30 border-blue-800";
      case "In Progress":
        return "text-yellow-400 bg-yellow-900/30 border-yellow-800";
      default:
        return "text-gray-400 bg-gray-900/30 border-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return CheckCircle2;
      case "Completed":
        return CheckCircle2;
      case "In Progress":
        return Loader;
      default:
        return AlertCircle;
    }
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
            <div className="text-xl font-bold text-blue-400">
              {projectStats.total}
            </div>
            <div className="text-sm text-gray-400">Total Projects</div>
          </div>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 p-4 rounded-lg border border-blue-800/30">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {projectStats.total}
            </div>
            <div className="text-sm text-blue-300">Total</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-900/50 to-green-800/50 p-4 rounded-lg border border-green-800/30">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {projectStats.active}
            </div>
            <div className="text-sm text-green-300">Active</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 p-4 rounded-lg border border-purple-800/30">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {projectStats.completed}
            </div>
            <div className="text-sm text-purple-300">Completed</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 p-4 rounded-lg border border-yellow-800/30">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {projectStats.totalStars}
            </div>
            <div className="text-sm text-yellow-300">Total Stars</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-pink-900/50 to-pink-800/50 p-4 rounded-lg border border-pink-800/30">
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-400">
              {projectStats.totalViews}
            </div>
            <div className="text-sm text-pink-300">Total Views</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-900/50 to-orange-800/50 p-4 rounded-lg border border-orange-800/30">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">
              {projectStats.featured}
            </div>
            <div className="text-sm text-orange-300">Featured</div>
          </div>
        </div>
      </div>

      {/* Filter Categories */}
      <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filter by Category
          </h2>
          <div className="flex items-center space-x-2 bg-[#0D1117] rounded-lg p-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              className="bg-transparent border-none outline-none text-sm text-gray-300 placeholder-gray-500"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <button
                key={index}
                className="flex items-center space-x-2 px-4 py-2 bg-[#0D1117] hover:bg-[#21262D] rounded-lg border border-gray-800 hover:border-gray-600 transition-all"
              >
                <IconComponent className={`w-4 h-4 ${category.color}`} />
                <span className="text-sm font-medium">{category.name}</span>
                <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Projects */}
      <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <Star className="w-5 h-5 mr-2 text-yellow-400" />
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects
            .filter((project) => project.featured)
            .map((project) => {
              const StatusIcon = getStatusIcon(project.status);
              return (
                <div
                  key={project.id}
                  className="bg-[#0D1117] border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-all hover:scale-105 duration-200"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center relative">
                    <Code className="w-16 h-16 text-gray-400" />
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        project.status
                      )}`}
                    >
                      <StatusIcon className="w-3 h-3 inline mr-1" />
                      {project.status}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-blue-400">
                        {project.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded">
                          +{project.tech.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          <span>{project.stars}</span>
                        </div>
                        <div className="flex items-center">
                          <GitFork className="w-4 h-4 mr-1" />
                          <span>{project.forks}</span>
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          <span>{project.views}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <a
                          href={project.demoUrl}
                          className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Demo</span>
                        </a>
                        <a
                          href={project.githubUrl}
                          className="flex items-center space-x-1 text-gray-400 hover:text-white text-sm"
                        >
                          <Github className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                          <Heart className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* All Projects */}
      <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          All Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => {
            const StatusIcon = getStatusIcon(project.status);
            return (
              <div
                key={project.id}
                className="bg-[#0D1117] border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-all hover:scale-105 duration-200"
              >
                <div className="h-32 bg-gradient-to-br from-gray-900/50 to-gray-800/50 flex items-center justify-center relative">
                  <Code className="w-10 h-10 text-gray-400" />
                  {project.featured && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                      Featured
                    </div>
                  )}
                  <div
                    className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium border ${getStatusColor(
                      project.status
                    )}`}
                  >
                    <StatusIcon className="w-3 h-3 inline mr-1" />
                    {project.status}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-blue-400 truncate">
                      {project.title}
                    </h3>
                    <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        <span>{project.stars}</span>
                      </div>
                      <div className="flex items-center">
                        <GitFork className="w-3 h-3 mr-1" />
                        <span>{project.forks}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{new Date(project.startDate).getFullYear()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <a
                        href={project.demoUrl}
                        className="text-blue-400 hover:text-blue-300 text-xs"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href={project.githubUrl}
                        className="text-gray-400 hover:text-white text-xs"
                      >
                        <Github className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                      <Heart className="w-3 h-3" />
                      <span>{project.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

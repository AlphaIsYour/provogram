/* eslint-disable @typescript-eslint/no-unused-vars */
// app/[username]/projects/ProjectsList.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Project,
  Technology,
  ProjectCategory,
  ProjectStatus,
} from "@prisma/client";
import {
  Code as CodeIcon,
  Star as StarIcon,
  GitFork as GitForkIcon,
  ExternalLink as ExternalLinkIcon,
  Github as GithubIcon,
  Eye as EyeIcon,
  Heart as HeartIcon,
  Share2 as Share2Icon,
  CheckCircle2 as CheckCircle2Icon,
  AlertCircle as AlertCircleIcon,
  Loader as LoaderIcon,
  Filter,
  Search,
  BookOpen,
  Calendar,
} from "lucide-react";
import { getIconComponent } from "./page";

// TIPE DATA
type ProjectWithRelations = Project & {
  technologies: Technology[];
  category: ProjectCategory | null;
};

interface ProjectsListProps {
  projects: ProjectWithRelations[];
  categories: (ProjectCategory & { _count: { projects: number } })[];
}

// HELPER
const getStatusStyles = (status: ProjectStatus) => {
  switch (status) {
    case "ACTIVE":
    case "ONGOING":
      return {
        class: "text-green-400 bg-green-900/30 border-green-800",
        icon: CheckCircle2Icon,
      };
    case "COMPLETED":
      return {
        class: "text-blue-400 bg-blue-900/30 border-blue-800",
        icon: CheckCircle2Icon,
      };
    case "IN_PROGRESS":
      return {
        class: "text-yellow-400 bg-yellow-900/30 border-yellow-800",
        icon: LoaderIcon,
      };
    case "ARCHIVED":
      return {
        class: "text-gray-400 bg-gray-900/30 border-gray-800",
        icon: AlertCircleIcon,
      };
    default:
      return {
        class: "text-gray-400 bg-gray-900/30 border-gray-800",
        icon: AlertCircleIcon,
      };
  }
};

// KOMPONEN CLIENT
export default function ProjectsList({
  projects,
  categories,
}: ProjectsListProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "All") return true;
    return project.category?.name === activeCategory;
  });

  const categoriesForFilter: {
    name: string;
    count: number;
    icon: string;
    color: string;
  }[] = [
    {
      name: "All",
      count: projects.length,
      icon: "Code",
      color: "text-gray-400",
    },
    ...categories.map((cat) => ({
      name: cat.name,
      count: cat._count.projects,
      icon: cat.icon || "Code",
      color: cat.color || "text-gray-400",
    })),
  ];

  return (
    <>
      {/* Filter Categories */}
      <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Filter className="w-4 h-4 mr-2" />
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
          {categoriesForFilter.map((category, idx) => {
            const IconComponent = getIconComponent(
              category.icon
            ) as React.ComponentType<{ className?: string }>;
            return (
              <button
                key={`${category.name}-${idx}`}
                onClick={() => setActiveCategory(category.name)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                  activeCategory === category.name
                    ? "bg-gray-900 text-white border-gray-300"
                    : "bg-[#0D1117] text-gray-300 border-gray-800 hover:border-gray-600"
                }`}
              >
                <IconComponent
                  className={`w-4 h-4 ${String(category.color)}`}
                />
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
          <StarIcon className="w-5 h-5 mr-2 text-yellow-400" />
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects
            .filter((p) => p.isFeatured)
            .map((project) => {
              const statusStyle = getStatusStyles(project.status);
              const StatusIcon = statusStyle.icon;
              return (
                <div
                  key={project.id}
                  className="bg-[#0D1117] border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-all hover:scale-101 duration-200"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center relative">
                    <CodeIcon className="w-16 h-16 text-gray-400" />
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium border ${statusStyle.class}`}
                    >
                      <StatusIcon className="w-3 h-3 inline mr-1" />
                      {project.status.replace("_", " ")}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-blue-400">
                        {project.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                          {project.category?.name}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech.id}
                          className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                        >
                          {tech.name}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <StarIcon className="w-4 h-4 mr-1" />
                          <span>{project.stars}</span>
                        </div>
                        <div className="flex items-center">
                          <GitForkIcon className="w-4 h-4 mr-1" />
                          <span>{project.forks}</span>
                        </div>
                        <div className="flex items-center">
                          <EyeIcon className="w-4 h-4 mr-1" />
                          <span>{project.views}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <a
                          href={project.demoUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm"
                        >
                          <ExternalLinkIcon className="w-4 h-4" />
                          <span>Demo</span>
                        </a>
                        <a
                          href={project.githubUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-gray-400 hover:text-white text-sm"
                        >
                          <GithubIcon className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                          <HeartIcon className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                          <Share2Icon className="w-4 h-4" />
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
          {filteredProjects.map((project) => {
            const statusStyle = getStatusStyles(project.status);
            const StatusIcon = statusStyle.icon;
            return (
              <div
                key={project.id}
                className="bg-[#0D1117] border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-all hover:scale-102 duration-200"
              >
                <div className="h-32 bg-gradient-to-br from-gray-900/50 to-gray-800/50 flex items-center justify-center relative">
                  <CodeIcon className="w-10 h-10 text-gray-400" />
                  {project.isFeatured && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                      Featured
                    </div>
                  )}
                  <div
                    className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium border ${statusStyle.class}`}
                  >
                    <StatusIcon className="w-3 h-3 inline mr-1" />
                    {project.status.replace("_", " ")}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-blue-400 truncate">
                      {project.title}
                    </h3>
                    <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                      {project.category?.name}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech.id}
                        className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                      >
                        {tech.name}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <StarIcon className="w-3 h-3 mr-1" />
                        <span>{project.stars}</span>
                      </div>
                      <div className="flex items-center">
                        <GitForkIcon className="w-3 h-3 mr-1" />
                        <span>{project.forks}</span>
                      </div>
                    </div>
                    {project.startDate && (
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{new Date(project.startDate).getFullYear()}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <a
                        href={project.demoUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-xs"
                      >
                        <ExternalLinkIcon className="w-3 h-3" />
                      </a>
                      <a
                        href={project.githubUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white text-xs"
                      >
                        <GithubIcon className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                      <HeartIcon className="w-3 h-3" />
                      <span>{project.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

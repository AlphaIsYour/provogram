/* eslint-disable @typescript-eslint/no-unused-vars */
// app/[username]/projects/ProjectsList.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Project,
  Technology,
  ProjectCategory,
  ProjectStatus,
} from "@prisma/client";
import { getIconComponent } from "@/lib/icons";
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
  X,
} from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  // Debounce search query untuk performa yang lebih baik
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setIsSearching(false);
    }, 300);

    if (searchQuery) {
      setIsSearching(true);
    }

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter projects berdasarkan kategori dan search query
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by category
    if (activeCategory !== "All") {
      filtered = filtered.filter(
        (project) => project.category?.name === activeCategory
      );
    }

    // Filter by search query
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description?.toLowerCase().includes(query) ||
          project.technologies.some((tech) =>
            tech.name.toLowerCase().includes(query)
          ) ||
          project.category?.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [projects, activeCategory, debouncedSearchQuery]);

  // Update category counts berdasarkan search results
  const categoriesForFilter = useMemo(() => {
    const searchFiltered = debouncedSearchQuery
      ? projects.filter((project) => {
          const query = debouncedSearchQuery.toLowerCase();
          return (
            project.title.toLowerCase().includes(query) ||
            project.description?.toLowerCase().includes(query) ||
            project.technologies.some((tech) =>
              tech.name.toLowerCase().includes(query)
            ) ||
            project.category?.name.toLowerCase().includes(query)
          );
        })
      : projects;

    return [
      {
        name: "All",
        count: searchFiltered.length,
        icon: "Code",
        color: "text-gray-400",
      },
      ...categories.map((cat) => ({
        name: cat.name,
        count: searchFiltered.filter((p) => p.category?.name === cat.name)
          .length,
        icon: cat.icon || "Code",
        color: cat.color || "text-gray-400",
      })),
    ];
  }, [categories, projects, debouncedSearchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
    setDebouncedSearchQuery("");
    setIsSearching(false);
  };

  return (
    <>
      {/* Filter Categories */}
      <div className="bg-[#161B22] rounded-lg p-4 sm:p-6 border border-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
          <h2 className="text-base text-[18px] sm:text[18px] font-semibold flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter by Category
          </h2>

          {/* Search Bar */}
          <div className="flex items-center space-x-2 bg-[#0D1117] rounded-lg p-2 border border-gray-700 focus-within:border-blue-500 transition-colors w-full sm:w-auto sm:min-w-[280px]">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-gray-300 placeholder-gray-500 flex-1 min-w-0"
            />
            {isSearching && (
              <LoaderIcon className="w-4 h-4 text-blue-400 animate-spin flex-shrink-0" />
            )}
            {searchQuery && !isSearching && (
              <button
                onClick={clearSearch}
                className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {categoriesForFilter.map((category, idx) => {
            const IconComponent = getIconComponent(
              category.icon
            ) as React.ComponentType<{ className?: string }>;
            return (
              <button
                key={`${category.name}-${idx}`}
                onClick={() => setActiveCategory(category.name)}
                className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border transition-all text-xs sm:text-sm ${
                  activeCategory === category.name
                    ? "bg-gray-900 text-white border-gray-300"
                    : "bg-[#0D1117] text-gray-300 border-gray-800 hover:border-gray-600"
                }`}
              >
                <IconComponent
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${String(category.color)}`}
                />
                <span className="font-medium truncate">{category.name}</span>
                <span className="text-xs bg-gray-800 text-gray-400 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex-shrink-0">
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Results Info */}
        {debouncedSearchQuery && (
          <div className="mt-4 p-3 bg-[#0D1117] rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">
                Found {filteredProjects.length} project
                {filteredProjects.length !== 1 ? "s" : ""} for &quot;
                <span className="text-blue-400 font-medium">
                  {debouncedSearchQuery}
                </span>
                &quot;
              </span>
              <button
                onClick={clearSearch}
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Clear search
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isSearching && (
        <div className="bg-[#161B22] rounded-lg p-8 border border-gray-800 text-center">
          <LoaderIcon className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-2" />
          <p className="text-gray-400">Searching projects...</p>
        </div>
      )}

      {/* No Results */}
      {!isSearching && filteredProjects.length === 0 && (
        <div className="bg-[#161B22] rounded-lg p-8 border border-gray-800 text-center">
          <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-300 mb-2">
            No projects found
          </h3>
          <p className="text-gray-400 mb-4">
            {debouncedSearchQuery
              ? `No projects match your search "${debouncedSearchQuery}"`
              : `No projects found in "${activeCategory}" category`}
          </p>
          <button
            onClick={() => {
              setActiveCategory("All");
              clearSearch();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Show all projects
          </button>
        </div>
      )}

      {/* Featured Projects */}
      {!isSearching && filteredProjects.some((p) => p.isFeatured) && (
        <div className="bg-[#161B22] rounded-lg p-4 sm:p-6 border border-gray-800">
          <h2 className="text-[18px] sm:text[18px] font-semibold mb-4 sm:mb-6 flex items-center">
            <StarIcon className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-yellow-400" />
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {filteredProjects
              .filter((p) => p.isFeatured)
              .map((project) => {
                const statusStyle = getStatusStyles(project.status);
                const StatusIcon = statusStyle.icon;
                return (
                  <div
                    key={project.id}
                    className="bg-[#0D1117] border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-all hover:scale-[1.02] duration-200"
                  >
                    <div className="h-36 sm:h-48 bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center relative">
                      <CodeIcon className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400" />
                      <div
                        className={`absolute top-2 sm:top-4 right-2 sm:right-4 px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${statusStyle.class}`}
                      >
                        <StatusIcon className="w-3 h-3 inline mr-1" />
                        {project.status.replace("_", " ")}
                      </div>
                    </div>
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg sm:text-xl font-semibold text-blue-400 truncate">
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
      )}

      {/* All Projects */}
      {!isSearching && filteredProjects.length > 0 && (
        <div className="bg-[#161B22] rounded-lg p-4 sm:p-6 border border-gray-800">
          <h2 className="text-[18px] sm:text[18px] font-semibold mb-4 sm:mb-6 flex items-center">
            <BookOpen className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
            All Projects
            <span className="ml-2 text-sm bg-gray-800 text-gray-400 px-2 py-1 rounded">
              {filteredProjects.length}
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredProjects.map((project) => {
              const statusStyle = getStatusStyles(project.status);
              const StatusIcon = statusStyle.icon;
              return (
                <div
                  key={project.id}
                  className="bg-[#0D1117] border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-all hover:scale-[1.02] duration-200"
                >
                  <div className="h-24 sm:h-32 bg-gradient-to-br from-gray-900/50 to-gray-800/50 flex items-center justify-center relative">
                    <CodeIcon className="w-8 sm:w-10 h-8 sm:h-10 text-gray-400" />
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
                  <div className="p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-blue-400 truncate text-sm sm:text-base">
                        {project.title}
                      </h3>
                      <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded flex-shrink-0 ml-2">
                        {project.category?.name}
                      </span>
                    </div>
                    <p className="text-gray-300 text-xs sm:text-sm mb-3 line-clamp-2">
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
                      <div className="flex items-center space-x-2 sm:space-x-3">
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
                          <span>
                            {new Date(project.startDate).getFullYear()}
                          </span>
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
      )}
    </>
  );
}

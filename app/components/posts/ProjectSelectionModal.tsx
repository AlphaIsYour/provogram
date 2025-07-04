// app/components/posts/ProjectSelectionModal.tsx
// File ini sudah tidak diperlukan lagi karena project selection
// sudah diintegrasikan langsung ke dalam CreatePost component

// Jika masih ingin menggunakan modal untuk keperluan lain,
// file ini bisa tetap ada sebagai backup atau untuk fitur future

"use client";

import { Project, Technology } from "@prisma/client";
import { X, CheckCircle, FileCode2 } from "lucide-react";

type ProjectWithTech = Project & { technologies: Technology[] };

interface ProjectSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectWithTech[];
  onSelectProject: (projectId: string) => void;
  selectedProjectId?: string | null;
}

export default function ProjectSelectionModal({
  isOpen,
  onClose,
  projects,
  onSelectProject,
  selectedProjectId,
}: ProjectSelectionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-[#161B22] rounded-xl border border-gray-700 w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Share a Project</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 flex justify-between items-center hover:scale-[1.02] ${
                    selectedProjectId === project.id
                      ? "bg-blue-900/50 border-blue-600 shadow-lg"
                      : "bg-[#0D1117] border-gray-700 hover:border-gray-500 hover:bg-gray-800/30"
                  }`}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-400 mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech.id}
                          className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full"
                        >
                          {tech.name}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{project.technologies.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                  {selectedProjectId === project.id && (
                    <CheckCircle
                      className="text-green-400 flex-shrink-0 ml-3"
                      size={24}
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-12">
                <FileCode2 size={64} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg mb-2">No projects found</p>
                <p className="text-sm">
                  You don&apos;t have any projects to share yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

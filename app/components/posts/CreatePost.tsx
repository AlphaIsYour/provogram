/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/components/posts/CreatePost.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  Image as ImageIcon,
  X,
  FileCode2,
  Loader2,
  Smile,
  FileImage,
  Calendar,
  ChevronDown,
  CheckCircle,
  Globe,
  Clock,
} from "lucide-react";
import { Project, Technology } from "@prisma/client";

// Definisikan tipe project
type ProjectWithTech = Project & { technologies: Technology[] };

interface CreatePostProps {
  onPostCreated: () => void;
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- STATE BARU UNTUK PROJECT ---
  const [isProjectSectionOpen, setIsProjectSectionOpen] = useState(false);
  const [userProjects, setUserProjects] = useState<ProjectWithTech[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [loadingProjects, setLoadingProjects] = useState(false);

  // --- STATE UNTUK FITUR BARU ---
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Efek untuk membuat preview gambar saat file dipilih
  useEffect(() => {
    if (files.length === 0) {
      setPreviews([]);
      return;
    }
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);

    // Cleanup object URLs untuk menghindari memory leak
    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  // Efek untuk auto-resize textarea
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [content]);

  // Fungsi untuk membuka section project dan mengambil data proyek user
  const handleToggleProjectSection = async () => {
    if (!isProjectSectionOpen && userProjects.length === 0) {
      setLoadingProjects(true);
      try {
        const response = await fetch("/api/projects/user-projects");
        const data = await response.json();
        setUserProjects(data.projects || []);
      } catch (err) {
        console.error("Failed to fetch user projects:", err);
      } finally {
        setLoadingProjects(false);
      }
    }
    setIsProjectSectionOpen(!isProjectSectionOpen);
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setIsProjectSectionOpen(false);
  };

  // Fungsi untuk reset pilihan project
  const resetProjectSelection = () => {
    setSelectedProjectId(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  // Fungsi untuk emoji picker (sederhana)
  const handleEmojiSelect = (emoji: string) => {
    setContent(content + emoji);
    setShowEmojiPicker(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && files.length === 0 && !selectedProjectId) return;

    setIsSubmitting(true);
    setError(null);

    // Tentukan tipe post berdasarkan input yang ada
    let postType: "TEXT" | "PHOTO" | "PROJECT";
    if (selectedProjectId) {
      postType = "PROJECT";
    } else if (files.length > 0) {
      postType = "PHOTO";
    } else {
      postType = "TEXT";
    }

    let uploadedImageUrls: string[] = [];

    try {
      // 1. Upload gambar jika ada
      if (postType === "PHOTO" && files.length > 0) {
        const uploadPromises = files.map(async (file) => {
          const response = await fetch(
            `/api/upload?filename=${encodeURIComponent(file.name)}`,
            {
              method: "POST",
              body: file,
            }
          );
          if (!response.ok) throw new Error("File upload failed");
          const newBlob = await response.json();
          return newBlob.url;
        });
        uploadedImageUrls = await Promise.all(uploadPromises);
      }

      // 2. Kirim data post ke backend
      const body = {
        type: postType,
        textContent: postType === "TEXT" ? content : null,
        caption:
          postType === "PHOTO" || postType === "PROJECT" ? content : null,
        imageUrls: uploadedImageUrls,
        projectId: postType === "PROJECT" ? selectedProjectId : null,
        scheduledAt:
          scheduledDate && scheduledTime
            ? new Date(`${scheduledDate}T${scheduledTime}`).toISOString()
            : null,
      };

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Gagal membuat postingan.");
      }

      // 3. Sukses! Reset form & panggil callback
      setContent("");
      setFiles([]);
      setPreviews([]);
      setSelectedProjectId(null);
      setScheduledDate("");
      setScheduledTime("");
      setIsProjectSectionOpen(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      onPostCreated();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Tampilkan info project yang dipilih
  const selectedProjectInfo = selectedProjectId
    ? userProjects.find((p) => p.id === selectedProjectId)
    : null;

  const commonEmojis = [
    "😀",
    "😂",
    "😍",
    "🤔",
    "👍",
    "❤️",
    "🔥",
    "💯",
    "🎉",
    "🚀",
  ];

  return (
    <div className="border-b border-gray-700">
      <div className="px-4 py-3">
        <form onSubmit={handleSubmit} className="flex items-start space-x-4">
          <Image
            src={session?.user?.image || "/default-avatar.png"}
            alt={session?.user?.name || "User Avatar"}
            width={40}
            height={40}
            className="rounded-full flex-shrink-0"
          />
          <div className="w-full">
            <textarea
              ref={textAreaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                selectedProjectId
                  ? "Add a comment to your project..."
                  : "What is happening?!"
              }
              className="w-full bg-transparent text-white text-xl placeholder-gray-500 focus:outline-none resize-none overflow-hidden"
              rows={1}
            />

            {/* Tampilan Preview Project yang Dipilih */}
            {selectedProjectInfo && (
              <div className="mt-3 border border-gray-700 rounded-lg p-3 relative">
                <button
                  type="button"
                  onClick={resetProjectSelection}
                  className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70"
                >
                  <X size={14} />
                </button>
                <p className="font-semibold text-blue-400">
                  {selectedProjectInfo.title}
                </p>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {selectedProjectInfo.description}
                </p>
                {selectedProjectInfo.technologies &&
                  selectedProjectInfo.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedProjectInfo.technologies
                        .slice(0, 3)
                        .map((tech) => (
                          <span
                            key={tech.id}
                            className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                          >
                            {tech.name}
                          </span>
                        ))}
                      {selectedProjectInfo.technologies.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{selectedProjectInfo.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
              </div>
            )}

            {/* Image Previews */}
            {previews.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {previews.map((preview, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      width={200}
                      height={200}
                      className="rounded-lg w-full h-auto object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 bg-black bg-opacity-70 rounded-full p-1 text-white hover:bg-opacity-90"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Scheduled Post Info */}
            {scheduledDate && scheduledTime && (
              <div className="mt-3 flex items-center space-x-2 text-blue-400 text-sm">
                <Clock size={16} />
                <span>
                  Scheduled for {scheduledDate} at {scheduledTime}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setScheduledDate("");
                    setScheduledTime("");
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="mt-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                <div className="grid grid-cols-10 gap-2">
                  {commonEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => handleEmojiSelect(emoji)}
                      className="text-2xl hover:bg-gray-700 rounded p-1"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* GIF Picker Placeholder */}
            {showGifPicker && (
              <div className="mt-3 p-4 bg-gray-800 rounded-lg border border-gray-700 text-center">
                <p className="text-gray-400">GIF picker coming soon...</p>
              </div>
            )}

            {/* Scheduler */}
            {showScheduler && (
              <div className="mt-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                <h4 className="text-sm font-semibold mb-2">Schedule post</h4>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="bg-gray-700 text-white rounded px-3 py-2 text-sm"
                  />
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="bg-gray-700 text-white rounded px-3 py-2 text-sm"
                  />
                </div>
              </div>
            )}

            {/* Privacy & Reply Settings */}
            <div className="flex items-center space-x-4 mt-3 text-blue-400 text-sm">
              <button
                type="button"
                className="flex items-center space-x-1 hover:bg-blue-400/10 rounded-full px-2 py-1"
              >
                <Globe size={14} />
                <span>Everyone can reply</span>
              </button>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center space-x-1 text-blue-400">
                {/* Tombol Upload Gambar */}
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 hover:bg-blue-400/10 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!!selectedProjectId}
                  title={
                    selectedProjectId
                      ? "Cannot add images with project posts"
                      : "Add images"
                  }
                >
                  <ImageIcon size={20} />
                </button>

                {/* Tombol GIF */}
                <button
                  type="button"
                  onClick={() => {
                    setShowGifPicker(!showGifPicker);
                    setShowEmojiPicker(false);
                    setShowScheduler(false);
                  }}
                  className="p-2 hover:bg-blue-400/10 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!!selectedProjectId || files.length > 0}
                  title="Add GIF"
                >
                  <FileImage size={20} />
                </button>

                {/* Tombol Emoji */}
                <button
                  type="button"
                  onClick={() => {
                    setShowEmojiPicker(!showEmojiPicker);
                    setShowGifPicker(false);
                    setShowScheduler(false);
                  }}
                  className="p-2 hover:bg-blue-400/10 rounded-full"
                  title="Add emoji"
                >
                  <Smile size={20} />
                </button>

                {/* Tombol Schedule */}
                <button
                  type="button"
                  onClick={() => {
                    setShowScheduler(!showScheduler);
                    setShowEmojiPicker(false);
                    setShowGifPicker(false);
                  }}
                  className="p-2 hover:bg-blue-400/10 rounded-full"
                  title="Schedule post"
                >
                  <Calendar size={20} />
                </button>

                {/* Tombol untuk Post Project */}
                <button
                  type="button"
                  onClick={handleToggleProjectSection}
                  className="p-2 hover:bg-blue-400/10 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={files.length > 0}
                  title={
                    files.length > 0
                      ? "Cannot add project with image posts"
                      : "Share a project"
                  }
                >
                  <FileCode2 size={20} />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                {/* Character Counter */}
                <div className="text-sm text-gray-400">
                  {content.length}/280
                </div>

                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    (!content.trim() &&
                      files.length === 0 &&
                      !selectedProjectId) ||
                    content.length > 280
                  }
                  className="bg-orange-500 text-white font-bold py-2 px-6 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : scheduledDate && scheduledTime ? (
                    "Schedule"
                  ) : (
                    "Post"
                  )}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          </div>
        </form>
      </div>

      {/* Project Selection Section - Inline */}
      {isProjectSectionOpen && (
        <div className="px-4 pb-4 border-t border-gray-700">
          <div className="ml-14">
            {" "}
            {/* Offset untuk align dengan content */}
            <div className="flex items-center justify-between py-3">
              <h3 className="text-lg font-semibold">Choose a project</h3>
              <button
                onClick={() => setIsProjectSectionOpen(false)}
                className="p-1 hover:bg-gray-700 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            {loadingProjects ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="animate-spin" size={24} />
              </div>
            ) : (
              <div className="max-h-64 overflow-y-auto space-y-2">
                {userProjects.length > 0 ? (
                  userProjects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => handleSelectProject(project.id)}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors flex justify-between items-center hover:bg-gray-800/50 ${
                        selectedProjectId === project.id
                          ? "bg-blue-900/50 border-blue-600"
                          : "border-gray-700"
                      }`}
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-blue-400 text-sm">
                          {project.title}
                        </h4>
                        <p className="text-sm text-gray-400 line-clamp-1">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech.id}
                              className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full"
                            >
                              {tech.name}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                      {selectedProjectId === project.id && (
                        <CheckCircle
                          className="text-green-400 flex-shrink-0 ml-2"
                          size={20}
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <FileCode2 size={48} className="mx-auto mb-2 opacity-50" />
                    <p>You don&apos;t have any projects to share yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

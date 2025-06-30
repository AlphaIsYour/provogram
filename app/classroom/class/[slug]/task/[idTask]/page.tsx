/* eslint-disable @typescript-eslint/no-unused-vars */
// app/classroom/class/[slug]/task/[idTask]/page.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  Paperclip,
  Upload,
  Link as LinkIcon,
  HardDrive,
  Check,
  Send,
  X,
  Clock,
  CheckCircle,
} from "lucide-react";
import React from "react";

// Komponen Modal yang sudah diupgrade
const DummyModal = ({ isOpen, onClose, children }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-slate-900 rounded-xl border border-slate-700 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">Kumpulkan Tugas</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Fungsi simulasi fetch data
const getTaskDetails = async (idTask: string) => {
  console.log("Fetching task details for:", idTask);
  return {
    title: "Buat Desain Landing Page di Figma",
    description:
      'Rancang sebuah desain landing page untuk produk fiktif "CodeSphere", sebuah platform belajar koding. Pastikan desain responsif dan mengikuti prinsip-prinsip UI/UX modern. Kumpulkan dalam bentuk link Figma.',
    attachments: [
      { name: "Design Brief.pdf", url: "#" },
      { name: "Asset Logo.zip", url: "#" },
    ],
    deadline: "25 Feb 2024",
    // Data submission siswa (jika sudah ada)
    submission: {
      submittedAt: "24 Feb 2024, 10:30",
      type: "link",
      value: "https://figma.com/file/contohlink",
      grade: 95,
      feedback: "Kerja bagus! Desainnya sangat clean dan modern. Pertahankan!",
    },
    // submission: null // Gunakan ini untuk simulasi belum mengumpulkan
  };
};

// --- MAIN PAGE COMPONENT ---
const TaskDetailPage = ({
  params,
}: {
  params: Promise<{ idTask: string }>;
}) => {
  const [task, setTask] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionType, setSubmissionType] = useState<
    "link" | "file" | "drive"
  >("link");

  // Unwrap params using React.use()
  const unwrappedParams = React.use(params);

  useEffect(() => {
    getTaskDetails(unwrappedParams.idTask).then((data) => {
      setTask(data);
      setIsLoading(false);
    });
  }, [unwrappedParams.idTask]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">Memuat detail tugas...</div>
      </div>
    );
  }

  const { title, description, attachments, submission, deadline } = task;

  return (
    <div className="min-h-screen">
      <div className="max-w-8xl mx-auto lg:px-2 py-2">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Kolom Kiri: Detail Tugas */}
          <div className="xl:col-span-3">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 sm:p-8">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  {title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Clock size={16} />
                  <span>Deadline: {deadline}</span>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-slate prose-invert max-w-none mb-8">
                <p className="text-slate-300 leading-relaxed">{description}</p>
              </div>

              {/* Attachments */}
              {attachments && attachments.length > 0 && (
                <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Paperclip size={18} />
                    Lampiran dari Mentor
                  </h3>
                  <div className="space-y-2">
                    {attachments.map((file: any) => (
                      <a
                        key={file.name}
                        href={file.url}
                        className="flex items-center gap-3 p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors group"
                      >
                        <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center">
                          <Paperclip size={14} className="text-slate-300" />
                        </div>
                        <span className="text-slate-300 group-hover:text-white text-sm font-medium">
                          {file.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Panel Pengumpulan Tugas */}
          <div className="xl:col-span-1">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Pekerjaan Anda
              </h3>

              {submission ? (
                // Tampilan jika SUDAH mengumpulkan
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle size={20} />
                    <span className="font-medium">Telah Dikumpulkan</span>
                  </div>

                  <div className="text-xs text-slate-400 bg-slate-800/50 px-3 py-2 rounded-lg">
                    {submission.submittedAt}
                  </div>

                  {submission.grade && (
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-300">
                          Nilai
                        </span>
                        <span className="text-lg font-bold text-emerald-400">
                          {submission.grade}
                        </span>
                      </div>
                      {submission.feedback && (
                        <div className="pt-3 border-t border-slate-700">
                          <p className="text-xs text-slate-300 leading-relaxed">
                            &quot;{submission.feedback}&quot;
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <button className="w-full text-sm py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700">
                    Batalkan Pengumpulan
                  </button>
                </div>
              ) : (
                // Tampilan jika BELUM mengumpulkan
                <div className="space-y-4">
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                    <p className="text-sm text-amber-300">
                      Tugas belum dikerjakan
                    </p>
                  </div>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Kumpulkan Tugas
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal untuk Pengumpulan Tugas */}
        <DummyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="p-6">
            {/* Tab Navigation */}
            <div className="flex border-b border-slate-700 mb-6">
              {[
                { key: "link", icon: LinkIcon, label: "Link" },
                { key: "file", icon: Upload, label: "Upload" },
                { key: "drive", icon: HardDrive, label: "Drive" },
              ].map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setSubmissionType(key as any)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative ${
                    submissionType === key
                      ? "text-blue-400"
                      : "text-slate-400 hover:text-slate-300"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                  {submissionType === key && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="mb-6">
              {submissionType === "link" && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    URL Tautan
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              {submissionType === "file" && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Upload File
                  </label>
                  <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center hover:border-slate-600 transition-colors">
                    <Upload size={24} className="mx-auto text-slate-400 mb-2" />
                    <p className="text-sm text-slate-400 mb-2">
                      Drag & drop atau klik untuk memilih
                    </p>
                    <input type="file" className="hidden" id="file-upload" />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Pilih File
                    </label>
                  </div>
                </div>
              )}

              {submissionType === "drive" && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Google Drive
                  </label>
                  <button className="w-full p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <HardDrive size={18} />
                    Pilih dari Google Drive
                  </button>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2.5 text-slate-400 hover:text-white transition-colors"
              >
                Batal
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <Send size={16} />
                Kirim Tugas
              </button>
            </div>
          </div>
        </DummyModal>
      </div>
    </div>
  );
};

export default TaskDetailPage;

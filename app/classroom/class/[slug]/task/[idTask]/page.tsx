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
} from "lucide-react";
// Asumsi kamu punya komponen Modal dari ShadCN/UI atau library lain
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal';

// --- DUMMY COMPONENTS & FUNCTIONS FOR DEMO ---
// Komponen Modal sederhana untuk demonstrasi
const DummyModal = ({ isOpen, onClose, children }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-[#161B22] rounded-lg border border-[#30363D] w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Kumpulkan Tugas</h2>
          <button onClick={onClose} className="text-[#8B949E] hover:text-white">
            ×
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
const TaskDetailPage = ({ params }: { params: { idTask: string } }) => {
  const [task, setTask] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionType, setSubmissionType] = useState<
    "link" | "file" | "drive"
  >("link");

  useEffect(() => {
    getTaskDetails(params.idTask).then((data) => {
      setTask(data);
      setIsLoading(false);
    });
  }, [params.idTask]);

  if (isLoading) {
    return <div>Memuat detail tugas...</div>;
  }

  const { title, description, attachments, submission } = task;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Kolom Kiri: Detail Tugas */}
      <div className="lg:col-span-2 bg-[#161B22] p-6 rounded-lg border border-[#30363D]">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <div className="prose prose-invert max-w-none">
          <p>{description}</p>
        </div>

        {attachments && attachments.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Lampiran dari Mentor</h3>
            <ul className="space-y-2">
              {attachments.map((file: any) => (
                <li key={file.name}>
                  <a
                    href={file.url}
                    className="flex items-center gap-2 text-blue-400 hover:underline"
                  >
                    <Paperclip size={16} />
                    <span>{file.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Kolom Kanan: Panel Pengumpulan Tugas */}
      <div className="lg:col-span-1">
        <div className="bg-[#161B22] p-5 rounded-lg border border-[#30363D]">
          <h3 className="text-lg font-bold mb-4">Pekerjaan Anda</h3>

          {submission ? (
            // Tampilan jika SUDAH mengumpulkan
            <div>
              <div className="flex items-center gap-2 text-green-400 mb-3">
                <Check size={20} />
                <span className="font-semibold">Telah Dikumpulkan</span>
              </div>
              <p className="text-sm text-[#8B949E] mb-4">
                Pada {submission.submittedAt}
              </p>
              {submission.feedback && (
                <div className="bg-[#0D1117] p-3 rounded-md mt-4 border border-[#30363D]">
                  <h4 className="font-semibold">Feedback dari Mentor</h4>
                  <p className="text-sm mt-1">
                    &quot;{submission.feedback}&quot; -{" "}
                    <span className="font-bold">Nilai: {submission.grade}</span>
                  </p>
                </div>
              )}
              <button className="w-full mt-4 text-sm py-2 bg-[#21262D] rounded-md hover:bg-[#30363D]">
                Batalkan Pengumpulan
              </button>
            </div>
          ) : (
            // Tampilan jika BELUM mengumpulkan
            <div>
              <p className="text-sm text-[#8B949E] mb-4">
                Tugas ditandai sebagai &quot;Belum Dikerjakan&quot;.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
              >
                + Tandai Selesai & Kumpulkan
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal untuk Pengumpulan Tugas */}
      <DummyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex border-b border-[#30363D] mb-4">
          <button
            onClick={() => setSubmissionType("link")}
            className={`p-3 ${
              submissionType === "link"
                ? "border-b-2 border-blue-500 text-white"
                : "text-[#8B949E]"
            }`}
          >
            <LinkIcon size={18} className="inline mr-2" />
            Link Tautan
          </button>
          <button
            onClick={() => setSubmissionType("file")}
            className={`p-3 ${
              submissionType === "file"
                ? "border-b-2 border-blue-500 text-white"
                : "text-[#8B949E]"
            }`}
          >
            <Upload size={18} className="inline mr-2" />
            Upload File
          </button>
          <button
            onClick={() => setSubmissionType("drive")}
            className={`p-3 ${
              submissionType === "drive"
                ? "border-b-2 border-blue-500 text-white"
                : "text-[#8B949E]"
            }`}
          >
            <HardDrive size={18} className="inline mr-2" />
            Google Drive
          </button>
        </div>

        {/* Konten Modal berdasarkan Tipe Submission */}
        <div className="mt-4">
          {submissionType === "link" && (
            <input
              type="url"
              placeholder="https://..."
              className="w-full bg-[#0D1117] p-2 rounded-md border border-[#30363D]"
            />
          )}
          {submissionType === "file" && (
            <input
              type="file"
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          )}
          {submissionType === "drive" && (
            <button className="w-full p-2 bg-gray-600 rounded-md hover:bg-gray-700">
              Pilih dari Google Drive
            </button>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            <Send size={16} />
            Kirim Tugas
          </button>
        </div>
      </DummyModal>
    </div>
  );
};

export default TaskDetailPage;

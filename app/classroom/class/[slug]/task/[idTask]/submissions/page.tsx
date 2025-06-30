// app/classroom/class/[slug]/task/[idTask]/submissions/page.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, use } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Link as LinkIcon,
  File,
  HardDrive,
  Save,
  Clock,
  Award,
  ExternalLink,
} from "lucide-react";

// --- DUMMY DATA & FUNCTIONS ---
const getSubmissionsForTask = async (idTask: string) => {
  console.log("Fetching all submissions for task:", idTask);
  return {
    taskTitle: "Buat Desain Landing Page di Figma",
    totalStudents: 32,
    submissions: [
      {
        studentId: "s01",
        studentName: "Andi Pratama",
        studentAvatar: "/avatars/andi.png",
        submittedAt: "24 Feb, 10:30",
        status: "graded",
        type: "link",
        value: "https://figma.com/file/andi-design-project",
        grade: 95,
        feedback: "Desainnya clean dan modern, sangat bagus!",
      },
      {
        studentId: "s02",
        studentName: "Bunga Citra",
        studentAvatar: "/avatars/bunga.png",
        submittedAt: "24 Feb, 14:00",
        status: "pending",
        type: "file",
        value: "design-landing-page.zip",
        grade: null,
        feedback: null,
      },
      {
        studentId: "s03",
        studentName: "Charlie Darmawan",
        studentAvatar: "/avatars/charlie.png",
        submittedAt: "25 Feb, 09:15",
        status: "pending",
        type: "drive",
        value: "Google Drive File",
        grade: null,
        feedback: null,
      },
      {
        studentId: "s04",
        studentName: "Dewi Lestari",
        studentAvatar: "/avatars/dewi.png",
        submittedAt: "26 Feb, 11:00",
        status: "late",
        type: "link",
        value: "https://figma.com/file/dewi-late-submission",
        grade: null,
        feedback: null,
      },
    ],
  };
};

const SubmissionTypeIcon = ({ type }: { type: "link" | "file" | "drive" }) => {
  const icons = {
    link: <LinkIcon size={16} className="text-blue-400" />,
    file: <File size={16} className="text-amber-400" />,
    drive: <HardDrive size={16} className="text-emerald-400" />,
  };
  return icons[type] || null;
};

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    graded: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    late: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const labels = {
    graded: "Dinilai",
    pending: "Menunggu",
    late: "Terlambat",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${
        styles[status as keyof typeof styles]
      }`}
    >
      {status === "graded" && <CheckCircle2 size={12} />}
      {status === "pending" && <Clock size={12} />}
      {status === "late" && <AlertCircle size={12} />}
      {labels[status as keyof typeof labels]}
    </span>
  );
};

// --- MAIN PAGE COMPONENT ---
const SubmissionsPage = ({
  params,
}: {
  params: Promise<{ idTask: string }>;
}) => {
  const { idTask } = use(params);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  useEffect(() => {
    getSubmissionsForTask(idTask).then((fetchedData) => {
      setData(fetchedData);
      // Secara default, pilih siswa pertama yang belum dinilai
      setSelectedStudent(
        fetchedData.submissions.find((s) => s.status !== "graded") ||
          fetchedData.submissions[0]
      );
      setIsLoading(false);
    });
  }, [idTask]);

  const handleSelectStudent = (student: any) => {
    setSelectedStudent(student);
  };

  const gradedCount =
    data?.submissions.filter((s: any) => s.status === "graded").length || 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">Memuat data submissions...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-8xl mx-auto lg:px-4 py-2">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Penilaian Tugas
          </h1>
          <p className="text-slate-400 mb-1">{data.taskTitle}</p>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-500">
              {gradedCount} dari {data.submissions.length} siswa telah dinilai
            </span>
            <div className="w-32 bg-slate-800 rounded-full h-1.5">
              <div
                className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: `${(gradedCount / data.submissions.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Kolom Kiri: Daftar Siswa */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-slate-800">
                <h3 className="font-semibold text-white">
                  Submission ({data.submissions.length})
                </h3>
              </div>

              <div className="divide-y divide-slate-800 max-h-[calc(100vh-200px)] overflow-y-auto">
                {data.submissions.map((sub: any) => (
                  <div
                    key={sub.studentId}
                    onClick={() => handleSelectStudent(sub)}
                    className={`p-4 cursor-pointer transition-all duration-200 ${
                      selectedStudent?.studentId === sub.studentId
                        ? "bg-blue-500/10 border-r-2 border-blue-500"
                        : "hover:bg-slate-800/30"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {/* Avatar */}
                      <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-slate-300 font-medium text-xs">
                          {sub.studentName
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .toUpperCase()}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white text-sm truncate">
                          {sub.studentName}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <SubmissionTypeIcon type={sub.type} />
                          <span className="text-xs text-slate-400">
                            {sub.submittedAt}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <StatusBadge status={sub.status} />
                      {sub.grade && (
                        <div className="flex items-center gap-1 text-emerald-400">
                          <Award size={12} />
                          <span className="text-xs font-medium">
                            {sub.grade}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Panel Penilaian */}
          <div className="lg:col-span-3">
            {selectedStudent ? (
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl">
                {/* Header */}
                <div className="p-6 border-b border-slate-800">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {selectedStudent.studentName}
                      </h3>
                      <p className="text-sm text-slate-400 flex items-center gap-2">
                        <Clock size={14} />
                        Dikumpulkan: {selectedStudent.submittedAt}
                      </p>
                    </div>
                    <StatusBadge status={selectedStudent.status} />
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Submission Link/File */}
                  <div>
                    <h4 className="font-semibold text-white mb-3">
                      Hasil Kerja Siswa
                    </h4>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <SubmissionTypeIcon type={selectedStudent.type} />
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-300 text-sm truncate">
                            {selectedStudent.value}
                          </p>
                        </div>
                        <button className="text-slate-400 hover:text-white p-1 hover:bg-slate-700 rounded transition-colors">
                          <ExternalLink size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Grading Form */}
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label
                          htmlFor="grade"
                          className="block text-sm font-medium text-slate-300 mb-2"
                        >
                          Nilai (0-100)
                        </label>
                        <input
                          type="number"
                          id="grade"
                          min="0"
                          max="100"
                          defaultValue={selectedStudent.grade || ""}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="feedback"
                        className="block text-sm font-medium text-slate-300 mb-2"
                      >
                        Feedback & Komentar
                      </label>
                      <textarea
                        id="feedback"
                        rows={4}
                        defaultValue={selectedStudent.feedback || ""}
                        placeholder="Berikan feedback konstruktif untuk membantu siswa berkembang..."
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                      >
                        <Save size={16} />
                        Simpan Penilaian
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award size={24} className="text-slate-500" />
                  </div>
                  <p className="text-slate-400">
                    Pilih siswa dari daftar untuk mulai menilai
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsPage;

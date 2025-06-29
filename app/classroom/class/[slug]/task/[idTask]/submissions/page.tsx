/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Link as LinkIcon,
  File,
  HardDrive,
  Edit,
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
        value: "https://figma.com/file/andi",
        grade: 95,
        feedback: "Desainnya clean, bagus!",
      },
      {
        studentId: "s02",
        studentName: "Bunga Citra",
        studentAvatar: "/avatars/bunga.png",
        submittedAt: "24 Feb, 14:00",
        status: "pending",
        type: "file",
        value: "/path/to/file.zip",
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
        value: "#",
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
        value: "https://figma.com/file/dewi",
        grade: null,
        feedback: null,
      },
    ],
  };
};

const SubmissionTypeIcon = ({ type }: { type: "link" | "file" | "drive" }) => {
  const icons = {
    link: <LinkIcon size={20} className="text-blue-400" />,
    file: <File size={20} className="text-yellow-400" />,
    drive: <HardDrive size={20} className="text-green-400" />,
  };
  return icons[type] || null;
};

// --- MAIN PAGE COMPONENT ---
const SubmissionsPage = ({ params }: { params: { idTask: string } }) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  useEffect(() => {
    getSubmissionsForTask(params.idTask).then((fetchedData) => {
      setData(fetchedData);
      // Secara default, pilih siswa pertama yang belum dinilai
      setSelectedStudent(
        fetchedData.submissions.find((s) => s.status !== "graded") ||
          fetchedData.submissions[0]
      );
      setIsLoading(false);
    });
  }, [params.idTask]);

  const handleSelectStudent = (student: any) => {
    setSelectedStudent(student);
  };

  const gradedCount =
    data?.submissions.filter((s: any) => s.status === "graded").length || 0;

  if (isLoading) {
    return <div>Memuat data submissions...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <header className="pb-4 mb-4 border-b border-[#30363D]">
        <h1 className="text-2xl font-bold text-white">
          Penilaian Tugas: {data.taskTitle}
        </h1>
        <p className="text-[#8B949E] mt-1">
          {gradedCount} dari {data.submissions.length} siswa telah dinilai.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
        {/* Kolom Kiri: Daftar Siswa */}
        <div className="md:col-span-1 bg-[#161B22] border border-[#30363D] rounded-lg h-full overflow-y-auto">
          <div className="p-3 border-b border-[#30363D] font-semibold">
            Siswa Terkumpul ({data.submissions.length})
          </div>
          <ul className="divide-y divide-[#30363D]">
            {data.submissions.map((sub: any) => (
              <li
                key={sub.studentId}
                onClick={() => handleSelectStudent(sub)}
                className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${
                  selectedStudent?.studentId === sub.studentId
                    ? "bg-blue-900/50"
                    : "hover:bg-[#21262D]"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* <img src={sub.studentAvatar} className="w-8 h-8 rounded-full" /> */}
                  <div>
                    <p className="font-semibold text-white">
                      {sub.studentName}
                    </p>
                    <p className="text-xs text-[#8B949E]">
                      {sub.status === "late" ? "Terlambat" : "Tepat Waktu"}
                    </p>
                  </div>
                </div>
                {sub.status === "graded" ? (
                  <CheckCircle2 size={20} className="text-green-500" />
                ) : (
                  <AlertCircle size={20} className="text-yellow-500" />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom Kanan: Panel Penilaian */}
        <div className="md:col-span-2">
          {selectedStudent ? (
            <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {selectedStudent.studentName}
                  </h3>
                  <p className="text-sm text-[#8B949E]">
                    Dikumpulkan pada: {selectedStudent.submittedAt}
                  </p>
                </div>
                {selectedStudent.status === "graded" && (
                  <span className="text-sm bg-green-800 text-green-200 px-2 py-1 rounded">
                    Sudah Dinilai
                  </span>
                )}
              </div>

              {/* Tautan/File Submission */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Hasil Kerja Siswa</h4>
                <a
                  href={selectedStudent.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#0D1117] p-3 rounded-md border border-[#30363D] hover:border-blue-500"
                >
                  <SubmissionTypeIcon type={selectedStudent.type} />
                  <span className="truncate text-blue-400">
                    {selectedStudent.value}
                  </span>
                </a>
              </div>

              {/* Form Penilaian */}
              <form>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="col-span-1">
                    <label
                      htmlFor="grade"
                      className="block text-sm font-medium text-[#C9D1D9] mb-1"
                    >
                      Nilai (0-100)
                    </label>
                    <input
                      type="number"
                      id="grade"
                      defaultValue={selectedStudent.grade || ""}
                      className="w-full bg-[#0D1117] p-2 rounded-md border border-[#30363D]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="feedback"
                    className="block text-sm font-medium text-[#C9D1D9] mb-1"
                  >
                    Feedback / Komentar
                  </label>
                  <textarea
                    id="feedback"
                    rows={5}
                    defaultValue={selectedStudent.feedback || ""}
                    placeholder="Tulis feedback konstruktif di sini..."
                    className="w-full bg-[#0D1117] p-2 rounded-md border border-[#30363D]"
                  ></textarea>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <Edit size={16} />
                    Simpan Penilaian
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-[#161B22] border border-[#30363D] rounded-lg">
              <p className="text-[#8B949E]">
                Pilih siswa dari daftar untuk mulai menilai.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionsPage;

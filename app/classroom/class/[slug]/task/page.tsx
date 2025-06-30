/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileCheck,
  PlusCircle,
} from "lucide-react";

// Komponen kecil untuk menampilkan status tugas
const TaskStatusBadge = ({
  status,
}: {
  status: "submitted" | "late" | "pending" | "graded";
}) => {
  const styles = {
    submitted: {
      text: "Dikumpulkan",
      icon: <CheckCircle2 size={14} />,
      color: "text-emerald-400 bg-emerald-400/10",
    },
    graded: {
      text: "Dinilai",
      icon: <CheckCircle2 size={14} />,
      color: "text-blue-400 bg-blue-400/10",
    },
    pending: {
      text: "Belum Dikerjakan",
      icon: <XCircle size={14} />,
      color: "text-amber-400 bg-amber-400/10",
    },
    late: {
      text: "Terlambat",
      icon: <AlertCircle size={14} />,
      color: "text-red-400 bg-red-400/10",
    },
  };
  const currentStyle = styles[status];
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${currentStyle.color}`}
    >
      {currentStyle.icon}
      <span>{currentStyle.text}</span>
    </div>
  );
};

// Fungsi untuk fetch data tugas dari backend
// Di sini kita simulasi pengambilan data untuk role yang berbeda
const getTasksForClass = async (slug: string, role: "student" | "mentor") => {
  console.log(`Fetching tasks for class: ${slug} as ${role}`);

  // Data tugas dasar
  const baseTasks = [
    {
      idTask: "task-001",
      title: "Buat Desain Landing Page di Figma",
      deadline: "25 Feb 2024",
    },
    {
      idTask: "task-002",
      title: "Implementasi Komponen dengan React",
      deadline: "03 Mar 2024",
    },
    { idTask: "task-003", title: "Deploy ke Vercel", deadline: "10 Mar 2024" },
  ];

  if (role === "mentor") {
    return baseTasks.map((task) => ({
      ...task,
      submissionsCount: Math.floor(Math.random() * 30), // jumlah siswa yg kumpul
      totalStudents: 32,
    }));
  } else {
    // Role adalah 'student'
    return baseTasks.map((task, index) => ({
      ...task,
      status: ["submitted", "pending", "late"][index % 3] as
        | "submitted"
        | "pending"
        | "late",
    }));
  }
};

// Komponen Halaman Utama (Server Component)
const ClassTaskPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  // Asumsi: kita bisa mendapatkan role user dari session/server
  // TODO: Replace this with actual session/role fetching logic
  const userRole = "student" as "student" | "mentor"; // Ganti ke 'mentor' untuk lihat perbedaannya

  // Await params since it's a Promise
  const { slug } = await params;

  const tasks = await getTasksForClass(slug, userRole);

  const basePath = `/classroom/class/${slug}/task`;

  return (
    <div className="min-h-screen">
      <div className="max-w-8xl mx-auto sm:px-2 lg:px-4 py-2">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-lg font-bold text-white">Daftar Tugas</h1>
            <p className="text-sm text-slate-400 mt-1">
              {tasks.length} tugas tersedia
            </p>
          </div>
          {userRole === "mentor" && (
            <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg border border-slate-700 transition-colors duration-200">
              <PlusCircle size={16} />
              <span>Buat Tugas Baru</span>
            </button>
          )}
        </div>

        {/* Tasks List */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden">
          {tasks.length > 0 ? (
            <div className="divide-y divide-slate-800">
              {tasks.map((task: any) => (
                <Link key={task.idTask} href={`${basePath}/${task.idTask}`}>
                  <div className="group relative p-4 sm:p-5 hover:bg-slate-800/30 transition-all duration-200 cursor-pointer">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      {/* Task Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-white group-hover:text-slate-100 mb-1">
                          {task.title}
                        </h3>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <span>Deadline:</span>
                          <span className="font-medium">{task.deadline}</span>
                        </p>
                      </div>

                      {/* Status/Stats */}
                      <div className="flex-shrink-0">
                        {userRole === "student" ? (
                          <TaskStatusBadge status={task.status} />
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-lg">
                              <FileCheck size={14} />
                              <span className="text-xs font-medium">
                                {task.submissionsCount} / {task.totalStudents}
                              </span>
                              <span className="text-xs">terkumpul</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hover indicator */}
                    <div className="absolute inset-y-0 left-0 w-0.5 bg-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="mx-auto w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <FileCheck size={24} className="text-slate-500" />
              </div>
              <p className="text-slate-400 text-sm">
                Belum ada tugas di kelas ini.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassTaskPage;

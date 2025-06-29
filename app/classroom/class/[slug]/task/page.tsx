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
      icon: <CheckCircle2 size={16} />,
      color: "text-green-400",
    },
    graded: {
      text: "Dinilai",
      icon: <CheckCircle2 size={16} />,
      color: "text-blue-400",
    },
    pending: {
      text: "Belum Dikerjakan",
      icon: <XCircle size={16} />,
      color: "text-yellow-400",
    },
    late: {
      text: "Terlambat",
      icon: <AlertCircle size={16} />,
      color: "text-red-400",
    },
  };
  const currentStyle = styles[status];
  return (
    <div
      className={`flex items-center gap-2 text-sm font-semibold ${currentStyle.color}`}
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
const ClassTaskPage = async ({ params }: { params: { slug: string } }) => {
  // Asumsi: kita bisa mendapatkan role user dari session/server
  // TODO: Replace this with actual session/role fetching logic
  const userRole = "student" as "student" | "mentor"; // Ganti ke 'mentor' untuk lihat perbedaannya
  const tasks = await getTasksForClass(params.slug, userRole);

  const basePath = `/classroom/class/${params.slug}/task`;

  return (
    <div className="bg-[#0D1117]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Daftar Tugas</h2>
        {userRole === "mentor" && (
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            <PlusCircle size={18} />
            <span>Buat Tugas Baru</span>
          </button>
        )}
      </div>

      <div className="border border-[#30363D] rounded-lg">
        {tasks.length > 0 ? (
          tasks.map((task: any, index: number) => (
            <Link key={task.idTask} href={`${basePath}/${task.idTask}`}>
              <div
                className={`flex items-center justify-between p-4 hover:bg-[#161B22] cursor-pointer ${
                  index < tasks.length - 1 ? "border-b border-[#30363D]" : ""
                }`}
              >
                <div>
                  <h3 className="font-semibold text-white text-lg">
                    {task.title}
                  </h3>
                  <p className="text-sm text-[#8B949E]">
                    Deadline: {task.deadline}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  {userRole === "student" ? (
                    <TaskStatusBadge status={task.status} />
                  ) : (
                    <div className="flex items-center gap-2 text-[#8B949E]">
                      <FileCheck size={18} />
                      <span className="font-semibold">
                        {task.submissionsCount} / {task.totalStudents}
                      </span>
                      <span>Terkumpul</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="p-6 text-center text-[#8B949E]">
            <p>Belum ada tugas di kelas ini.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassTaskPage;

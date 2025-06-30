/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Kita akan import komponen-komponen kecil yang akan kita buat nanti
import { ClassCard } from "@/app/components/classroom/ClassCard";
import { UpcomingTaskCard } from "@/app/components/classroom/UpcomingTaskCard";
import { ReviewCard } from "@/app/components/classroom/ReviewCard";
import { GraduationCap, ListTodo } from "lucide-react";

// Ini adalah fungsi dummy untuk simulasi mengambil data dari backend
// Di aplikasi nyata, ini akan jadi fetch API
const getDashboardData = async (userId: string) => {
  // Simulasi fetch user role
  const userRole = "mentor"; // Ganti jadi 'user' untuk melihat tampilan siswa

  if (userRole === "mentor") {
    return {
      role: "mentor",
      userName: "Prof. Budi",
      teachingClasses: [
        {
          id: "1",
          slug: "belajar-nextjs",
          name: "Belajar Next.js dari Dasar",
          studentCount: 32,
          newSubmissions: 5,
        },
        {
          id: "2",
          slug: "mastering-tailwind",
          name: "Mastering Tailwind CSS",
          studentCount: 25,
          newSubmissions: 0,
        },
      ],
      submissionsToReview: [
        {
          taskId: "t1",
          taskName: "Membuat Landing Page",
          className: "Belajar Next.js",
          studentName: "Andi",
          submittedAt: "2 jam lalu",
        },
        {
          taskId: "t2",
          taskName: "Component Library",
          className: "Mastering Tailwind CSS",
          studentName: "Citra",
          submittedAt: "5 jam lalu",
        },
      ],
    };
  } else {
    return {
      role: "user",
      userName: "Andi",
      enrolledClasses: [
        {
          id: "1",
          slug: "belajar-nextjs",
          name: "Belajar Next.js dari Dasar",
          mentorName: "Prof. Budi",
          progress: 75,
        },
        {
          id: "3",
          slug: "figma-untuk-pemula",
          name: "Figma untuk Pemula",
          mentorName: "Rina S.",
          progress: 40,
        },
      ],
      upcomingDeadlines: [
        {
          taskId: "d1",
          taskName: "Final Project Proposal",
          className: "Belajar Next.js",
          deadline: "2 hari lagi",
          isUrgent: true,
        },
        {
          taskId: "d2",
          taskName: "Studi Kasus UI/UX",
          className: "Figma untuk Pemula",
          deadline: "5 hari lagi",
          isUrgent: false,
        },
      ],
    };
  }
};

const ClassroomDashboardPage = async () => {
  // Di aplikasi nyata, userId akan didapat dari sesi otentikasi
  const data = await getDashboardData("user-123");

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Selamat Datang Kembali, {data.userName}
        </h1>
        <p className="text-[#9CA3AF] text-sm">
          {data.role === "mentor"
            ? "Kelola kelas dan pantau progress siswa Anda"
            : "Lanjutkan perjalanan belajar Anda hari ini"}
        </p>
      </div>

      {/* KONDISIONAL RENDER BERDASARKAN ROLE */}
      {data.role === "mentor" ? (
        <MentorDashboard data={data} />
      ) : (
        <UserDashboard data={data} />
      )}
    </div>
  );
};

// ===================================
//       KOMPONEN UNTUK DASHBOARD
// ===================================

// Tampilan Dashboard untuk MENTOR
const MentorDashboard = ({ data }: { data: any }) => (
  <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
    {/* Main Content */}
    <div className="xl:col-span-3 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Kelas yang Anda Ajar
        </h2>
        <span className="text-sm text-[#9CA3AF] bg-[#1F2937]/40 px-3 py-1 rounded-full">
          {data.teachingClasses.length} Kelas Aktif
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data.teachingClasses.map((cls: any) => (
          <ClassCard key={cls.id} {...cls} role="mentor" />
        ))}
      </div>
    </div>

    {/* Sidebar */}
    <div className="xl:col-span-1 space-y-6">
      <div className="bg-[#111827]/80 backdrop-blur-sm border border-[#1F2937]/60 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-white">
            Perlu Diperiksa
          </h3>
          {data.submissionsToReview.length > 0 && (
            <span className="w-2 h-2 bg-[#EF4444] rounded-full animate-pulse"></span>
          )}
        </div>
        <div className="space-y-3">
          {data.submissionsToReview.map((sub: any) => (
            <ReviewCard key={sub.taskId} {...sub} />
          ))}
          {data.submissionsToReview.length === 0 && (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-[#1F2937]/60 rounded-full flex items-center justify-center mx-auto mb-3">
                <GraduationCap size={20} className="text-[#9CA3AF]" />
              </div>
              <p className="text-[#9CA3AF] text-sm">
                Tidak ada tugas yang perlu diperiksa
              </p>
              <p className="text-[#6B7280] text-xs mt-1">Kerja bagus! 🎉</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

// Tampilan Dashboard untuk USER (SISWA)
const UserDashboard = ({ data }: { data: any }) => (
  <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
    {/* Main Content */}
    <div className="xl:col-span-3 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Kelas Saya</h2>
        <span className="text-sm text-[#9CA3AF] bg-[#1F2937]/40 px-3 py-1 rounded-full">
          {data.enrolledClasses.length} Kelas Diikuti
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data.enrolledClasses.map((cls: any) => (
          <ClassCard key={cls.id} {...cls} role="user" />
        ))}
      </div>
    </div>

    {/* Sidebar */}
    <div className="xl:col-span-1 space-y-6">
      <div className="bg-[#111827]/80 backdrop-blur-sm border border-[#1F2937]/60 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-white">
            Tugas Mendatang
          </h3>
          {data.upcomingDeadlines.some((task: any) => task.isUrgent) && (
            <span className="w-2 h-2 bg-[#F59E0B] rounded-full animate-pulse"></span>
          )}
        </div>
        <div className="space-y-3">
          {data.upcomingDeadlines.map((task: any) => (
            <UpcomingTaskCard key={task.taskId} {...task} />
          ))}
          {data.upcomingDeadlines.length === 0 && (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-[#1F2937]/60 rounded-full flex items-center justify-center mx-auto mb-3">
                <ListTodo size={20} className="text-[#9CA3AF]" />
              </div>
              <p className="text-[#9CA3AF] text-sm">
                Tidak ada tugas mendatang
              </p>
              <p className="text-[#6B7280] text-xs mt-1">Santai dulu! 😎</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default ClassroomDashboardPage;

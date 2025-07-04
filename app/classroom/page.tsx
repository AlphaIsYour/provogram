/* eslint-disable @typescript-eslint/no-explicit-any */
// app/classroom/page.tsx
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { ClassCard } from "@/app/components/classroom/ClassCard";
import { UpcomingTaskCard } from "@/app/components/classroom/UpcomingTaskCard";
import { ReviewCard } from "@/app/components/classroom/ReviewCard";
import { GraduationCap, ListTodo } from "lucide-react";
import DivisionSelection from "./components/DivisionSelection"; // <-- Komponen dari briefing sebelumnya

// Fungsi untuk mengambil data dinamis
async function getDashboardData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      enrollments: { where: { status: "PASSED" }, include: { division: true } },
      // ... (include lain yang dibutuhkan)
    },
  });
  if (!user) return null;

  if (user.role === "MENTOR") {
    const teachingClasses = await prisma.class.findMany({
      where: { mentorId: userId },
    });
    const submissionsToReview = await prisma.submission.findMany({
      where: { task: { class: { mentorId: userId } }, isReviewed: false },
      include: { task: { include: { class: true } }, student: true },
    });
    return {
      role: "MENTOR",
      userName: user.name,
      teachingClasses,
      submissionsToReview,
    };
  }

  if (user.role === "STUDENT") {
    const enrolledClasses = await prisma.class.findMany({
      where: { students: { some: { id: userId } } },
    });
    const upcomingDeadlines = await prisma.task.findMany({
      where: {
        class: { students: { some: { id: userId } } },
        deadline: { gte: new Date() },
      },
      orderBy: { deadline: "asc" },
    });
    return {
      role: "STUDENT",
      userName: user.name,
      enrolledClasses,
      upcomingDeadlines,
    };
  }

  // Jika rolenya USER atau UNREGISTERED
  return { role: user.role };
}

export default async function ClassroomDashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  const data = await getDashboardData(session.user.id);

  if (!data) return notFound();

  // === INI BAGIAN PENTINGNYA ===
  // Jika user belum jadi STUDENT atau MENTOR, arahkan ke pilihan divisi
  if (data.role === "USER" || data.role === "UNREGISTERED") {
    return <DivisionSelection />;
  }

  // Jika sudah, tampilkan dashboard yang sesuai
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Selamat Datang Kembali, {data.userName}
        </h1>
        <p className="text-[#9CA3AF] text-sm">
          {data.role === "MENTOR"
            ? "Kelola kelas dan pantau progress siswa Anda"
            : "Lanjutkan perjalanan belajar Anda hari ini"}
        </p>
      </div>
      {data.role === "MENTOR" ? (
        <MentorDashboard data={data} />
      ) : (
        <UserDashboard data={data} />
      )}
    </div>
  );
}

// ... Komponen MentorDashboard dan UserDashboard tetap sama, tapi sekarang akan menerima data dinamis ...

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

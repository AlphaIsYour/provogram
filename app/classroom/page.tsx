/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Kita akan import komponen-komponen kecil yang akan kita buat nanti
import { ClassCard } from "@/app/components/classroom/ClassCard";
import { UpcomingTaskCard } from "@/app/components/classroom/UpcomingTaskCard";
import { ReviewCard } from "@/app/components/classroom/ReviewCard";

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
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Selamat Datang Kembali, {data.userName}!
      </h1>

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
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2">
      <h2 className="text-xl font-semibold mb-4">Kelas yang Anda Ajar</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.teachingClasses.map((cls: any) => (
          <ClassCard key={cls.id} {...cls} role="mentor" />
        ))}
      </div>
    </div>
    <div className="lg:col-span-1">
      <h2 className="text-xl font-semibold mb-4">Perlu Diperiksa</h2>
      <div className="space-y-3">
        {data.submissionsToReview.map((sub: any) => (
          <ReviewCard key={sub.taskId} {...sub} />
        ))}
        {data.submissionsToReview.length === 0 && (
          <p className="text-[#8B949E]">
            Tidak ada tugas yang perlu diperiksa. Kerja bagus!
          </p>
        )}
      </div>
    </div>
  </div>
);

// Tampilan Dashboard untuk USER (SISWA)
const UserDashboard = ({ data }: { data: any }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2">
      <h2 className="text-xl font-semibold mb-4">Kelas Saya</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.enrolledClasses.map((cls: any) => (
          <ClassCard key={cls.id} {...cls} role="user" />
        ))}
      </div>
    </div>
    <div className="lg:col-span-1">
      <h2 className="text-xl font-semibold mb-4">Tugas Mendatang</h2>
      <div className="space-y-3">
        {data.upcomingDeadlines.map((task: any) => (
          <UpcomingTaskCard key={task.taskId} {...task} />
        ))}
        {data.upcomingDeadlines.length === 0 && (
          <p className="text-[#8B949E]">
            Tidak ada tugas mendatang. Santai dulu!
          </p>
        )}
      </div>
    </div>
  </div>
);

export default ClassroomDashboardPage;

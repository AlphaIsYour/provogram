"use client"; // <-- Ini wajib karena kita menggunakan hook

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ClipboardList, Users, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

// Simulasi mengambil detail kelas. Di aplikasi nyata, ini bisa dari fetch atau context.
const getClassDetails = async (slug: string) => {
  // Logika fetch ke API: GET /api/class/{slug}
  console.log(`Fetching details for: ${slug}`);
  // Data dummy
  return {
    name: "Belajar Next.js dari Dasar",
    description:
      "Kelas komprehensif untuk menguasai Next.js, dari App Router hingga deployment.",
    studentCount: 32,
    completionRate: 68,
  };
};

const ClassDetailLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>; // Ubah tipe params menjadi Promise
}) => {
  const pathname = usePathname();
  const [slug, setSlug] = useState<string>("");
  const [classDetails, setClassDetails] = useState({
    name: "Memuat...",
    description: "",
    studentCount: 0,
    completionRate: 0,
  });

  // Await params dalam useEffect
  useEffect(() => {
    const getSlug = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    getSlug();
  }, [params]);

  // Kita fetch data kelas di sini karena ini Client Component
  useEffect(() => {
    if (slug) {
      getClassDetails(slug).then((data) => setClassDetails(data));
    }
  }, [slug]);

  const basePath = `/classroom/class/${slug}`;
  const tabs = [
    { name: "Materi", href: basePath, icon: BookOpen },
    { name: "Tugas", href: `${basePath}/task`, icon: ClipboardList },
    { name: "Siswa", href: `${basePath}/student`, icon: Users },
  ];

  // Don't render tabs if slug is not loaded yet
  if (!slug) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-[#1F2937]/60 rounded-lg w-64 mb-3"></div>
          <div className="h-4 bg-[#1F2937]/40 rounded w-96"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ===== BREADCRUMB & BACK BUTTON ===== */}
      <div className="flex items-center gap-3">
        <Link
          href="/classroom/class"
          className="flex items-center gap-2 text-[#9CA3AF] hover:text-white transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Semua Kelas</span>
        </Link>
      </div>

      {/* ===== CLASS HEADER ===== */}
      <div className="bg-[#111827]/80 backdrop-blur-sm border border-[#1F2937]/60 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {classDetails.name}
            </h1>
            <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-2xl">
              {classDetails.description}
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {classDetails.studentCount}
              </div>
              <div className="text-xs text-[#9CA3AF]">Siswa</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#3B82F6]">
                {classDetails.completionRate}%
              </div>
              <div className="text-xs text-[#9CA3AF]">Completion</div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== TAB NAVIGATION ===== */}
      <div className="bg-[#111827]/60 backdrop-blur-sm border border-[#1F2937]/40 rounded-xl p-1">
        <nav className="flex items-center gap-1">
          {tabs.map((tab) => {
            // Halaman utama (materi) aktif jika path-nya sama persis.
            // Halaman lain aktif jika path-nya diawali dengan href tab tersebut.
            const isActive =
              tab.name === "Materi"
                ? pathname === tab.href
                : pathname.startsWith(tab.href);

            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex-1 justify-center lg:flex-initial lg:justify-start ${
                  isActive
                    ? "bg-[#1F2937] text-white shadow-sm" // Gaya untuk tab aktif
                    : "text-[#9CA3AF] hover:text-white hover:bg-[#1F2937]/60" // Gaya untuk tab non-aktif
                }`}
              >
                <tab.icon size={16} />
                <span>{tab.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ===== TAB CONTENT ===== */}
      <div className="min-h-[400px]">{children}</div>
    </div>
  );
};

export default ClassDetailLayout;

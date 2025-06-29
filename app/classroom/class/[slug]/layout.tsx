"use client"; // <-- Ini wajib karena kita menggunakan hook

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ClipboardList, Users } from "lucide-react";
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
    { name: "Tugas", href: `${basePath}/tugas`, icon: ClipboardList },
    { name: "Siswa", href: `${basePath}/siswa`, icon: Users },
  ];

  // Don't render tabs if slug is not loaded yet
  if (!slug) {
    return (
      <div className="flex flex-col h-full">
        <header className="pb-4 mb-4 border-b border-[#30363D]">
          <h1 className="text-3xl font-bold text-white">Memuat...</h1>
        </header>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* ===== CLASS HEADER ===== */}
      <header className="pb-4 mb-4 border-b border-[#30363D]">
        <h1 className="text-3xl font-bold text-white">{classDetails.name}</h1>
        <p className="text-[#8B949E] mt-1">{classDetails.description}</p>
      </header>

      {/* ===== TAB NAVIGATION ===== */}
      <nav className="flex items-center gap-4 border-b border-[#30363D]">
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
              className={`flex items-center gap-2 px-3 py-3 font-semibold border-b-2 transition-colors ${
                isActive
                  ? "text-white border-blue-500" // Gaya untuk tab aktif
                  : "text-[#8B949E] border-transparent hover:text-white hover:border-gray-500" // Gaya untuk tab non-aktif
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* ===== TAB CONTENT ===== */}
      <div className="mt-6 flex-grow">{children}</div>
    </div>
  );
};

export default ClassDetailLayout;

import {
  FileText,
  Youtube,
  Link as LinkIcon,
  ExternalLink,
  Clock,
  BookOpen,
} from "lucide-react";

// Tipe TypeScript untuk satu item materi
interface Material {
  id: string;
  type: "video" | "bacaan" | "link" | string;
  title: string;
  description: string;
  url: string;
  postedDate: string;
  duration?: string;
  isNew?: boolean;
}

// Ini adalah komponen UI kecil untuk satu item materi.
// Bisa diletakkan di file yang sama atau dipisah ke `components/`
const MaterialItem = ({ material }: { material: Material }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Youtube className="text-[#EF4444]" size={20} />;
      case "bacaan":
        return <FileText className="text-[#3B82F6]" size={20} />;
      case "link":
        return <LinkIcon className="text-[#10B981]" size={20} />;
      default:
        return <FileText className="text-[#9CA3AF]" size={20} />;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20";
      case "bacaan":
        return "bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20";
      case "link":
        return "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20";
      default:
        return "bg-[#6B7280]/10 text-[#9CA3AF] border-[#6B7280]/20";
    }
  };

  return (
    <a
      href={material.url} // Nanti ini link ke materi aslinya
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-4 bg-[#111827]/60 backdrop-blur-sm border border-[#1F2937]/60 rounded-lg hover:border-[#1F2937] hover:bg-[#111827]/80 transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-10 h-10 bg-[#1F2937]/60 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
          {getIcon(material.type)}
        </div>

        {/* Content */}
        <div className="flex-grow min-w-0 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold text-white group-hover:text-[#3B82F6] transition-colors leading-tight">
              {material.title}
            </h3>
            <div className="flex items-center gap-2 flex-shrink-0">
              {material.isNew && (
                <span className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] text-xs px-2 py-0.5 rounded-full font-medium">
                  Baru
                </span>
              )}
              <ExternalLink
                size={14}
                className="text-[#6B7280] group-hover:text-[#9CA3AF] transition-colors"
              />
            </div>
          </div>

          <p className="text-sm text-[#9CA3AF] leading-relaxed line-clamp-2">
            {material.description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`text-xs px-2 py-1 rounded-md border font-medium ${getBadgeColor(
                  material.type
                )}`}
              >
                {material.type === "video"
                  ? "Video"
                  : material.type === "bacaan"
                  ? "Bacaan"
                  : "Link"}
              </span>
              {material.duration && (
                <div className="flex items-center gap-1 text-[#6B7280]">
                  <Clock size={12} />
                  <span className="text-xs">{material.duration}</span>
                </div>
              )}
            </div>
            <span className="text-xs text-[#6B7280]">
              {material.postedDate}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

// Fungsi untuk fetch data materi dari backend
const getMaterialsForClass = async (slug: string) => {
  // Simulasi API call
  console.log(`Fetching materials for class: ${slug}`);
  return [
    {
      id: "m1",
      type: "video",
      title: "01 - Setup Project Next.js 14",
      description:
        "Konfigurasi awal project menggunakan App Router dan best practices untuk development environment.",
      url: "#",
      postedDate: "10 Jan 2024",
      duration: "12 menit",
      isNew: true,
    },
    {
      id: "m2",
      type: "bacaan",
      title: "02 - Struktur Folder di App Router",
      description:
        "Memahami page.tsx, layout.tsx, dan file conventions lainnya dalam Next.js App Router untuk struktur project yang optimal.",
      url: "#",
      postedDate: "11 Jan 2024",
    },
    {
      id: "m3",
      type: "video",
      title: "03 - Routing dan Dynamic Segments",
      description:
        "Membuat halaman dinamis berdasarkan slug atau ID dengan parameter handling yang efisien.",
      url: "#",
      postedDate: "12 Jan 2024",
      duration: "18 menit",
    },
    {
      id: "m4",
      type: "link",
      title: "Referensi: Dokumentasi Resmi Tailwind CSS",
      description:
        "Link menuju dokumentasi resmi untuk styling dan utility classes yang akan digunakan dalam project.",
      url: "https://tailwindcss.com",
      postedDate: "12 Jan 2024",
    },
  ];
};

// Komponen Halaman Utama (Server Component)
const ClassMateriPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const resolvedParams = await params;
  const materials = await getMaterialsForClass(resolvedParams.slug);

  return (
    <div className="space-y-6 mx-auto sm:px-2 lg:px-4 py-2">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Materi Pembelajaran
          </h2>
          <p className="text-sm text-[#9CA3AF] mt-1">
            {materials.length} materi tersedia untuk dipelajari
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#9CA3AF]">Urutkan:</span>
          <select className="bg-[#1F2937] border border-[#374151] rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50">
            <option>Terbaru</option>
            <option>Terlama</option>
            <option>A-Z</option>
          </select>
        </div>
      </div>

      {/* Materials Grid */}
      {materials.length > 0 ? (
        <div className="grid gap-4">
          {materials.map((material) => (
            <MaterialItem key={material.id} material={material} />
          ))}
        </div>
      ) : (
        <div className="bg-[#111827]/60 backdrop-blur-sm border border-[#1F2937]/60 rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-[#1F2937]/60 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen size={24} className="text-[#9CA3AF]" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Belum Ada Materi
          </h3>
          <p className="text-[#9CA3AF] text-sm max-w-md mx-auto">
            Materi pembelajaran untuk kelas ini belum ditambahkan. Silakan
            hubungi mentor untuk informasi lebih lanjut.
          </p>
        </div>
      )}

      {/* Progress Indicator */}
      {materials.length > 0 && (
        <div className="bg-[#111827]/60 backdrop-blur-sm border border-[#1F2937]/60 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white">
              Progress Pembelajaran
            </span>
            <span className="text-sm text-[#9CA3AF]">
              2 dari {materials.length} materi
            </span>
          </div>
          <div className="w-full bg-[#1F2937] rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(2 / materials.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassMateriPage;

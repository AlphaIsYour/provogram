import { FileText, Youtube, Link as LinkIcon } from "lucide-react";

// Tipe TypeScript untuk satu item materi
interface Material {
  id: string;
  type: "video" | "bacaan" | "link" | string;
  title: string;
  description: string;
  url: string;
  postedDate: string;
}

// Ini adalah komponen UI kecil untuk satu item materi.
// Bisa diletakkan di file yang sama atau dipisah ke `components/`
const MaterialItem = ({ material }: { material: Material }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Youtube className="text-red-500" size={24} />;
      case "bacaan":
        return <FileText className="text-blue-400" size={24} />;
      case "link":
        return <LinkIcon className="text-green-400" size={24} />;
      default:
        return <FileText className="text-[#8B949E]" size={24} />;
    }
  };

  return (
    <a
      href={material.url} // Nanti ini link ke materi aslinya
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 border-b border-[#30363D] hover:bg-[#161B22] transition-colors cursor-pointer"
    >
      <div className="flex-shrink-0 w-8 text-center">
        {getIcon(material.type)}
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-white">{material.title}</h3>
        <p className="text-sm text-[#8B949E]">{material.description}</p>
      </div>
      <div className="text-sm text-[#8B949E] flex-shrink-0">
        Diposting: {material.postedDate}
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
      description: "Konfigurasi awal project menggunakan App Router.",
      url: "#",
      postedDate: "10 Jan 2024",
    },
    {
      id: "m2",
      type: "bacaan",
      title: "02 - Struktur Folder di App Router",
      description:
        "Memahami page.tsx, layout.tsx, dan file conventions lainnya.",
      url: "#",
      postedDate: "11 Jan 2024",
    },
    {
      id: "m3",
      type: "video",
      title: "03 - Routing dan Dynamic Segments",
      description: "Membuat halaman dinamis berdasarkan slug atau ID.",
      url: "#",
      postedDate: "12 Jan 2024",
    },
    {
      id: "m4",
      type: "link",
      title: "Referensi: Dokumentasi Resmi Tailwind CSS",
      description: "Link menuju dokumentasi untuk styling.",
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
    <div className="bg-[#0D1117] rounded-lg border border-[#30363D]">
      <div className="p-4 border-b border-[#30363D]">
        <h2 className="text-xl font-semibold">Materi Pembelajaran</h2>
      </div>

      {materials.length > 0 ? (
        <div>
          {materials.map((material) => (
            <MaterialItem key={material.id} material={material} />
          ))}
        </div>
      ) : (
        <div className="p-6 text-center text-[#8B949E]">
          <p>Belum ada materi yang ditambahkan di kelas ini.</p>
        </div>
      )}
    </div>
  );
};

export default ClassMateriPage;

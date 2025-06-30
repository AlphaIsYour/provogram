import { MoreVertical, Users } from "lucide-react";

// Fungsi simulasi fetch data siswa
const getStudentsInClass = async (slug: string) => {
  console.log("Fetching students for class:", slug);
  return [
    {
      id: "s01",
      name: "Andi Pratama",
      avatar: "/avatars/andi.png",
      joinDate: "10 Jan 2024",
    },
    {
      id: "s02",
      name: "Bunga Citra",
      avatar: "/avatars/bunga.png",
      joinDate: "10 Jan 2024",
    },
    {
      id: "s03",
      name: "Charlie Darmawan",
      avatar: "/avatars/charlie.png",
      joinDate: "11 Jan 2024",
    },
    {
      id: "s04",
      name: "Dewi Lestari",
      avatar: "/avatars/dewi.png",
      joinDate: "11 Jan 2024",
    },
    {
      id: "s05",
      name: "Eko Sanjaya",
      avatar: "/avatars/eko.png",
      joinDate: "12 Jan 2024",
    },
  ];
};

const ClassStudentPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  // Await the params Promise
  const { slug } = await params;
  const students = await getStudentsInClass(slug);
  const userRole = "mentor"; // Asumsi role mentor

  return (
    <div className="min-h-screen">
      <div className="max-w-8xl mx-auto sm:px-2 lg:px-4 py-2">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-lg font-bold text-white">Daftar Siswa</h1>
          <p className="text-sm text-slate-400 mt-1 flex items-center gap-1.5">
            <Users size={14} />
            <span>{students.length} siswa terdaftar</span>
          </p>
        </div>

        {/* Students List */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden">
          <div className="divide-y divide-slate-800">
            {students.map((student) => (
              <div
                key={student.id}
                className="group relative p-4 sm:p-5 hover:bg-slate-800/30 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  {/* Student Info */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Avatar Placeholder */}
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-slate-300 font-medium text-sm">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                    </div>

                    {/* Student Details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm group-hover:text-slate-100 transition-colors duration-200">
                        {student.name}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Bergabung pada {student.joinDate}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  {userRole === "mentor" && (
                    <button className="flex items-center justify-center w-8 h-8 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors duration-200">
                      <MoreVertical size={16} />
                      {/* Di sini bisa trigger dropdown menu: "Lihat Progress", "Keluarkan dari Kelas", dll */}
                    </button>
                  )}
                </div>

                {/* Hover indicator */}
                <div className="absolute inset-y-0 left-0 w-0.5 bg-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassStudentPage;

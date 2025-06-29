import { MoreVertical } from "lucide-react";

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

const ClassStudentPage = async ({ params }: { params: { slug: string } }) => {
  const students = await getStudentsInClass(params.slug);
  const userRole = "mentor"; // Asumsi role mentor

  return (
    <div className="bg-[#0D1117]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Daftar Siswa ({students.length})
        </h2>
      </div>

      <div className="border border-[#30363D] rounded-lg">
        {students.map((student, index) => (
          <div
            key={student.id}
            className={`flex items-center justify-between p-4 ${
              index < students.length - 1 ? "border-b border-[#30363D]" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              {/* <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full" /> */}
              <div>
                <p className="font-semibold text-white">{student.name}</p>
                <p className="text-sm text-[#8B949E]">
                  Bergabung pada {student.joinDate}
                </p>
              </div>
            </div>
            {userRole === "mentor" && (
              <button className="text-[#8B949E] hover:text-white p-2 rounded-full hover:bg-[#21262D]">
                <MoreVertical size={20} />
                {/* Di sini bisa trigger dropdown menu: "Lihat Progress", "Keluarkan dari Kelas", dll */}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassStudentPage;

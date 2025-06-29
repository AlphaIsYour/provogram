import { Home, Calendar, ListTodo, GraduationCap } from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/components/layout/Navbar";

// Asumsi: Kamu punya komponen <UserAvatar> untuk menampilkan foto profil user
// import UserAvatar from '@/components/ui/UserAvatar';

// Asumsi: Kamu punya hook untuk mendapatkan data user
// import { useUser } from '@/hooks/useUser';

const ClassroomLayout = ({ children }: { children: React.ReactNode }) => {
  // const { user } = useUser(); // Nanti ambil data user di sini

  return (
    <>
      <Navbar />
      <div
        className="flex h-screen bg-[#0D1117] text-[#C9D1D9]"
        style={{ fontFamily: "mona-sans" }}
      >
        {/* ===== SIDEBAR ===== */}
        <aside className="w-64 flex-shrink-0 border-r border-[#30363D] bg-[#161B22] p-4 flex flex-col">
          <div className="mb-8">
            <h2 className="text-xl font-bold">Classroom</h2>
          </div>
          <nav className="flex-grow">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/classroom"
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-[#21262D]"
                >
                  <Home size={20} />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/classroom/calendar"
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-[#21262D]"
                >
                  <Calendar size={20} />
                  <span>Kalender</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/classroom/todo"
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-[#21262D]"
                >
                  <ListTodo size={20} />
                  <span>To-Do List</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/classroom/class"
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-[#21262D]"
                >
                  <GraduationCap size={20} />
                  <span>Semua Kelas</span>
                </Link>
              </li>
            </ul>
          </nav>
          {/* User Profile di bawah sidebar */}
          <div className="mt-auto">
            <div className="flex items-center gap-3 p-2 border-t border-[#30363D] pt-4">
              {/* <UserAvatar src={user.avatarUrl} /> */}
              <div>
                <p className="font-semibold">Nama User</p>
                <p className="text-sm text-[#8B949E]">user.role</p>{" "}
                {/* 'Mentor' atau 'Siswa' */}
              </div>
            </div>
          </div>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </>
  );
};

export default ClassroomLayout;

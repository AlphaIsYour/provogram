import { Home, Calendar, ListTodo } from "lucide-react";
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
        className="flex min-h-screen bg-[#0A0E16] text-[#E5E7EB]"
        style={{ fontFamily: "mona-sans" }}
      >
        {/* ===== SIDEBAR ===== */}
        <aside className="w-56 flex-shrink-0 border-r border-[#1F2937]/60 bg-[#111827]/80 backdrop-blur-sm h-screen sticky top-[9vh]">
          <div className="p-5 border-b border-[#1F2937]/40">
            <h2 className="text-lg font-semibold text-white tracking-tight">
              Classroom
            </h2>
          </div>

          <nav className="p-4">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/classroom"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-[#1F2937]/60 transition-all duration-200 group"
                >
                  <Home
                    size={18}
                    className="text-[#9CA3AF] group-hover:text-white transition-colors"
                  />
                  <span className="font-medium group-hover:text-white transition-colors">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/classroom/calendar"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-[#1F2937]/60 transition-all duration-200 group"
                >
                  <Calendar
                    size={18}
                    className="text-[#9CA3AF] group-hover:text-white transition-colors"
                  />
                  <span className="font-medium group-hover:text-white transition-colors">
                    Calendar
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/classroom/todo"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-[#1F2937]/60 transition-all duration-200 group"
                >
                  <ListTodo
                    size={18}
                    className="text-[#9CA3AF] group-hover:text-white transition-colors"
                  />
                  <span className="font-medium group-hover:text-white transition-colors">
                    To-Do List
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* User Profile di bawah sidebar */}
          <div className="mt-auto p-4 border-t border-[#1F2937]/40">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#1F2937]/40">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] flex items-center justify-center">
                <span className="text-sm font-semibold text-white">NU</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white text-sm truncate">
                  Nama User
                </p>
                <p className="text-xs text-[#9CA3AF] truncate">user.role</p>
              </div>
            </div>
          </div>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <main className="flex-1 bg-gradient-to-br from-[#0F172A] to-[#0A0E16] overflow-y-auto">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </>
  );
};

export default ClassroomLayout;

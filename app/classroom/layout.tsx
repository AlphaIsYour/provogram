/* eslint-disable @typescript-eslint/no-explicit-any */
// app/classroom/layout.tsx

import { Home, Calendar, ListTodo } from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/components/layout/Navbar";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Image from "next/image";

// Komponen Sidebar terpisah agar kode lebih rapi
const ClassroomSidebar = ({ user }: { user: any }) => (
  <aside className="w-56 flex-shrink-0 border-r border-[#1F2937]/60 bg-[#111827]/80 backdrop-blur-sm h-screen sticky top-0 pt-[9vh]">
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
            <Home size={18} className="text-[#9CA3AF] group-hover:text-white" />
            <span className="font-medium group-hover:text-white">Home</span>
          </Link>
        </li>
        <li>
          <Link
            href="/classroom/calendar"
            className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-[#1F2937]/60 transition-all duration-200 group"
          >
            <Calendar
              size={18}
              className="text-[#9CA3AF] group-hover:text-white"
            />
            <span className="font-medium group-hover:text-white">Calendar</span>
          </Link>
        </li>
        <li>
          <Link
            href="/classroom/todo"
            className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-[#1F2937]/60 transition-all duration-200 group"
          >
            <ListTodo
              size={18}
              className="text-[#9CA3AF] group-hover:text-white"
            />
            <span className="font-medium group-hover:text-white">
              To-Do List
            </span>
          </Link>
        </li>
      </ul>
    </nav>
    <div className="absolute bottom-0 w-full p-4 border-t border-[#1F2937]/40">
      <div className="flex items-center gap-3 p-3 rounded-lg bg-[#1F2937]/40">
        <Image
          src={user.image || "/default-avatar.png"}
          alt={user.name || "User"}
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-white text-sm truncate">{user.name}</p>
          <p className="text-xs text-[#9CA3AF] truncate capitalize">
            {user.role.toLowerCase()}
          </p>
        </div>
      </div>
    </div>
  </aside>
);

export default async function ClassroomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user
    ? await prisma.user.findUnique({ where: { id: session.user.id } })
    : null;

  // === INI LOGIKA KUNCINYA ===
  // Tentukan apakah sidebar harus ditampilkan berdasarkan role user
  const showSidebar =
    user &&
    (user.role === "STUDENT" ||
      user.role === "MENTOR" ||
      user.role === "ADMIN" ||
      user.role === "SUPERADMIN");

  return (
    <>
      <Navbar />
      <div
        className="flex min-h-screen bg-[#0A0E16] text-[#E5E7EB]"
        style={{ fontFamily: "mona-sans" }}
      >
        {/* Tampilkan Sidebar hanya jika showSidebar bernilai true */}
        {showSidebar && user && <ClassroomSidebar user={user} />}

        {/* ===== MAIN CONTENT ===== */}
        {/* Jika tidak ada sidebar, main content akan mengambil seluruh lebar */}
        <main className="flex-1 bg-gradient-to-br from-[#0F172A] to-[#0A0E16] overflow-y-auto">
          {/* Beri padding top yang sama dengan tinggi navbar agar konten tidak tertutup */}
          <div className="pt-[9vh]">
            <div className="p-6 lg:p-8 max-w-7xl mx-auto">{children}</div>
          </div>
        </main>
      </div>
    </>
  );
}

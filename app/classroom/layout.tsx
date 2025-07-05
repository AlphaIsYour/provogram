/* eslint-disable @typescript-eslint/no-explicit-any */
// app/classroom/layout.tsx

import { Home, Calendar, ListTodo, Settings, User } from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/components/layout/Navbar";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Image from "next/image";

// Install: npm install @radix-ui/react-tooltip
// Import Radix UI Tooltip
import * as Tooltip from "@radix-ui/react-tooltip";

// Komponen Sidebar dengan Radix UI Tooltip
const ClassroomSidebar = ({ user }: { user: any }) => {
  return (
    <Tooltip.Provider delayDuration={300}>
      <aside className="w-56 flex-shrink-0 border-r border-[#1F2937]/60 bg-[#111827]/80 backdrop-blur-sm h-screen fixed top-0 left-0 z-10 flex flex-col">
        {/* Spacer untuk navbar */}
        <div className="h-16"></div>

        <div className="p-5 border-b border-[#1F2937]/40">
          <h2 className="text-lg font-semibold text-white tracking-tight">
            Classroom
          </h2>
        </div>

        {/* Navigation dengan Radix UI Tooltip */}
        <nav className="p-4 flex-1">
          <ul className="space-y-1">
            <li>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Link
                    href="/classroom"
                    className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-[#1F2937]/60 transition-all duration-200 group"
                  >
                    <Home
                      size={18}
                      className="text-[#9CA3AF] group-hover:text-white"
                    />
                    <span className="font-medium group-hover:text-white">
                      Home
                    </span>
                  </Link>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-[#374151] text-white px-3 py-2 rounded-md text-xs font-medium shadow-lg border border-[#4B5563] z-50"
                    sideOffset={8}
                    side="right"
                  >
                    Dashboard utama classroom
                    <Tooltip.Arrow className="fill-[#374151]" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </li>

            <li>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Link
                    href="/classroom/calendar"
                    className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-[#1F2937]/60 transition-all duration-200 group"
                  >
                    <Calendar
                      size={18}
                      className="text-[#9CA3AF] group-hover:text-white"
                    />
                    <span className="font-medium group-hover:text-white">
                      Calendar
                    </span>
                  </Link>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-[#374151] text-white px-3 py-2 rounded-md text-xs font-medium shadow-lg border border-[#4B5563] z-50"
                    sideOffset={8}
                    side="right"
                  >
                    Jadwal kelas dan tugas
                    <Tooltip.Arrow className="fill-[#374151]" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </li>

            <li>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
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
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-[#374151] text-white px-3 py-2 rounded-md text-xs font-medium shadow-lg border border-[#4B5563] z-50"
                    sideOffset={8}
                    side="right"
                  >
                    Daftar tugas yang harus diselesaikan
                    <Tooltip.Arrow className="fill-[#374151]" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </li>
          </ul>
        </nav>

        {/* User info dengan popup menu dan tooltip */}
        <div className="p-4 border-t border-[#1F2937]/40 relative">
          <div className="group">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#1F2937]/40 hover:bg-[#1F2937]/60 transition-all duration-200 cursor-pointer">
              <Image
                src={user.image || "/default-avatar.png"}
                alt={user.name || "User"}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white text-sm truncate">
                  {user.name}
                </p>
                <p className="text-xs text-[#9CA3AF] truncate capitalize">
                  {user.role.toLowerCase()}
                </p>
              </div>
            </div>

            {/* Popup Menu tetap menggunakan CSS karena sudah bagus */}
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-[#1F2937] border border-[#374151] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-800 z-50">
              <div className="p-2">
                <Link
                  href={`/${user.username || user.id}`}
                  className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-[#374151] transition-all duration-200 group/item"
                >
                  <User
                    size={16}
                    className="text-[#9CA3AF] group-hover/item:text-white"
                  />
                  <span className="font-medium text-white group-hover/item:text-blue-300">
                    View Profile
                  </span>
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-[#374151] transition-all duration-200 group/item"
                >
                  <Settings
                    size={16}
                    className="text-[#9CA3AF] group-hover/item:text-white"
                  />
                  <span className="font-medium text-white group-hover/item:text-blue-300">
                    Settings
                  </span>
                </Link>
              </div>
              {/* Arrow pointer */}
              <div className="absolute w-2 h-2 top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1F2937]"></div>
            </div>
          </div>
        </div>
      </aside>
    </Tooltip.Provider>
  );
};

export default async function ClassroomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user
    ? await prisma.user.findUnique({ where: { id: session.user.id } })
    : null;

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
        {showSidebar && user && <ClassroomSidebar user={user} />}

        <main
          className={`flex-1 bg-gradient-to-br from-[#0F172A] to-[#0A0E16] overflow-y-auto ${
            showSidebar ? "ml-56" : ""
          }`}
        >
          <div className="pt-[9vh]">
            <div className="p-6 lg:p-8 max-w-7xl mx-auto">{children}</div>
          </div>
        </main>
      </div>
    </>
  );
}

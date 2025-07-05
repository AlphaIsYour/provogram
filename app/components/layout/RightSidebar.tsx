// app/components/layout/RightSidebar.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Book,
  User,
  LayoutGrid,
  Star,
  Github,
  Settings,
  LogOut,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import CompleteProfileModal from "./CompleteProfileModal";
import { completeUserProfile } from "@/app/actions/UserActions";

// Add interface for props
interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavItem = ({
  icon,
  children,
  href = "#",
  onClick,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) => (
  <Link
    href={href}
    className="flex items-center gap-3 w-full py-2 px-2.5 rounded-md hover:bg-gray-800 transition-colors"
    onClick={onClick}
  >
    {icon && <div className="w-5 flex justify-center">{icon}</div>}
    <span className="font-medium text-gray-300 text-sm">{children}</span>
  </Link>
);

const RightSidebar: React.FC<RightSidebarProps> = ({ isOpen, onClose }) => {
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter();

  // State untuk mengontrol modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const handleProfileClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Cek apakah user sudah punya username
    if (session?.user?.username) {
      // Jika sudah punya, biarkan Link berjalan normal dan tutup sidebar
      onClose();
    } else {
      // Jika tidak punya, cegah Link berjalan dan buka modal
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  const handleSaveProfile = async (username: string) => {
    const result = await completeUserProfile(username);
    if (result.success) {
      // Jika sukses, update sesi dan redirect
      await updateSession({ user: { username } }); // Update sesi di client
      setIsModalOpen(false);
      onClose(); // Tutup sidebar
      router.push(`/${username}`); // Arahkan ke halaman profil baru
    }
    return result;
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const isLoading = status === "loading";

  return (
    <>
      {/* Sidebar Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Sidebar Content */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#000] text-white p-2.5 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } rounded-tl-xl rounded-bl-xl border-l border-gray-700 flex flex-col`}
      >
        <div className="flex justify-between items-center mb-4 flex-shrink-0 px-2.5">
          <div
            className={`flex items-center gap-3 ${
              isLoading ? "animate-pulse" : ""
            }`}
          >
            <Image
              src={
                !isLoading && session?.user?.image
                  ? session.user.image
                  : "/posts/22.png"
              } // Ambil gambar dari sesi
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full flex-shrink-0 bg-gray-700"
            />
            <div>
              <p className="font-bold text-white leading-tight">
                {isLoading ? "Loading..." : session?.user?.name || "Guest"}
              </p>
              <p className="text-sm text-gray-400 leading-tight">
                {isLoading
                  ? "..."
                  : session?.user?.username
                  ? `@${session.user.username}`
                  : "Provogram"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-800"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Main Content (Scrollable) */}
        <div className="flex-grow overflow-y-auto pr-1 -mr-1">
          {/* Status Placeholder (tidak berubah) */}
          <div className="px-2.5 mb-3">
            <button className="w-full text-left border border-gray-700 rounded-md px-3 py-1.5 hover:border-gray-500 transition-colors">
              <span className="text-xl mr-2">📖</span>
              <span className="text-sm text-gray-300">Learning</span>
            </button>
          </div>

          <nav className="flex flex-col gap-0.5 px-1.5">
            {/* Profile Navigation */}
            {status === "authenticated" && (
              <NavItem
                icon={<User size={16} className="text-gray-400" />}
                href={
                  session?.user?.username ? `/${session.user.username}` : "#"
                } // Arahkan ke # jika username kosong
                onClick={handleProfileClick} // Gunakan handler custom
              >
                Your profile
              </NavItem>
            )}

            <NavItem
              icon={<Book size={16} className="text-gray-400" />}
              href="/classroom"
              onClick={onClose}
            >
              Classroom
            </NavItem>
            <NavItem
              icon={<Trophy size={16} className="text-gray-400" />}
              href="/leaderboard"
              onClick={onClose}
            >
              Leaderboard
            </NavItem>
            <NavItem icon={<LayoutGrid size={16} className="text-gray-400" />}>
              Your projects
            </NavItem>
            <NavItem icon={<Star size={16} className="text-gray-400" />}>
              Your stars
            </NavItem>
            <NavItem icon={<Github size={16} className="text-gray-400" />}>
              Your Github
            </NavItem>
          </nav>

          <hr className="border-gray-800 my-2" />

          {/* Sisa navigasi bisa kamu kustomisasi */}
          <nav className="flex flex-col gap-0.5 px-1.5">
            <NavItem icon={<Settings size={16} className="text-gray-400" />}>
              Settings
            </NavItem>
          </nav>
        </div>

        <div className="mt-auto pt-2 border-t border-gray-800 flex-shrink-0 px-1.5">
          {/* Tampilkan tombol logout hanya jika user sudah login */}
          {status === "authenticated" && (
            <button
              onClick={() => signOut({ callbackUrl: "/" })} // Arahkan ke /login setelah logout
              className="flex items-center gap-3 w-full text-left py-2 px-2.5 rounded-md hover:bg-gray-800 transition-colors"
            >
              <div className="w-5 flex justify-center">
                <LogOut size={16} className="text-gray-400" />
              </div>
              <span className="font-medium text-gray-300 text-sm">
                Sign out
              </span>
            </button>
          )}
        </div>
      </div>

      {/* MODAL UNTUK MELENGKAPI PROFIL - SEKARANG DI LUAR SIDEBAR */}
      <CompleteProfileModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveProfile}
      />
    </>
  );
};

export default RightSidebar;

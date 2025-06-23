"use client";

import React, { useEffect } from "react";
import {
  X,
  Book,
  User,
  Github,
  LayoutGrid,
  Star,
  FileText,
  Building,
  Briefcase,
  Heart,
  Rocket,
  Settings,
  Globe,
  LifeBuoy,
  Users,
  LogOut,
} from "lucide-react";
import Link from "next/link";

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Komponen kecil untuk setiap item navigasi agar kode lebih rapi
const NavItem = ({
  icon,
  children,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Link
    href="#"
    className="flex items-center gap-3 w-full py-2 px-2.5 rounded-md hover:bg-gray-800 transition-colors"
  >
    {icon && <div className="w-5 flex justify-center">{icon}</div>}
    <span className="font-medium text-gray-300 text-sm">{children}</span>
  </Link>
);

const RightSidebar: React.FC<RightSidebarProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    // Efek ini sudah bagus, tidak perlu diubah
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
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
        {/* Header */}
        {/* Header */}
        <div className="flex justify-between items-center mb-4 flex-shrink-0 px-2.5">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex-shrink-0"></div>
            <div>
              <p className="font-bold text-white leading-tight">Yoralph</p>
              <p className="text-sm text-gray-400 leading-tight">Provogram</p>
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
          {/* Status Placeholder */}
          <div className="px-2.5 mb-3">
            <button className="w-full text-left border border-gray-700 rounded-md px-3 py-1.5 hover:border-gray-500 transition-colors">
              <span className="text-xl mr-2">📖</span>
              <span className="text-sm text-gray-300">Learning</span>
            </button>
          </div>

          {/* User-specific links */}
          <nav className="flex flex-col gap-0.5 px-1.5">
            <NavItem icon={<User size={16} className="text-gray-400" />}>
              Your profile
            </NavItem>
            <NavItem icon={<Book size={16} className="text-gray-400" />}>
              Your repositories
            </NavItem>
            <NavItem icon={<Github size={16} className="text-gray-400" />}>
              Your Copilot
            </NavItem>
            <NavItem icon={<LayoutGrid size={16} className="text-gray-400" />}>
              Your projects
            </NavItem>
            <NavItem icon={<Star size={16} className="text-gray-400" />}>
              Your stars
            </NavItem>
            <NavItem icon={<FileText size={16} className="text-gray-400" />}>
              Your gists
            </NavItem>
          </nav>

          <hr className="border-gray-800 my-2" />

          <nav className="flex flex-col gap-0.5 px-1.5">
            <NavItem icon={<Building size={16} className="text-gray-400" />}>
              Your organizations
            </NavItem>
            <NavItem icon={<Briefcase size={16} className="text-gray-400" />}>
              Your enterprises
            </NavItem>
            <NavItem icon={<Heart size={16} className="text-gray-400" />}>
              Your sponsors
            </NavItem>
          </nav>

          <hr className="border-gray-800 my-2" />

          {/* General links */}
          <nav className="flex flex-col gap-0.5 px-1.5">
            <NavItem icon={<Rocket size={16} className="text-gray-400" />}>
              Try Enterprise
            </NavItem>
            <NavItem icon={<User size={16} className="text-gray-400" />}>
              Feature preview
            </NavItem>
            <NavItem icon={<Settings size={16} className="text-gray-400" />}>
              Settings
            </NavItem>
          </nav>

          <hr className="border-gray-800 my-2" />

          {/* Provoks links */}
          <nav className="flex flex-col gap-0.5 px-1.5">
            <NavItem icon={<Globe size={16} className="text-gray-400" />}>
              Provoks Website
            </NavItem>
            <NavItem icon={<Book size={16} className="text-gray-400" />}>
              Provoks Docs
            </NavItem>
            <NavItem icon={<LifeBuoy size={16} className="text-gray-400" />}>
              Provoks Support
            </NavItem>
            <NavItem icon={<Users size={16} className="text-gray-400" />}>
              Provoks Community
            </NavItem>
          </nav>
        </div>

        {/* Footer (Sign Out) */}
        <div className="mt-auto pt-2 border-t border-gray-800 flex-shrink-0 px-1.5">
          <NavItem icon={<LogOut size={16} className="text-gray-400" />}>
            Sign out
          </NavItem>
        </div>
      </div>
    </>
  );
};

export default RightSidebar;

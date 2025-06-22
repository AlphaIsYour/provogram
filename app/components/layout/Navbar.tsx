/* eslint-disable @typescript-eslint/no-unused-vars */
// components/layout/Navbar.tsx
"use client";

import React, { useState } from "react";
import { Menu, Bell, User, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import LeftSidebar from "@/app/components/layout/LeftSidebar";
import RightSidebar from "@/app/components/layout/RightSidebar";
import SearchModal from "@/app/components/layout/SearchModal";
import NotificationDropdown from "@/app/components/layout/NotificationDropdown";

const Navbar = () => {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);

  return (
    <>
      <nav className="bg-black text-white h-18 flex items-center justify-between px-2 md:px-6 sticky top-0 z-30 border-b border-b-gray-700">
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setLeftSidebarOpen(true)}
            className="p-1 rounded-md hover:bg-gray-900 border border-radius-50 border-gray-600"
          >
            <Menu size={24} className="text-gray-500" />
          </button>
          <Link href="/" className="flex items-center gap-[3px]">
            <Image
              width={58}
              height={58}
              src="/icon.png"
              alt="Logo"
              className="rounded-full object-cover"
            />
            <span className="text-l font-bold hidden md:block">Dashboard</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center gap-2 bg-black border border-gray-700 px-3 py-1.5 rounded-md text-gray-400 w-40 md:w-64"
          >
            <Search size={22} />
            <span className="text-sm">Search...</span>
          </button>
          <div className="relative">
            <button
              className="p-1 rounded-md border border-gray-700 hover:bg-gray-900"
              onClick={() => setNotificationOpen(!isNotificationOpen)}
            >
              <Bell size={24} className="text-gray-600" />
            </button>
            {isNotificationOpen && (
              <NotificationDropdown
                onClose={() => setNotificationOpen(false)}
              />
            )}
          </div>
          <button
            onClick={() => setRightSidebarOpen(true)}
            className="p-1 rounded-full"
          >
            <div className="w-10 h-10 bg-teal-500 rounded-full"></div>
          </button>
        </div>
      </nav>

      {/* Render komponen berdasarkan state */}
      <LeftSidebar
        isOpen={isLeftSidebarOpen}
        onClose={() => setLeftSidebarOpen(false)}
      />
      <RightSidebar
        isOpen={isRightSidebarOpen}
        onClose={() => setRightSidebarOpen(false)}
      />
      {isSearchModalOpen && (
        <SearchModal onClose={() => setSearchModalOpen(false)} />
      )}
    </>
  );
};

export default Navbar;

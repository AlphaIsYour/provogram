/* eslint-disable @typescript-eslint/no-unused-vars */
// components/layout/Navbar.tsx
"use client";

import React, { useState } from "react";
import { Menu, User, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import LeftSidebar from "@/app/components/layout/LeftSidebar";
import RightSidebar from "@/app/components/layout/RightSidebar";
import SearchModal from "@/app/components/layout/SearchModal";
import NotificationDropdown from "@/app/components/layout/NotificationDropdown";

// Impor ikon kustom Anda
import InboxIcon from "@/app/components/icons/InboxIcon";

// Profile tabs data
const profileTabs = [
  { name: "Overview", href: "" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Education", href: "/education" },
  { name: "Achievements", href: "/achievements" },
  { name: "Certs", href: "/certs" },
  { name: "Contact", href: "/contact" },
  { name: "Setting", href: "/setting" },
];

const Navbar = () => {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);

  const pathname = usePathname();

  // Check if we're on a profile page (pattern: /username atau /username/tab)
  const isProfilePage = () => {
    const pathSegments = pathname.split("/").filter(Boolean);
    // Profile page jika ada 1 segment (username) atau 2 segments (username + tab)
    // Dan bukan route khusus seperti /dashboard, /settings, dll
    if (pathSegments.length >= 1 && pathSegments.length <= 2) {
      const specialRoutes = [
        "dashboard",
        "settings",
        "notifications",
        "search",
        "classroom",
      ];
      return !specialRoutes.includes(pathSegments[0]);
    }
    return false;
  };

  // Get current username from path
  const getCurrentUsername = () => {
    const pathSegments = pathname.split("/").filter(Boolean);
    return pathSegments[0] || "";
  };

  // Get current tab from path
  const getCurrentTab = () => {
    const pathSegments = pathname.split("/").filter(Boolean);
    return pathSegments[1] || "";
  };

  return (
    <>
      <nav className="bg-black text-white sticky top-0 z-30 border-b border-b-gray-700">
        {/* Main navbar */}
        <div className="h-16 flex items-center justify-between px-2 md:px-6">
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setLeftSidebarOpen(true)}
              className="p-1.5 rounded-md hover:bg-gray-900 border border-radius-50 border-gray-600"
            >
              <Menu size={18} className="text-gray-400" />
            </button>
            <Link href="/" className="flex items-center gap-[3px]">
              <Image
                width={54}
                height={54}
                src="/icon.png"
                alt="Logo"
                className="rounded-full object-cover"
              />
              <span className="text-gray-200 text-[14px] font-semibold hidden md:block">
                Dashboard
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2 bg-black border border-gray-700 px-3 py-1.5 rounded-md text-gray-400 w-40 md:w-64"
            >
              <Search size={20} />
              <span className="text-sm">Search...</span>
            </button>
            <div className="relative">
              <button
                className="p-2 rounded-md border border-gray-600 hover:bg-gray-900"
                onClick={() => setNotificationOpen(!isNotificationOpen)}
              >
                <InboxIcon size={16} className="text-gray-400" />
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
              <div className="w-9 h-9 bg-yellow-500 rounded-full"></div>
            </button>
          </div>
        </div>

        {/* Profile tabs - hanya muncul di halaman profile */}
        {isProfilePage() && (
          <div>
            <div className="px-2 md:px-6">
              <div className="flex items-center gap-0 overflow-x-auto">
                {profileTabs.map((tab) => {
                  const username = getCurrentUsername();
                  const currentTab = getCurrentTab();
                  const isActive =
                    (tab.href === "" && currentTab === "") ||
                    (tab.href !== "" && currentTab === tab.href.slice(1));

                  return (
                    <Link
                      key={tab.name}
                      href={`/${username}${tab.href}`}
                      className={`
                        px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap
                        ${
                          isActive
                            ? "border-orange-500 text-white"
                            : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600"
                        }
                      `}
                    >
                      {tab.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Sidebars dan Modals */}
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

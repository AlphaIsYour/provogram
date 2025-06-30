// components/layout/NotificationDropdown.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { GitBranch, MessageSquare, UserPlus } from "lucide-react";
import Link from "next/link";
interface NotificationDropdownProps {
  onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  onClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 w-80 bg-[#131313] rounded-lg border border-gray-700 shadow-2xl z-50 overflow-hidden origin-top-right transition-all duration-200 ease-in-out"
    >
      <div className="p-3 border-b border-gray-700">
        <h3 className="font-semibold text-white">Notifikasi</h3>
      </div>
      <div className="flex flex-col">
        {/* Contoh Notifikasi 1 */}
        <div className="flex items-start gap-3 p-3 hover:bg-gray-700/50 cursor-pointer">
          <UserPlus className="text-sky-500 mt-1" size={20} />
          <div>
            <p className="text-white text-sm">
              <span className="font-bold">Andi</span> baru saja mendaftar.
              Sambut dia!
            </p>
            <p className="text-gray-400 text-xs mt-1">5 menit yang lalu</p>
          </div>
        </div>

        {/* Contoh Notifikasi 2 */}
        <div className="flex items-start gap-3 p-3 hover:bg-gray-700/50 cursor-pointer border-t border-gray-700">
          <GitBranch className="text-green-500 mt-1" size={20} />
          <div>
            <p className="text-white text-sm">
              Proyekmu{" "}
              <span className="font-bold">&quot;Image Generator&quot;</span>{" "}
              telah disetujui.
            </p>
            <p className="text-gray-400 text-xs mt-1">1 jam yang lalu</p>
          </div>
        </div>

        {/* Contoh Notifikasi 3 */}
        <div className="flex items-start gap-3 p-3 hover:bg-gray-700/50 cursor-pointer border-t border-gray-700">
          <MessageSquare className="text-yellow-500 mt-1" size={20} />
          <div>
            <p className="text-white text-sm">
              <span className="font-bold">Budi</span> berkomentar di proyekmu.
            </p>
            <p className="text-gray-400 text-xs mt-1">3 jam yang lalu</p>
          </div>
        </div>
      </div>
      <div className="p-2 text-center border-t border-gray-700">
        <Link
          href="/notifikasi"
          className="text-sm text-sky-400 hover:underline"
        >
          Lihat Semua Notifikasi
        </Link>
      </div>
    </div>
  );
};

export default NotificationDropdown;

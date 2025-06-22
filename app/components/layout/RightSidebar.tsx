// components/layout/RightSidebar.tsx
"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ isOpen, onClose }) => {
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
        className={`fixed top-0 mt-1 right-0 h-full w-80 bg-[#000] text-white p-4 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } rounded-tl-xl rounded-bl-xl border-l border-gray-700`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Profile</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-700/50"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>
        {/* Konten sidebar nanti di sini */}
        <p className="text-gray-400">
          Ini adalah sidebar kanan. Kosong untuk saat ini.
        </p>
      </div>
    </>
  );
};

export default RightSidebar;

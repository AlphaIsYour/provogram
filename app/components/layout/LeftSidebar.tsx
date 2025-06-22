// components/layout/LeftSidebar.tsx
import React from "react";
import { X } from "lucide-react";

interface LeftSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Sidebar Content */}
      <div
        className={`fixed top-0 mt-1 left-0 h-full w-88 bg-[#000] text-white p-4 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } rounded-tr-xl rounded-br-xl border-r border-gray-700`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-900"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>
        <p>Ini adalah sidebar kiri. Kosong untuk saat ini.</p>
      </div>
    </>
  );
};

export default LeftSidebar;

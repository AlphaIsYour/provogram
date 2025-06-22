// components/layout/SearchModal.tsx
import React, { useEffect, useRef } from "react";
import { Search } from "lucide-react";

interface SearchModalProps {
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center pt-2">
      <div
        ref={modalRef}
        className="bg-[#000] w-full max-w-6xl h-fit rounded-xl shadow-2xl border border-gray-800"
      >
        <div className="p-3">
          <div
            className="flex items-center gap-3 w-full bg-[#181818] p-3 rounded-lg border border-gray-700 
                       transition-colors duration-200 
                       focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400/50"
          >
            <Search className="text-gray-500 flex-shrink-0" size={20} />
            <input
              type="text"
              placeholder="Search for projects, users, or features..."
              autoFocus
              className="w-full bg-transparent text-lg text-gray-200 placeholder-gray-700 focus:outline-none"
            />
          </div>
        </div>

        <div className="border-b border-gray-800"></div>

        {/* History Pencarian */}
        <div className="p-4">
          <p className="text-sm text-gray-400">
            History pencarian akan muncul di sini.
          </p>
          {/* Nanti di sini kita map data history */}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;

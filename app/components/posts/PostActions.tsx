// app/components/posts/PostActions.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { Star, MoreHorizontal, Bookmark, Share2 } from "lucide-react";

export default function PostActions() {
  const [isStarred, setIsStarred] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    // Wrapper utama dengan border dan rounding
    <div className="flex items-center rounded-lg">
      {/* Tombol Star, sekarang menjadi flex container */}
      <button
        onClick={() => setIsStarred(!isStarred)}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 bg-gray-900 hover:bg-gray-800 transition-colors rounded-l-md cursor-pointer"
      >
        <Star
          size={18}
          className={`sm:w-[22px] sm:h-[22px] transition-colors ${
            isStarred ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
          }`}
        />
        <span className="text-xs sm:text-sm font-medium text-gray-300 hidden xs:inline">
          Star
        </span>
      </button>

      {/* Garis pemisah vertikal yang full-height */}
      <div className="w-px self-stretch bg-gray-700"></div>

      {/* Tombol More Options */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="p-1.5 bg-gray-900 hover:bg-gray-800 transition-colors rounded-r-md cursor-pointer"
        >
          <MoreHorizontal
            size={18}
            className="sm:w-[22px] sm:h-[22px] text-gray-400"
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-40 sm:w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
            <a
              href="#"
              className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-300 hover:bg-gray-700"
            >
              <Bookmark size={14} className="sm:w-4 sm:h-4" />
              <span className="truncate">Add to Bookmarks</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-300 hover:bg-gray-700"
            >
              <Share2 size={14} className="sm:w-4 sm:h-4" />
              <span className="truncate">Share Post</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

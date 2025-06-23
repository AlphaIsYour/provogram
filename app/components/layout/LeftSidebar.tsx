import React from "react";
import {
  X,
  Home,
  MessageSquare,
  GitPullRequest,
  LayoutGrid,
  MessageCircle,
  Terminal,
  Github,
  Compass,
  Store,
  Book,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface LeftSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Komponen kecil untuk setiap item navigasi agar kode lebih rapi
const NavItem = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Link
    href="#"
    className="flex items-center gap-4 py-2 px-3 rounded-md hover:bg-gray-800 transition-colors"
  >
    {icon}
    <span className="font-medium text-gray-300">{children}</span>
  </Link>
);

const LeftSidebar: React.FC<LeftSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Sidebar Content */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-[#000] text-white p-4 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } rounded-tr-xl rounded-br-xl border-r border-gray-700 flex flex-col`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <Image
            src="/icon.png"
            alt="Logo"
            width={58}
            height={58}
            className="rounded"
          />
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-800"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Main Content (Scrollable) */}
        <div className="flex-grow overflow-y-auto pr-2 -mr-2">
          {/* Main Navigation */}
          <nav className="flex flex-col gap-1">
            <NavItem icon={<Home size={20} className="text-gray-400" />}>
              Home
            </NavItem>
            <NavItem
              icon={<MessageSquare size={20} className="text-gray-400" />}
            >
              Issues
            </NavItem>
            <NavItem
              icon={<GitPullRequest size={20} className="text-gray-400" />}
            >
              Pull Requests
            </NavItem>
            <NavItem icon={<LayoutGrid size={20} className="text-gray-400" />}>
              Projects
            </NavItem>
            <NavItem
              icon={<MessageCircle size={20} className="text-gray-400" />}
            >
              Discussions
            </NavItem>
            <NavItem icon={<Terminal size={20} className="text-gray-400" />}>
              Codespaces
            </NavItem>
            <NavItem icon={<Github size={20} className="text-gray-400" />}>
              Copilot
            </NavItem>
          </nav>

          <hr className="border-gray-700 my-4" />

          {/* Explore Section */}
          <nav className="flex flex-col gap-1">
            <NavItem icon={<Compass size={20} className="text-gray-400" />}>
              Explore
            </NavItem>
            <NavItem icon={<Store size={20} className="text-gray-400" />}>
              Marketplace
            </NavItem>
          </nav>

          <hr className="border-gray-700 my-4" />

          {/* Repositories Section */}
          <div>
            <div className="flex justify-between items-center px-3 mb-2">
              <h3 className="text-sm font-semibold text-gray-300">
                Repositories
              </h3>
            </div>
            <div className="relative mb-2">
              <input
                type="text"
                placeholder="Find a repository..."
                className="w-full bg-gray-900 border border-gray-700 rounded-md py-1.5 pl-3 pr-8 text-sm text-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <Search
                size={16}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
            <NavItem icon={<Book size={20} className="text-gray-400" />}>
              provogram/project-zeta
            </NavItem>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-gray-700 flex-shrink-0">
          <p className="text-xs text-gray-500 mb-3">© 2025 Provogram Inc.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="#" className="text-xs text-gray-400 hover:underline">
              Blog
            </Link>
            <Link href="#" className="text-xs text-gray-400 hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-xs text-gray-400 hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-xs text-gray-400 hover:underline">
              Security
            </Link>
            <Link href="#" className="text-xs text-gray-400 hover:underline">
              Status
            </Link>
            <Link href="#" className="text-xs text-gray-400 hover:underline">
              Docs
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;

// app/components/landing/LandingNavbar.tsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setScrolled(window.scrollY > heroBottom - 1760);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleJoinClick = () => {
    signIn("google", { callbackUrl: "/login" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full text-white p-2 px-10 z-50 transition-all duration-800 ${
        scrolled ? "bg-[#0D1117]/95 backdrop-blur-md" : "bg-transparent"
      }`}
      style={{ fontFamily: "mona-sans" }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-1">
          <div className="w-14 h-14 rounded-lg flex items-center justify-center shadow-lg">
            <Image
              src="/icon.png"
              alt="Provoks Logo"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Provogram
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#about"
            className="text-sm font-medium hover:text-blue-300 transition-colors duration-200 relative group"
          >
            Tentang
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-200 group-hover:w-full"></span>
          </a>
          <a
            href="#team"
            className="text-sm font-medium hover:text-blue-300 transition-colors duration-200 relative group"
          >
            Tim
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-200 group-hover:w-full"></span>
          </a>
          <a
            href="#divisions"
            className="text-sm font-medium hover:text-blue-300 transition-colors duration-200 relative group"
          >
            Divisi
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-200 group-hover:w-full"></span>
          </a>

          {/* Join Button with Google Sign In */}
          <button
            onClick={handleJoinClick}
            className="flex items-center gap-2 px-2.5 py-1.5 bg-gray-800 hover:bg-gray-900 border border-gray-500 text-white text-[12px]  rounded-lg transition-all duration-400 shadow-lg hover:shadow-xl"
          >
            <LogIn size={16} />
            Bergabung
          </button>
        </div>

        {/* Mobile Menu Button (Optional) */}
        <div className="md:hidden">
          <button
            onClick={handleJoinClick}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 border border-gray-500 text-white text-[12px]  rounded-lg transition-all duration-400 shadow-lg hover:shadow-xl"
          >
            <LogIn size={14} />
            Bergabung
          </button>
        </div>
      </div>
    </nav>
  );
}

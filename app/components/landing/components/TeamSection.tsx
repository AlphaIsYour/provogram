"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import TechnoLionCanvas from "./TechnoLion";

type Leader = {
  id: string;
  role: string;
  name: string;
  image: string;
  linkedin?: string;
};

const TeamSection = () => {
  const leaders: Leader[] = [
    {
      id: "1",
      role: "Ketua",
      name: "Alex Rahman",
      image: "/posts/24.png",
      linkedin: "#",
    },
    {
      id: "2",
      role: "Wakil Ketua",
      name: "Sarah Wijaya",
      image: "/posts/23.png",
      linkedin: "#",
    },
    {
      id: "3",
      role: "Sekretaris",
      name: "Ahmad Fauzi",
      image: "/posts/22.png",
      linkedin: "#",
    },
    {
      id: "4",
      role: "Bendahara",
      name: "Linda Sari",
      image: "/posts/21.png",
      linkedin: "#",
    },
    {
      id: "5",
      role: "Bendahara 2",
      name: "Linda Sariyah",
      image: "/posts/25.png",
      linkedin: "#",
    },
    {
      id: "6",
      role: "Satpam",
      name: "Tegar",
      image: "/posts/23.png",
      linkedin: "#",
    },
  ];

  const itemsPerPage = 4;
  const originalLength = leaders.length;

  // 1. Array yang diperpanjang untuk ilusi infinity
  const extendedLeaders = [
    ...leaders.slice(originalLength - itemsPerPage),
    ...leaders,
    ...leaders.slice(0, itemsPerPage),
  ];

  const [currentIndex, setCurrentIndex] = useState(itemsPerPage);
  const [isTransitioning, setIsTransitioning] = useState(false); // Flag untuk proses "lompatan"

  const handleNext = () => {
    if (isTransitioning) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setCurrentIndex((prev) => prev - 1);
  };

  // 2. Fungsi yang dipanggil setelah animasi selesai
  const handleAnimationComplete = () => {
    if (currentIndex === itemsPerPage - 1) {
      // Jika kita di ujung kiri (clone)
      setIsTransitioning(true); // Aktifkan mode transisi (tanpa animasi)
      setCurrentIndex(itemsPerPage + originalLength - 1); // Lompat ke posisi asli di ujung kanan
    } else if (currentIndex === itemsPerPage + originalLength) {
      // Jika kita di ujung kanan (clone)
      setIsTransitioning(true); // Aktifkan mode transisi
      setCurrentIndex(itemsPerPage); // Lompat ke posisi asli di ujung kiri
    }
  };

  // 3. Efek untuk mematikan mode transisi setelah lompatan selesai
  useEffect(() => {
    if (isTransitioning) {
      // Setelah state di-update dan lompatan terjadi, matikan flag-nya
      setTimeout(() => setIsTransitioning(false), 50);
    }
  }, [isTransitioning]);

  return (
    <section
      id="team"
      className="bg-[#0D1117] text-white py-20 border-t border-gray-800"
      style={{ fontFamily: "mona-sans" }}
    >
      {/* 2. Buat container untuk Canvas 3D di sini */}
      <div className="w-full h-[225px]">
        <TechnoLionCanvas />
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-300">
            Dedicated individuals working together for a stronger community.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Tombol Navigasi */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white text-black shadow-lg -translate-x-1/2"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white text-black shadow-lg translate-x-1/2"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Jendela Carousel */}
          <div className="overflow-hidden">
            <motion.div
              className="flex" // Gunakan flex, bukan grid
              // Animasikan posisi x berdasarkan index saat ini
              animate={{ x: `-${currentIndex * (100 / itemsPerPage)}%` }}
              // 4. Transisi yang cerdas: nonaktifkan animasi saat 'isTransitioning'
              transition={
                isTransitioning
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 200, damping: 30 }
              }
              // Panggil fungsi setelah animasi selesai
              onAnimationComplete={handleAnimationComplete}
            >
              {extendedLeaders.map((leader, index) => (
                // 5. Layout anti-potong
                <div
                  key={`${leader.id}-${index}`}
                  className="flex-shrink-0 w-full px-4 group"
                  style={{ flexBasis: `${100 / itemsPerPage}%` }}
                >
                  <div className="relative text-center border border-gray-700 rounded-3xl overflow-hidden h-[235px] shadow-md w-full">
                    <Image
                      width={300}
                      height={300}
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:blur-sm"
                    />

                    {/* Gradient overlay - always visible */}
                    <div className="absolute bottom-0 left-0 right-0 h-30 bg-gradient-to-t from-blue-900/90 via-blue-800/60 to-transparent"></div>

                    {/* Default content - hidden on hover */}
                    <div className="absolute bottom-0 p-4 w-full z-10 transition-opacity duration-300 group-hover:opacity-0">
                      <h3 className="text-xl font-semibold text-white">
                        {leader.name}
                      </h3>
                      <p className="text-blue-200 font-medium">{leader.role}</p>
                    </div>

                    {/* Hover content - visible on hover */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                      <h3 className="text-2xl font-bold text-white mb-4 text-center px-4">
                        {leader.name}
                      </h3>
                      <a
                        href={leader.linkedin || "#"} // Gunakan leader.linkedin jika ada, atau tambahkan field ini
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

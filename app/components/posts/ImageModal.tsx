"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageModalProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function ImageModal({
  images,
  initialIndex,
  onClose,
}: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Menutup modal dengan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80  backdrop-blur-sm z-50 flex items-start justify-center pt-10 pb-6"
        onClick={onClose} // Menutup saat klik background
      >
        {/* Container untuk gambar dan tombol close yang sejajar */}
        <div className="relative mt-40 flex items-start gap-4">
          {/* Konten Modal (mencegah penutupan saat diklik) */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={images[currentIndex]}
                  alt={`Image ${currentIndex + 1}`}
                  width={1000}
                  height={800}
                  className="object-contain w-auto h-96 rounded-lg shadow-2xl"
                  priority
                  sizes="100vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Tombol Navigasi (jika lebih dari 1 gambar) */}
        {images.length > 1 && (
          <>
            <button
              className="absolute left-80 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-50 p-3 bg-black/80 hover:bg-black/70 rounded-xl backdrop-blur-sm transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
            >
              <ChevronLeft size={28} />
            </button>
            <button
              className="absolute right-80 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-50 p-3 bg-black/80 hover:bg-black/70 rounded-xl backdrop-blur-sm transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRight size={28} />
            </button>
          </>
        )}

        {/* Indikator gambar (opsional) */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-white"
                    : "bg-white/40 hover:bg-white/60"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

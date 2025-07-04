"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  // removed misplaced import

  const handlePrev = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }, [images.length]);

  // Touch handlers untuk swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && images.length > 1) {
      handleNext();
    }
    if (isRightSwipe && images.length > 1) {
      handlePrev();
    }
  };

  // Menutup modal dengan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, handleNext, handlePrev]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:pt-10 md:pb-6"
        onClick={onClose}
      >
        {/* Container untuk gambar */}
        <div className="relative flex items-center justify-center w-full h-full">
          {/* Konten Modal */}
          <div
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
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
                  className="object-contain w-auto h-auto max-w-[90vw] max-h-[70vh] md:max-h-96 rounded-lg shadow-2xl"
                  priority
                  sizes="90vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Tombol Navigasi Desktop (hidden di mobile) */}
        {images.length > 1 && !isMobile && (
          <>
            <button
              className="absolute left-4 md:left-80 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-50 p-3 bg-black/80 hover:bg-black/70 rounded-xl backdrop-blur-sm transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
            >
              <ChevronLeft size={28} />
            </button>
            <button
              className="absolute right-4 md:right-80 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-50 p-3 bg-black/80 hover:bg-black/70 rounded-xl backdrop-blur-sm transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRight size={28} />
            </button>
          </>
        )}

        {/* Indikator gambar */}
        {images.length > 1 && (
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
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

        {/* Instruksi swipe untuk mobile */}
        {images.length > 1 && isMobile && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            Swipe left/right to navigate
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

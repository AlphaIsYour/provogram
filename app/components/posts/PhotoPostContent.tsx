"use client";

import { useState } from "react";
import ImageGallery from "./ImageGallery";
import ImageModal from "./ImageModal";

interface PhotoPostContentProps {
  caption: string;
  imageUrls: string[];
}

export default function PhotoPostContent({
  caption,
  imageUrls,
}: PhotoPostContentProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedIndex(null);
  };

  return (
    <>
      <div className="px-4 pb-4">
        <div className="bg-gray-900 rounded-lg p-4">
          {caption && <p className="text-gray-300 mb-4">{caption}</p>}
          <ImageGallery images={imageUrls} onImageClick={handleImageClick} />
        </div>
      </div>

      {/* Render Modal secara kondisional */}
      {selectedIndex !== null && (
        <ImageModal
          images={imageUrls}
          initialIndex={selectedIndex}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

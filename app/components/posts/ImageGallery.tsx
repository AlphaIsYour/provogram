/* eslint-disable @typescript-eslint/no-explicit-any */
// app/components/posts/ImageGallery.tsx

import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  onImageClick: (index: number) => void;
}

// Helper untuk membuat wrapper gambar
const ImageWrapper = ({ src, index, onClick, className = "" }: any) => (
  <div
    className={`relative cursor-pointer ${className}`}
    onClick={() => onClick(index)}
  >
    <Image
      src={src}
      alt={`Post image ${index + 1}`}
      fill
      className="object-cover"
      // TAMBAHKAN BARIS INI:
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  </div>
);

export default function ImageGallery({
  images,
  onImageClick,
}: ImageGalleryProps) {
  const imageCount = images.length;

  if (imageCount === 0) return null;
  if (imageCount === 1) {
    return (
      <div
        className="relative aspect-video rounded-md overflow-hidden"
        onClick={() => onImageClick(0)}
      >
        <Image
          src={images[0]}
          alt="Post image"
          fill
          className="object-cover bg-black/50"
          // TAMBAHKAN BARIS INI:
          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }

  // Layout untuk 2 foto
  if (imageCount === 2) {
    return (
      <div className="grid grid-cols-2 gap-1 rounded-md overflow-hidden">
        {images.map((src, index) => (
          <ImageWrapper
            key={index}
            src={src}
            index={index}
            onClick={onImageClick}
            className="aspect-square"
          />
        ))}
      </div>
    );
  }

  // Layout untuk 3 foto
  if (imageCount === 3) {
    return (
      <div className="grid grid-cols-2 grid-rows-2 gap-1 rounded-md overflow-hidden aspect-video">
        <ImageWrapper
          src={images[0]}
          index={0}
          onClick={onImageClick}
          className="col-span-1 row-span-2"
        />
        <ImageWrapper
          src={images[1]}
          index={1}
          onClick={onImageClick}
          className="col-span-1 row-span-1"
        />
        <ImageWrapper
          src={images[2]}
          index={2}
          onClick={onImageClick}
          className="col-span-1 row-span-1"
        />
      </div>
    );
  }

  // Layout untuk 4 foto atau lebih
  const displayImages = images.slice(0, 4);
  const remainingCount = imageCount - 4;
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-1 rounded-md overflow-hidden aspect-video">
      {displayImages.map((src, index) => (
        <div
          key={index}
          className="relative cursor-pointer"
          onClick={() => onImageClick(index)}
        >
          <Image
            src={src}
            alt={`Post image ${index + 1}`}
            fill
            className="object-cover"
            // TAMBAHKAN BARIS INI:
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {index === 3 && remainingCount > 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white text-3xl font-bold">
                +{remainingCount}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

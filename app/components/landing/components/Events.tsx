/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const Events = () => {
  // Data slider - ganti dengan data event Anda
  const sliderData = [
    {
      id: 1,
      image: "/events/img1.png",
      category: "design",
      title: "Event 01",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.",
      thumbnailTitle: "Design Conference",
    },
    {
      id: 2,
      image: "/events/img2.jpg",
      category: "music",
      title: "Event 02",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.",
      thumbnailTitle: "Music Festival",
    },
    {
      id: 3,
      image: "/events/img3.jpg",
      category: "tech",
      title: "Event 03",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.",
      thumbnailTitle: "Tech Summit",
    },
    {
      id: 4,
      image: "/events/img4.jpg",
      category: "business",
      title: "Event 04",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.",
      thumbnailTitle: "Business Expo",
    },
    {
      id: 5,
      image: "/events/img5.jpg",
      category: "art",
      title: "Event 05",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.",
      thumbnailTitle: "Art Exhibition",
    },
  ];

  const [itemActive, setItemActive] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  // Auto slide functionality
  useEffect(() => {
    const startAutoSlide = () => {
      intervalRef.current = setInterval(() => {
        setItemActive((prev) => (prev + 1) % sliderData.length);
      }, 5000);
    };

    startAutoSlide();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [sliderData.length]);

  // Reset auto slide when manual navigation
  const resetAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setItemActive((prev) => (prev + 1) % sliderData.length);
    }, 5000);
  };

  const handleNext = () => {
    setItemActive((prev) => (prev + 1) % sliderData.length);
    resetAutoSlide();
  };

  const handlePrev = () => {
    setItemActive((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));
    resetAutoSlide();
  };

  const handleThumbnailClick = (index: number) => {
    setItemActive(index);
    resetAutoSlide();
  };

  // Scroll thumbnail into view - HANYA untuk container thumbnail, bukan halaman
  useEffect(() => {
    if (thumbnailRef.current) {
      const activeThumb = thumbnailRef.current.children[
        itemActive
      ] as HTMLElement;
      if (activeThumb) {
        // Scroll hanya dalam container thumbnail, tidak mempengaruhi halaman
        const container = thumbnailRef.current;
        const thumbLeft = activeThumb.offsetLeft;
        const thumbWidth = activeThumb.offsetWidth;
        const containerScrollLeft = container.scrollLeft;
        const containerWidth = container.offsetWidth;

        // Hitung posisi scroll yang diperlukan
        const scrollPosition = thumbLeft - containerWidth / 2 + thumbWidth / 2;

        // Smooth scroll dalam container saja
        container.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [itemActive]);

  return (
    <div className="w-full ">
      {/* Slider */}
      <div className="relative h-screen -mt-16 overflow-hidden bg-black border-t border-gray-500">
        {/* Slider Items */}
        <div className="relative w-full h-full">
          {sliderData.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === itemActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                width={1920}
                height={1080}
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute left-[10%] top-[20%] w-[500px] max-w-[80%] z-20 text-white">
                <p
                  className={`uppercase tracking-[10px] text-sm mb-4 transform transition-all duration-500 ${
                    index === itemActive
                      ? "translate-y-0 blur-0 opacity-100 animate-[showContent_0.5s_0.7s_ease-in-out_forwards]"
                      : "translate-y-8 blur-md opacity-0"
                  }`}
                >
                  {item.category}
                </p>
                <h2
                  className={`text-6xl md:text-8xl font-bold mb-4 m-0 transform transition-all duration-500 ${
                    index === itemActive
                      ? "translate-y-0 blur-0 opacity-100 animate-[showContent_0.5s_1s_ease-in-out_forwards]"
                      : "translate-y-8 blur-md opacity-0"
                  }`}
                >
                  {item.title}
                </h2>
                <p
                  className={`text-base leading-relaxed transform transition-all duration-[1.3s] ${
                    index === itemActive
                      ? "translate-y-0 blur-0 opacity-100 animate-[showContent_1.3s_0.7s_ease-in-out_forwards]"
                      : "translate-y-8 blur-md opacity-0"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Arrow Buttons */}
        <div className="absolute top-[30%] right-12 z-30 flex flex-col gap-2">
          <button
            onClick={handlePrev}
            className="bg-white/30 border-none font-mono w-10 h-10 rounded text-white text-xl hover:bg-white hover:text-black transition-all duration-300"
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            className="bg-white/30 border-none font-mono w-10 h-10 rounded text-white text-xl hover:bg-white hover:text-black transition-all duration-300"
          >
            &gt;
          </button>
        </div>

        {/* Thumbnails */}
        <div
          ref={thumbnailRef}
          className="absolute bottom-12 left-0 right-0 z-20 flex gap-3 h-56 px-12 overflow-x-auto overflow-y-hidden justify-start scrollbar-hide"
        >
          {sliderData.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleThumbnailClick(index)}
              className={`w-36 h-52 flex-shrink-0 cursor-pointer transition-all duration-300 relative ${
                index === itemActive ? "brightness-150" : "brightness-50"
              }`}
            >
              <img
                src={item.image}
                alt={item.thumbnailTitle}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-2 left-2 right-2 text-white text-sm">
                {item.thumbnailTitle}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes showContent {
          to {
            transform: translateY(0);
            filter: blur(0);
            opacity: 1;
          }
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Events;

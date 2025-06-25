/* eslint-disable @next/next/no-img-element */
// app/components/landing/components/AutoSlider.tsx
"use client";
import React from "react";

interface SliderItem {
  src: string;
  alt: string;
}

interface AutoSliderProps {
  items: SliderItem[];
  width?: number;
  height?: number;
  duration?: number;
  reverse?: boolean;
  className?: string;
}

export default function AutoSlider({
  items,
  width = 100,
  height = 50,
  duration = 10,
  reverse = false,
  className = "",
}: AutoSliderProps) {
  const sliderStyle = {
    "--width": `${width}px`,
    "--height": `${height}px`,
    "--quantity": items.length,
    "--duration": `${duration}s`,
  } as React.CSSProperties;

  return (
    <>
      <style jsx>{`
        .auto-slider {
          width: 100%;
          height: var(--height);
          overflow: hidden;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            #000 10% 90%,
            transparent
          );
          mask-image: linear-gradient(
            to right,
            transparent,
            #000 10% 90%,
            transparent
          );
        }

        .auto-slider .slider-list {
          display: flex;
          width: 100%;
          min-width: calc(var(--width) * var(--quantity));
          position: relative;
        }

        .auto-slider .slider-item {
          width: var(--width);
          height: var(--height);
          position: absolute;
          left: 100%;
          animation: autoRun var(--duration) linear infinite;
          transition: filter 0.5s;
        }

        .auto-slider .slider-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }

        .auto-slider.reverse .slider-item {
          animation: reversePlay var(--duration) linear infinite;
        }

        .auto-slider:hover .slider-item {
          animation-play-state: paused !important;
          filter: grayscale(1);
        }

        .auto-slider .slider-item:hover {
          filter: grayscale(0);
        }

        @keyframes autoRun {
          from {
            left: 100%;
          }
          to {
            left: calc(var(--width) * -1);
          }
        }

        @keyframes reversePlay {
          from {
            left: calc(var(--width) * -1);
          }
          to {
            left: 100%;
          }
        }
      `}</style>

      <div
        className={`auto-slider ${reverse ? "reverse" : ""} ${className}`}
        style={sliderStyle}
      >
        <div className="slider-list">
          {items.map((item, index) => (
            <div
              key={index}
              className="slider-item"
              style={{
                animationDelay: `calc((var(--duration) / var(--quantity)) * ${index} - var(--duration))`,
              }}
            >
              <img src={item.src} alt={item.alt} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

"use client";

import ModelLoader from "@/app/components/ModelLoader";
import { Suspense, useEffect, useState } from "react";

export default function Home() {
  const [viewportHeight, setViewportHeight] = useState("100vh");

  useEffect(() => {
    // Calculate actual available height minus navbar
    const updateHeight = () => {
      const navbar = document.querySelector("nav"); // Adjust selector sesuai navbar mu
      const navbarHeight = navbar ? navbar.offsetHeight : 64; // Fallback ke 64px
      setViewportHeight(`calc(100vh - ${navbarHeight}px)`);
    };

    // Set initial height
    updateHeight();

    // Update on resize
    window.addEventListener("resize", updateHeight);

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("resize", updateHeight);
      document.body.style.overflow = "auto"; // Restore scroll for other pages
    };
  }, []);

  return (
    <div
      className="w-full bg-gradient-to-br from-[#000428] via-[#004e92] to-[#a18cd1] relative overflow-hidden"
      style={{ height: viewportHeight }}
    >
      {/* Container untuk 3D Model */}
      <div className="w-full h-full overflow-hidden">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-lg">Loading 3D Experience...</p>
                <p className="text-sm opacity-70 mt-2">
                  Please wait while we prepare your model
                </p>
              </div>
            </div>
          }
        >
          <ModelLoader />
        </Suspense>
      </div>
    </div>
  );
}

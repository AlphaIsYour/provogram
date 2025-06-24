// app/components/landing/LandingLayout.tsx
import React from "react";
import LandingNavbar from "./LandingNavbar";
// Nanti bisa import LandingFooter juga

// Layout ini menerima 'children', yaitu konten yang akan dibungkus
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#222831]">
      <LandingNavbar />
      <main>
        {children} {/* Di sinilah konten halaman akan ditampilkan */}
      </main>
      {/* <LandingFooter /> */}
    </div>
  );
}

// app/components/landing/LandingLayout.tsx
import React from "react";
import LandingNavbar from "./LandingNavbar";
import LandingFooter from "./LandingFooter";

// Layout ini menerima 'children', yaitu konten yang akan dibungkus
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <LandingNavbar />
      <main>
        {children} {/* Di sinilah konten halaman akan ditampilkan */}
      </main>
      <LandingFooter />
    </div>
  );
}

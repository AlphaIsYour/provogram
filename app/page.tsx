// app/page.tsx (THE REAL HOMEPAGE!)

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; // Pastikan path ini benar

// Impor dua komponen "wajah" yang sudah kita buat
import DashboardView from "@/app/components/views/DashboardView";
import LandingLayout from "@/app/components/landing/LandingLayout";
import HomeContent from "@/app/components/landing/HomeContent";

export default async function HomePage() {
  // Cek sesi di server, ini sangat cepat dan aman
  const session = await getServerSession(authOptions);

  // Jika ADA sesi (user sudah login)...
  if (session) {
    // ...render tampilan Dashboard.
    return <DashboardView />;
  }

  // Jika TIDAK ADA sesi (user belum login)...
  // ...render tampilan Landing Page.
  return (
    <LandingLayout>
      <HomeContent />
    </LandingLayout>
  );
}

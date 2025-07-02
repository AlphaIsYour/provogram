/* eslint-disable @typescript-eslint/no-unused-vars */
// app/[username]/layout.tsx

import Navbar from "@/app/components/layout/Navbar";

interface ProfileLayoutProps {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}

export default async function ProfileLayout({
  children,
  params,
}: ProfileLayoutProps) {
  // Await the params Promise
  const { username } = await params;

  return (
    <>
      <Navbar />
      <div
        className="bg-[#0D1117] min-h-screen text-white"
        style={{ fontFamily: "mona-sans" }}
      >
        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">{children}</div>
      </div>
    </>
  );
}

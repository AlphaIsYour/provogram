// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Provogram",
  description: "Share your projects with the community!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#393E46]`}>
        {" "}
        {/* Ganti warna background body */}
        <Navbar /> {/* Letakkan Navbar di sini */}
        <main>{children}</main>
      </body>
    </html>
  );
}

// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import AuthProvider from "@/app/components/providers/AuthProvider";

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
    <html
      lang="en"
      suppressHydrationWarning={true}
      style={{ fontFamily: "mona-sans" }}
    >
      <AuthProvider>
        <link
          rel="preload"
          href="/foxy-optimized.glb"
          as="fetch"
          crossOrigin="anonymous"
        ></link>
        <body
          className={`${inter.className} bg-[#0D1117]`}
          suppressHydrationWarning={true}
        >
          {" "}
          {/* Ganti warna background body */}
          <main>{children}</main>
        </body>
      </AuthProvider>
    </html>
  );
}

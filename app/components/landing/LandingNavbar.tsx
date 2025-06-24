// app/components/landing/LandingNavbar.tsx
import Link from "next/link";

export default function LandingNavbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent text-white p-4 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Provogram
        </Link>
        <div>
          <Link href="/fitur" className="mx-2 hover:underline">
            Fitur
          </Link>
          <Link href="/tentang" className="mx-2 hover:underline">
            Tentang
          </Link>
          <Link href="/login" className="ml-4 px-4 py-2 bg-sky-500 rounded-md">
            Masuk
          </Link>
        </div>
      </div>
    </nav>
  );
}

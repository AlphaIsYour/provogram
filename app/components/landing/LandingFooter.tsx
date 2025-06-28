// app/components/landing/LandingFooter.tsx
import React from "react";
import Image from "next/image";

export default function LandingFooter() {
  return (
    <footer
      className="bg-[#0D1117] text-white py-8 sm:py-12 border-t border-gray-500"
      style={{ fontFamily: "mona-sans" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center shadow-lg">
                <Image
                  src="/icon.png"
                  alt="Provoks Logo"
                  width={40}
                  height={40}
                  className="sm:w-16 sm:h-16 object-contain"
                />
              </div>
              <span className="text-lg sm:text-xl font-semibold tracking-tight">
                Provogram
              </span>
            </div>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4 max-w-xs sm:max-w-none">
              Komunitas programmer yang passionate dalam mengembangkan teknologi
              dan berbagi pengetahuan.
            </p>
          </div>

          {/* Komunitas Section */}
          <div className="col-span-1">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">
              Komunitas
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-gray-400">
              <li>
                <a
                  href="#about"
                  className="text-sm sm:text-base hover:text-white transition-colors duration-200 inline-block"
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="text-sm sm:text-base hover:text-white transition-colors duration-200 inline-block"
                >
                  Tim
                </a>
              </li>
              <li>
                <a
                  href="#divisions"
                  className="text-sm sm:text-base hover:text-white transition-colors duration-200 inline-block"
                >
                  Divisi
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base hover:text-white transition-colors duration-200 inline-block"
                >
                  Bergabung
                </a>
              </li>
            </ul>
          </div>

          {/* Proyek Section */}
          <div className="col-span-1">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">
              Proyek
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-gray-400">
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base hover:text-white transition-colors duration-200 inline-block"
                >
                  Open Source
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base hover:text-white transition-colors duration-200 inline-block"
                >
                  Kontribusi
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base hover:text-white transition-colors duration-200 inline-block"
                >
                  Workshop
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base hover:text-white transition-colors duration-200 inline-block"
                >
                  Hackathon
                </a>
              </li>
            </ul>
          </div>

          {/* Kontak Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">
              Kontak
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-gray-400">
              <li className="text-sm sm:text-base break-all sm:break-normal">
                <span className="block sm:inline">Email: </span>
                <span className="text-gray-300">info@provoks.dev</span>
              </li>
              <li className="text-sm sm:text-base">
                <span className="block sm:inline">Discord: </span>
                <span className="text-gray-300">Provoks Community</span>
              </li>
              <li className="text-sm sm:text-base">
                <span className="block sm:inline">GitHub: </span>
                <span className="text-gray-300">@provoks</span>
              </li>
              <li className="text-sm sm:text-base">
                <span className="block sm:inline">LinkedIn: </span>
                <span className="text-gray-300">Provoks</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-500 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            &copy; 2025 Provoks. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}

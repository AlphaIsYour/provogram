// app/components/landing/LandingFooter.tsx
import React from "react";
import Image from "next/image";

export default function LandingFooter() {
  return (
    <footer
      className="bg-[#0D1117] text-white py-12 border-t border-gray-500"
      style={{ fontFamily: "mona-sans" }}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            {/* Logo Section */}
            <div className="flex items-center space-x-1">
              <div className="w-14 h-14 rounded-lg flex items-center justify-center shadow-lg">
                <Image
                  src="/icon.png"
                  alt="Provoks Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-semibold tracking-tight">
                Provogram
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Komunitas programmer yang passionate dalam mengembangkan teknologi
              dan berbagi pengetahuan.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Komunitas</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-white transition-colors">
                  Tim
                </a>
              </li>
              <li>
                <a
                  href="#divisions"
                  className="hover:text-white transition-colors"
                >
                  Divisi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Bergabung
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Proyek</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Open Source
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Kontribusi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Workshop
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Hackathon
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@provoks.dev</li>
              <li>Discord: Provoks Community</li>
              <li>GitHub: @provoks</li>
              <li>LinkedIn: Provoks</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-500 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Provoks. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}

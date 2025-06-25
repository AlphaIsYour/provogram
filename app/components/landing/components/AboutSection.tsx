// app/components/landing/components/AboutSection.tsx
"use client";
import { Shield, Star, Users } from "lucide-react";
// 1. Import komponen GlowbotCanvas yang baru dibuat
import GlowbotCanvas from "./Glowbot";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="bg-[#0D1117] text-white pt-10 pb-20 border-t border-gray-500" // saya sesuaikan padding top
      style={{ fontFamily: "mona-sans" }}
    >
      {/* 2. Buat container untuk Canvas 3D di sini */}
      <div className="w-full h-[150px]">
        <GlowbotCanvas />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Tentang Provoks</h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Provoks adalah komunitas programmer yang berdedikasi untuk
            mengembangkan teknologi terdepan. Kami percaya bahwa kolaborasi dan
            berbagi pengetahuan adalah kunci untuk menciptakan solusi inovatif
            yang dapat memberikan dampak positif bagi masyarakat.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-2 border-gray-500 rounded-lg p-6 hover:border-blue-400 transition-colors">
              <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Kualitas Tinggi</h3>
              <p className="text-gray-400">
                Mengutamakan standar coding dan best practices dalam setiap
                project
              </p>
            </div>
            <div className="border-2 border-gray-500 rounded-lg p-6 hover:border-blue-400 transition-colors">
              <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Kolaboratif</h3>
              <p className="text-gray-400">
                Membangun lingkungan yang mendukung pembelajaran dan kerjasama
                tim
              </p>
            </div>
            <div className="border-2 border-gray-500 rounded-lg p-6 hover:border-blue-400 transition-colors">
              <Star className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Inovasi</h3>
              <p className="text-gray-400">
                Selalu mencari solusi kreatif untuk tantangan teknologi masa
                depan
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

"use client";

import { ChevronDown, Code, Users, Zap } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #0b0d22 0%, #161b3d 50%, #244162 100%)",
        fontFamily: "mona-sans",
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 text-center text-white px-4">
        <div className="mb-8">
          <div className="w-34 h-34 flex items-center justify-center mx-auto">
            <Image
              src="/logo.png"
              alt="Provoks Logo"
              width={126}
              height={126}
              className="w-34 h-34"
            />
          </div>
          <h1
            className="text-6xl md:text-7xl mb-2 leading-tight"
            style={{ fontFamily: "ASTERA" }}
          >
            Provoks
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Komunitas Programmer Vokasi Universitas Brawijaya.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Code className="w-5 h-5" />
              <span>Open Source</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Users className="w-5 h-5" />
              <span>Collaborative</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Zap className="w-5 h-5" />
              <span>Innovative</span>
            </div>
          </div>
          <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Mulai Berkontribusi
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white" />
      </div>
    </section>
  );
};

export default HeroSection;

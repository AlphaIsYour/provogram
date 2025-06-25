"use client";

import { Cpu, Gamepad2, Globe, Smartphone } from "lucide-react";
import FoxCanvas from "./Fox"; // Pastikan path ini sesuai dengan struktur folder Anda

const DivisionsSection = () => {
  const divisions = [
    {
      name: "Website Development",
      icon: <Globe className="w-8 h-8" />,
      description:
        "Mengembangkan aplikasi web modern dengan teknologi terdepan",
      lead: "Budi Santoso",
      tech: ["React", "Next.js", "Node.js", "TypeScript"],
    },
    {
      name: "Mobile Development",
      icon: <Smartphone className="w-8 h-8" />,
      description:
        "Menciptakan aplikasi mobile yang user-friendly dan performant",
      lead: "Dewi Lestari",
      tech: ["React Native", "Flutter", "Swift", "Kotlin"],
    },
    {
      name: "Internet of Things",
      icon: <Cpu className="w-8 h-8" />,
      description: "Mengintegrasikan device dan sensor untuk solusi smart",
      lead: "Rizki Pratama",
      tech: ["Arduino", "Raspberry Pi", "Python", "C++"],
    },
    {
      name: "Game Development",
      icon: <Gamepad2 className="w-8 h-8" />,
      description: "Mengembangkan game yang menghibur dan mengedukasi",
      lead: "Maya Indira",
      tech: ["Unity", "Unreal Engine", "C#", "JavaScript"],
    },
  ];

  return (
    <section
      id="divisions"
      className="bg-[#0D1117] text-white py-20 mb-15 border-b border-t border-gray-500"
      style={{ fontFamily: "mona-sans" }}
    >
      {/* 2. Buat container untuk Canvas 3D di sini */}
      <div className="w-full h-[225px]">
        <FoxCanvas />
      </div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Divisi Kami</h2>
          <p className="text-xl text-gray-300">
            Spesialisasi dalam berbagai bidang teknologi
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {divisions.map((division, index) => (
            <div
              key={index}
              className="border-2 border-gray-500 rounded-lg p-8 hover:border-blue-400 transition-colors duration-200"
            >
              <div className="flex items-center mb-4">
                <div className="text-blue-400 mr-4">{division.icon}</div>
                <h3 className="text-2xl font-semibold">{division.name}</h3>
              </div>
              <p className="text-gray-300 mb-4">{division.description}</p>
              <div className="mb-4">
                <span className="text-sm text-gray-400">Ketua Divisi: </span>
                <span className="text-blue-400 font-medium">
                  {division.lead}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {division.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DivisionsSection;

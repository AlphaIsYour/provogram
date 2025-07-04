import { LinkIcon } from "lucide-react";
import { Project } from "./types"; // Updated import
import Image from "next/image";

interface ProjectPostContentProps {
  project: Project; // Direct Project type instead of Post["project"]
  caption?: string; // Add caption as an optional prop
}

export default function ProjectPostContent({
  caption,
  project,
}: ProjectPostContentProps) {
  if (!project) return null;

  return (
    <div className="px-4 pb-4">
      {caption && <p className="text-gray-300 mb-4">{caption}</p>}
      <div className="relative overflow-hidden h-96 border border-gray-900 rounded-2xl shadow-2xl max-w-6xl mx-auto bg-gray-800">
        {/* Background Image Section - Full Card */}
        <div className="absolute inset-0">
          <Image
            width={1200}
            height={1000}
            src="/posts/22.png"
            alt="Project Background"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay on Image */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
        </div>

        {/* Logo/Icon positioned on image */}
        <div className="absolute top-44 z-[8] left-5">
          <div className="flex items-center gap-4">
            <div className="w-22 h-22 bg-black/50 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 shadow-xl animated-icon">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {project.title.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          <div className="relative z-[7] p-2">
            {/* Title */}
            <div className="flex flex-col items-start gap-1">
              <h3 className="font-bold text-xl text-white mb-1 leading-tight max-w-md">
                {project.title}
              </h3>
              {/* Description */}
              <p className="text-gray-300 text-sm max-w-md">
                {project.description}
              </p>
            </div>
          </div>
        </div>

        {/* Content Section with Angled Background */}
        <div className="relative z-[1]">
          {/* Background yang miring */}
          <div
            className="absolute inset-x-0 -left-[420px] top-[224px] h-[160px] rounded-[50px] w-[900px] border-t border-r border-gray-800 bg-gradient-to-br bg-black z-0"
            style={{
              transform: "skewX(60deg)",
              transformOrigin: "top right",
            }}
          />
        </div>
        <div className="relative z-[2]">
          <div
            className="absolute inset-x-0 -left-[418px] top-[223px] h-[161px] w-[900px] rounded-[50px] z-0"
            style={{
              transform: "skewX(60deg)",
              transformOrigin: "top right",
              background: "#060c21",
              position: "relative",
            }}
          />
        </div>
      </div>
      <div className="mt-2 flex justify-center">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 w-30 bg-gray-900 hover:bg-gray-700 backdrop-blur-sm text-white font-sm py-1 px-2 rounded-[12px] transition-all duration-300 border border-white/30 hover:border-white/50 text-sm justify-center cursor-pointer"
        >
          Visit
          <LinkIcon size={12} />
        </a>
      </div>
    </div>
  );
}

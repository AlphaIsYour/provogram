import Link from "next/link";
import { Users, FileCheck } from "lucide-react";

interface ClassCardProps {
  slug: string;
  name: string;
  studentCount: number;
  newSubmissions: number;
  mentorName: string;
  progress: number;
  role: "mentor" | "student";
}

export const ClassCard = ({
  slug,
  name,
  studentCount,
  newSubmissions,
  mentorName,
  progress,
  role,
}: ClassCardProps) => {
  return (
    <Link href={`/classroom/class/${slug}`}>
      <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4 h-full flex flex-col hover:border-[#58A6FF] transition-colors">
        <h3 className="text-lg font-bold text-white mb-2 flex-grow">{name}</h3>
        {role === "mentor" ? (
          <div className="flex justify-between items-center text-sm text-[#8B949E]">
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>{studentCount} Siswa</span>
            </div>
            {newSubmissions > 0 && (
              <div className="flex items-center gap-2 text-yellow-400">
                <FileCheck size={16} />
                <span>{newSubmissions} baru</span>
              </div>
            )}
          </div>
        ) : (
          <div>
            <p className="text-sm text-[#8B949E] mb-2">oleh {mentorName}</p>
            <div className="w-full bg-[#0D1117] rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-right mt-1 text-[#8B949E]">
              {progress}% Selesai
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageSquare } from "lucide-react";

interface ReviewCardProps {
  taskName: string;
  className: string;
  studentName: string;
  submittedAt: string;
}

export const ReviewCard = ({
  taskName,
  className,
  studentName,
  submittedAt,
}: ReviewCardProps) => (
  <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-3 hover:bg-[#21262D] cursor-pointer">
    <p className="text-white">
      <span className="font-semibold">{studentName}</span> telah mengumpulkan{" "}
      <span className="font-semibold">{taskName}</span>
    </p>
    <div className="flex items-center justify-between text-sm text-[#8B949E] mt-1">
      <span>di kelas {className}</span>
      <span>{submittedAt}</span>
    </div>
  </div>
);

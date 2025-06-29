import { AlertTriangle, Clock } from "lucide-react";

interface UpcomingTaskCardProps {
  taskName: string;
  className: string;
  deadline: string;
  isUrgent: boolean;
}

export const UpcomingTaskCard = ({
  taskName,
  className,
  deadline,
  isUrgent,
}: UpcomingTaskCardProps) => (
  <div
    className={`bg-[#161B22] border border-[#30363D] rounded-lg p-3 ${
      isUrgent ? "border-l-4 border-red-500" : ""
    }`}
  >
    <p className="font-semibold text-white">{taskName}</p>
    <p className="text-sm text-[#8B949E]">{className}</p>
    <div
      className={`flex items-center gap-2 mt-2 text-sm ${
        isUrgent ? "text-red-400" : "text-yellow-400"
      }`}
    >
      {isUrgent ? <AlertTriangle size={16} /> : <Clock size={16} />}
      <span>Deadline: {deadline}</span>
    </div>
  </div>
);

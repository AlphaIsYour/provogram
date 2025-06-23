import { Star, MessageSquare } from "lucide-react";

interface PostFooterProps {
  stats?: {
    stars: number;
    comments: number;
  };
}

export default function PostFooter({ stats }: PostFooterProps) {
  if (!stats) return null;

  return (
    <div className="flex items-center gap-6 px-4 pb-4 text-gray-400">
      <div className="flex items-center gap-2">
        <Star size={16} />
        <span className="text-sm font-medium">{stats.stars} stars</span>
      </div>
      <div className="flex items-center gap-2">
        <MessageSquare size={16} />
        <span className="text-sm font-medium">{stats.comments} comments</span>
      </div>
    </div>
  );
}

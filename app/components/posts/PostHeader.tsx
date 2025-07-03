// app/components/posts/PostHeader.tsx
import Image from "next/image";
import PostActions from "./PostActions";

interface PostHeaderProps {
  author: {
    id: string;
    name: string;
    username: string; // Updated to match your database field
    avatarUrl: string;
  };
  timestamp: string;
}

export default function PostHeader({ author, timestamp }: PostHeaderProps) {
  return (
    <div className="flex justify-between items-start p-4">
      <div className="flex items-center gap-3">
        {/* Display avatar if available, otherwise show colored placeholder */}
        {author.avatarUrl ? (
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={author.avatarUrl}
              alt={`${author.username}'s avatar`}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-12 h-12 bg-indigo-500 rounded-full flex-shrink-0 flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {author.username.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <div className="flex flex-row items-center gap-1">
          {/* Display username as the main identifier */}
          <p className="font-bold text-white">{author.username}</p>
          {/* Display name as subtitle if different from username */}
          {author.name && author.name !== author.username && (
            <p className="text-[2vh] text-gray-500 mt-0.5">@{author.name}</p>
          )}
          <p className="text-gray-500 text-sm">•</p>
          <p className="text-[2vh] text-gray-500 mt-0.5">{timestamp}</p>
        </div>
      </div>
      <PostActions />
    </div>
  );
}

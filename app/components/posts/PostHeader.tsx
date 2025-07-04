// app/components/posts/PostHeader.tsx
import Image from "next/image";
import PostActions from "./PostActions";

interface PostHeaderProps {
  author: {
    id: string;
    name: string;
    username: string; // Updated to match your database field
    image: string;
  };
  timestamp: string;
}

export default function PostHeader({ author, timestamp }: PostHeaderProps) {
  return (
    <div className="flex justify-between items-start p-3 sm:p-4 gap-2 sm:gap-3">
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        {/* Display avatar if available, otherwise show colored placeholder */}
        {author.image ? (
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={author.image}
              alt={`${author.username}'s avatar`}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-500 rounded-full flex-shrink-0 flex items-center justify-center">
            <span className="text-white font-bold text-base sm:text-lg">
              {author.username.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-1 min-w-0 flex-1">
          {/* Display username as the main identifier */}
          <p className="font-bold text-white text-sm sm:text-base truncate">
            {author.username}
          </p>

          {/* Mobile: Stack vertically, Desktop: Inline */}
          <div className="flex items-center gap-1 text-xs sm:text-sm">
            {/* Display name as subtitle if different from username */}
            {author.name && author.name !== author.username && (
              <>
                <p className="text-gray-500 truncate max-w-[120px] sm:max-w-none">
                  @{author.name}
                </p>
                <p className="text-gray-500 hidden sm:inline">•</p>
              </>
            )}
            <p className="text-gray-500 whitespace-nowrap">{timestamp}</p>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0">
        <PostActions />
      </div>
    </div>
  );
}

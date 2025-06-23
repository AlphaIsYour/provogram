// app/components/posts/PostHeader.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import PostActions from "./PostActions";

interface PostHeaderProps {
  author: {
    name: string;
    nickname: string;
    avatarUrl: string;
  };
  timestamp: string;
}

export default function PostHeader({ author, timestamp }: PostHeaderProps) {
  return (
    <div className="flex justify-between items-start p-4">
      <div className="flex items-center gap-3">
        {/* Ganti 'src' dengan prop avatarUrl nanti */}
        <div className="w-12 h-12 bg-indigo-500 rounded-full flex-shrink-0"></div>
        <div>
          <p className="font-bold text-white">{author.nickname}</p>
          <p className="text-xs text-gray-400">{timestamp}</p>
        </div>
      </div>
      <PostActions />
    </div>
  );
}

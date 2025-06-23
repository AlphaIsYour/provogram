import PostHeader from "./PostHeader";
import PhotoPostContent from "./PhotoPostContent";
import TextPostContent from "./TextPostContent"; // <-- TAMBAHKAN INI
import ProjectPostContent from "./ProjectPostContent"; // <-- TAMBAHKAN INI
import PostFooter from "./PostFooter";
import { Post } from "./types";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const renderContent = () => {
    switch (post.type) {
      case "photo":
        return (
          <PhotoPostContent
            caption={post.caption || ""}
            imageUrls={post.imageUrls || []} // <-- BERI DIA ARRAY
          />
        );
      case "text": // <-- AKTIFKAN BAGIAN INI
        return <TextPostContent content={post.textContent || ""} />;
      case "project": // <-- AKTIFKAN BAGIAN INI
        if (!post.project) return null;
        return <ProjectPostContent project={post.project} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-950 rounded-xl mt-3 w-full max-w-4xl mx-auto border border-gray-700">
      <PostHeader author={post.author} timestamp={post.timestamp} />
      {renderContent()}
      <PostFooter stats={post.stats} />
    </div>
  );
}

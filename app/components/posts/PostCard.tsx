import PostHeader from "./PostHeader";
import PhotoPostContent from "./PhotoPostContent";
import TextPostContent from "./TextPostContent";
import ProjectPostContent from "./ProjectPostContent";
import PostFooter from "./PostFooter";
import { Post } from "./types";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const renderContent = () => {
    switch (post.type) {
      case "PHOTO":
        return (
          <PhotoPostContent
            caption={post.caption || ""}
            imageUrls={post.imageUrls || []} // Always array from schema
          />
        );
      case "TEXT":
        return <TextPostContent content={post.textContent || ""} />;
      case "PROJECT":
        if (!post.project) return null;
        return <ProjectPostContent project={post.project} />;
      default:
        return null;
    }
  };

  // Format timestamp for display
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };

  return (
    <div className="bg-gray-950 rounded-xl mt-3 w-full max-w-4xl mx-auto border border-gray-700">
      <PostHeader
        author={post.author}
        timestamp={formatTimestamp(post.createdAt)}
      />
      {renderContent()}
      <PostFooter stats={post.stats} />
    </div>
  );
}

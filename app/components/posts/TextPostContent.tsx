interface TextPostContentProps {
  content: string;
}

export default function TextPostContent({ content }: TextPostContentProps) {
  return (
    <div className="px-4 pb-4">
      <div className="bg-gray-900 rounded-lg p-4">
        <p className="text-gray-300 text-base leading-relaxed">{content}</p>
      </div>
    </div>
  );
}

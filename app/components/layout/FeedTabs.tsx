// app/components/layout/FeedTabs.tsx
"use client";

type FeedTab = "for-you" | "following";

interface FeedTabsProps {
  activeTab: FeedTab;
  onTabChange: (tab: FeedTab) => void;
}

export default function FeedTabs({ activeTab, onTabChange }: FeedTabsProps) {
  const getTabClasses = (tab: FeedTab) => {
    const isActive = activeTab === tab;
    return `
      flex-1 text-center py-4 transition-colors duration-200
      ${isActive ? "font-bold text-white" : "text-gray-500 hover:bg-white/10"}
    `;
  };

  const getIndicatorClasses = (tab: FeedTab) => {
    return `
      h-1 rounded-full mx-auto w-14 transition-all duration-200
      ${activeTab === tab ? "bg-orange-500" : "bg-transparent"}
    `;
  };

  return (
    // Container ini yang akan kita buat sticky di parent-nya
    <div className="flex border-b border-gray-700">
      <button
        onClick={() => onTabChange("for-you")}
        className={getTabClasses("for-you")}
      >
        <span className="relative inline-block">
          For You
          <div className={getIndicatorClasses("for-you")}></div>
        </span>
      </button>
      <button
        onClick={() => onTabChange("following")}
        className={getTabClasses("following")}
      >
        <span className="relative inline-block">
          Following
          <div className={getIndicatorClasses("following")}></div>
        </span>
      </button>
    </div>
  );
}

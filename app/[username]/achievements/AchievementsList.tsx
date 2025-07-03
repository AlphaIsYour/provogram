// app/[username]/achievements/AchievementsList.tsx
"use client"; // <-- INI YANG PALING PENTING!

import { useState } from "react";
import {
  Achievement,
  AchievementRarity,
  Category,
  UserAchievement,
} from "@prisma/client";
import {
  Trophy,
  Code,
  Flame,
  Users,
  Rocket,
  Crown,
  Zap,
  Brain,
  Shield,
  Coffee,
  Lightbulb,
  Diamond,
  Globe,
  Medal,
  Star,
  Target,
  Award,
  Heart,
  BookOpen,
  Gift,
  Gem,
  CheckCircle2,
} from "lucide-react";

// ==================================
// TIPE DATA PROPS (Agar Kode Rapi)
// ==================================
type AchievementWithRelations = Achievement & {
  category: Category;
  awardedTo: UserAchievement[];
};

type CategoryWithCount = Category & { _count: { achievements: number } };

interface AchievementsListProps {
  allAchievements: AchievementWithRelations[];
  allCategories: CategoryWithCount[];
}

// ==================================
// HELPER FUNCTIONS (Logika Tampilan)
// ==================================
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } =
  {
    Code,
    Flame,
    Users,
    Rocket,
    Crown,
    Zap,
    Brain,
    Shield,
    Coffee,
    Lightbulb,
    Diamond,
    Globe,
    Trophy,
    Medal,
    Star,
    Target,
    Award,
    Heart,
    BookOpen,
    Gift,
    Gem,
  };

const getIconComponent = (
  iconName: string | null | undefined
): React.ComponentType<{ className?: string }> => {
  if (!iconName) return Trophy;
  return iconMap[iconName] || Trophy;
};

const getRarityStyles = (rarity: AchievementRarity) => {
  switch (rarity) {
    case "LEGENDARY":
      return {
        bg: "bg-gradient-to-br from-purple-500 to-pink-500",
        textColor: "text-purple-400",
        borderColor: "border-purple-500",
        tag: "text-purple-400 bg-purple-900/20 border-purple-500",
      };
    case "EPIC":
      return {
        bg: "bg-gradient-to-br from-orange-500 to-red-500",
        textColor: "text-orange-400",
        borderColor: "border-orange-500",
        tag: "text-orange-400 bg-orange-900/20 border-orange-500",
      };
    case "RARE":
      return {
        bg: "bg-gradient-to-br from-blue-500 to-cyan-500",
        textColor: "text-blue-400",
        borderColor: "border-blue-500",
        tag: "text-blue-400 bg-blue-900/20 border-blue-500",
      };
    default:
      return {
        bg: "bg-gradient-to-br from-gray-500 to-gray-600",
        textColor: "text-gray-400",
        borderColor: "border-gray-500",
        tag: "text-gray-400 bg-gray-900/20 border-gray-500",
      };
  }
};

// ==================================
// KOMPONEN CLIENT
// ==================================
export default function AchievementsList({
  allAchievements,
  allCategories,
}: AchievementsListProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  // Logika filter berdasarkan state activeCategory
  const filteredAchievements = allAchievements
    .filter((achievement) => {
      if (activeCategory === "All") return true;
      return achievement.category.name === activeCategory;
    })
    .sort((a, b) => {
      const aEarned = a.awardedTo[0]?.earnedAt;
      const bEarned = b.awardedTo[0]?.earnedAt;
      if (aEarned && !bEarned) return -1;
      if (!aEarned && bEarned) return 1;
      return 0;
    });

  const categoriesForFilter = [
    { name: "All", count: allAchievements.length },
    ...allCategories.map((cat) => ({
      name: cat.name,
      count: cat._count.achievements,
    })),
  ];

  return (
    <>
      {/* Category Filter */}
      <div className="bg-[#161B22] rounded-lg p-6 border border-gray-800">
        <div className="flex flex-wrap gap-2">
          {categoriesForFilter.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === category.name
                  ? "bg-blue-600 text-white"
                  : "bg-[#0D1117] text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAchievements.length > 0 ? (
          filteredAchievements.map((achievement) => {
            const userAchievement = achievement.awardedTo[0]; // Data spesifik untuk user ini
            const isEarned = !!userAchievement && !!userAchievement.earnedAt;
            const progress = userAchievement?.progress || 0;

            const IconComponent = getIconComponent(achievement.icon);
            const styles = getRarityStyles(achievement.rarity);

            return (
              <div
                key={achievement.id}
                className={`bg-[#161B22] rounded-lg p-6 border transition-all duration-200 ${
                  isEarned
                    ? `${styles.borderColor} border-opacity-50`
                    : "border-gray-800"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div
                      className={`p-3 rounded-full ${
                        isEarned ? styles.bg : "bg-gray-800"
                      } mr-4`}
                    >
                      <IconComponent
                        className={`w-6 h-6 ${
                          isEarned ? "text-white" : "text-gray-500"
                        }`}
                      />
                    </div>
                    <div>
                      <h3
                        className={`text-lg font-bold ${
                          isEarned ? styles.textColor : "text-gray-500"
                        }`}
                      >
                        {achievement.name}
                      </h3>
                      <div
                        className={`text-xs capitalize px-2 py-1 rounded-full border inline-block ${styles.tag}`}
                      >
                        {achievement.rarity.toLowerCase()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-lg font-bold ${
                        isEarned ? "text-green-400" : "text-gray-500"
                      }`}
                    >
                      +{achievement.xp} XP
                    </div>
                  </div>
                </div>

                <p
                  className={`mb-4 text-sm ${
                    isEarned ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {achievement.description}
                </p>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-400">Progress</span>
                    <span
                      className={isEarned ? "text-green-400" : "text-gray-400"}
                    >
                      {progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isEarned
                          ? "bg-gradient-to-r from-green-500 to-emerald-500"
                          : "bg-gradient-to-r from-gray-600 to-gray-500"
                      }`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">
                    {achievement.requirements}
                  </span>
                  {isEarned && userAchievement.earnedAt && (
                    <div className="flex items-center text-green-400">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      <span>
                        {userAchievement.earnedAt.toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="md:col-span-2 text-center py-12 bg-[#161B22] rounded-lg border border-gray-800">
            <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No Achievements in this Category
            </h3>
            <p className="text-gray-500">
              Try selecting another category or &quot;All&quot;.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

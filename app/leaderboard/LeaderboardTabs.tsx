// app/leaderboard/LeaderboardTabs.tsx
"use client";

import { useState } from "react";
import { Prisma } from "@prisma/client";
import LeaderboardTable, { UserCell } from "./LeaderboardTable";
import { BarChart, CheckCircle, Brain, BookOpen } from "lucide-react";

// Tipe data yang presisi berdasarkan query di page.tsx
type TopLearner = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    username: true;
    image: true;
    totalXp: true;
    level: true;
    streak: true;
  };
}>;
type TopContributor = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    username: true;
    image: true;
    skillPoints: true;
    communityRank: true;
  };
}>;
type TopCreator = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    username: true;
    image: true;
    _count: { select: { projects: true } };
  };
}>;
type TopAchiever = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    username: true;
    image: true;
    _count: { select: { userAchievements: true } };
  };
}>;

interface LeaderboardTabsProps {
  leaderboards: {
    topLearners: TopLearner[];
    topContributors: TopContributor[];
    topCreators: TopCreator[];
    topAchievers: TopAchiever[];
  };
}

type LeaderboardKey = keyof LeaderboardTabsProps["leaderboards"];

const TABS: {
  key: LeaderboardKey;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}[] = [
  { key: "topLearners", label: "Top Learners", icon: BarChart },
  { key: "topContributors", label: "Top Contributors", icon: Brain },
  { key: "topCreators", label: "Top Creators", icon: BookOpen },
  { key: "topAchievers", label: "Top Achievers", icon: CheckCircle },
];

export default function LeaderboardTabs({
  leaderboards,
}: LeaderboardTabsProps) {
  const [activeTab, setActiveTab] = useState<LeaderboardKey>("topLearners");

  const renderActiveTable = () => {
    switch (activeTab) {
      case "topLearners":
        return (
          <LeaderboardTable
            headers={["Rank & User", "Level", "XP", "Streak"]}
            data={leaderboards.topLearners}
            renderRow={(user, rank) => (
              <>
                <UserCell user={user} rank={rank} />
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.level}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-400">
                  {user.totalXp.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-400">
                  {user.streak} days
                </td>
              </>
            )}
          />
        );
      case "topContributors":
        return (
          <LeaderboardTable
            headers={["Rank & User", "Skill Points", "Rank"]}
            data={leaderboards.topContributors}
            renderRow={(user, rank) => (
              <>
                <UserCell user={user} rank={rank} />
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-400">
                  {user.skillPoints.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.communityRank || "N/A"}
                </td>
              </>
            )}
          />
        );
      case "topCreators":
        return (
          <LeaderboardTable
            headers={["Rank & User", "Projects Created"]}
            data={leaderboards.topCreators}
            renderRow={(user, rank) => (
              <>
                <UserCell user={user} rank={rank} />
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-purple-400">
                  {user._count.projects}
                </td>
              </>
            )}
          />
        );
      case "topAchievers":
        return (
          <LeaderboardTable
            headers={["Rank & User", "Badges Earned"]}
            data={leaderboards.topAchievers}
            renderRow={(user, rank) => (
              <>
                <UserCell user={user} rank={rank} />
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-yellow-400">
                  {user._count.userAchievements}
                </td>
              </>
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="border-b border-gray-800 mb-6">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${
                    activeTab === tab.key
                      ? "border-orange-500 text-orange-400"
                      : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500"
                  }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div>{renderActiveTable()}</div>
    </div>
  );
}

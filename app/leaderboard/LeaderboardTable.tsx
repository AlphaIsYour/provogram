// app/leaderboard/LeaderboardTable.tsx

import Image from "next/image";
import Link from "next/link";
import { Crown } from "lucide-react";

// Tipe generik untuk data, bisa menerima tipe data apa pun
interface LeaderboardTableProps<T> {
  data: T[];
  headers: string[];
  // Fungsi untuk merender setiap sel, memberikan fleksibilitas
  renderRow: (item: T, rank: number) => React.ReactNode;
}

export default function LeaderboardTable<T extends { id: string }>({
  data,
  headers,
  renderRow,
}: LeaderboardTableProps<T>) {
  return (
    <div className="bg-[#161B22] rounded-lg border border-gray-800 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-[#0D1117]">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[#161B22] divide-y divide-gray-800">
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-[#21262D] transition-colors"
              >
                {renderRow(item, index + 1)}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-10 text-gray-500"
              >
                No data available for this leaderboard.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Komponen kecil untuk sel User, agar bisa dipakai ulang
export const UserCell = ({
  user,
  rank,
}: {
  user: {
    image?: string | null;
    name: string | null;
    username?: string | null;
  };
  rank: number;
}) => (
  <td className="px-6 py-4 whitespace-nowrap">
    <div className="flex items-center">
      <div className="w-10 font-bold text-lg flex-shrink-0 text-gray-400">
        {rank <= 3 ? (
          <Crown
            className={`w-6 h-6 ${
              rank === 1
                ? "text-yellow-400"
                : rank === 2
                ? "text-gray-300"
                : "text-orange-400"
            }`}
          />
        ) : (
          rank
        )}
      </div>
      <div className="flex-shrink-0 h-10 w-10">
        <Image
          className="h-10 w-10 rounded-full"
          src={user.image || "/default-avatar.png"}
          alt={user.name || "User avatar"}
          width={40}
          height={40}
        />
      </div>
      <div className="ml-4">
        <Link
          href={`/${user.username}`}
          className="text-sm font-medium text-white hover:text-blue-400"
        >
          {user.name}
        </Link>
        <div className="text-sm text-gray-500">@{user.username}</div>
      </div>
    </div>
  </td>
);

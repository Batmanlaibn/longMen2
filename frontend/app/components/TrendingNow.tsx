"use client";

import { Flame } from "lucide-react";
import { useTrending } from "@/hooks/useTrending";
import { useRouter } from "next/navigation";

export default function TrendingNow() {
  const { data, updatedAt } = useTrending(5000);
  const router = useRouter();

  if (!data.length) return null;

  return (
    <div className="bg-orange-50 border rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Flame className="text-orange-500" />
        <h3 className="font-bold">🔥 Яг одоо тренд</h3>
        <span className="text-xs ml-auto">
          {new Date(updatedAt).toLocaleTimeString()}
        </span>
      </div>

      <ul className="space-y-2">
        {data.map((item) => (
          <li
            key={`${item.courseId}-${item.chapterId}`}
            onClick={() =>
              router.push(`/cards/${item.courseId}?chapter=${item.chapterId}`)
            }
            className="cursor-pointer flex justify-between bg-white p-3 rounded-lg hover:bg-orange-100"
          >
            <span>{item.title}</span>
            <span className="font-semibold">🔥 {item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";

/* ================= TYPES ================= */

export interface Chapter {
  id: number;
  title: string;
  date: string;
  comments: number;
  video?: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  shortTitle: string;
  icon: string;
  students: number;
}

interface ChapterStats {
  totalViews: number;
  uniqueViewers: number;
  totalUsers: number;
}

interface Props {
  chapters: Chapter[];
  currentCourse: Course;
  onChapterClick: (ch: Chapter) => void;
  userId?: string;
}

/* ================= COMPONENT ================= */

export default function ChapterList({
  chapters,
  currentCourse,
  onChapterClick,
  userId = "bat",
}: Props) {
  const [chapterStats, setChapterStats] = useState<Record<number, ChapterStats>>({});
  const [loading, setLoading] = useState(true);

  /* ===== Chapter stats-уудыг татах ===== */
  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        const statsPromises = chapters.map(async (ch) => {
          const res = await fetch(
            `/api/user/history?chapterId=${ch.id}&courseId=${currentCourse.id}`
          );
          if (res.ok) {
            const data = await res.json();
            return { id: ch.id, stats: data };
          }
          return { id: ch.id, stats: { totalViews: 0, uniqueViewers: 0, totalUsers: 1 } };
        });

        const results = await Promise.all(statsPromises);
        const statsMap: Record<number, ChapterStats> = {};
        results.forEach((r) => {
          statsMap[r.id] = r.stats;
        });

        setChapterStats(statsMap);
      } catch (err) {
        console.error("Failed to fetch chapter stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStats();
  }, [chapters, currentCourse.id]);

  /* ===== % бодох ===== */
  const getPercent = (uniqueViewers: number, totalUsers: number) => {
    if (totalUsers === 0) return 0;
    return Math.min(100, Math.round((uniqueViewers / totalUsers) * 100));
  };

  /* ===== Chapter tracking ===== */
  const trackChapterView = useCallback(
    async (chapter: Chapter) => {
      const historyItem = {
        id: chapter.id,
        courseId: currentCourse.id,
        title: chapter.title,
        description: currentCourse.description,
        level: currentCourse.shortTitle,
        icon: currentCourse.icon,
        duration: "5 мин",
        viewedAt: new Date().toISOString(),
        type: "chapter",
      };

      console.log("🔵 Tracking chapter view:", historyItem);

      try {
        const response = await fetch("/api/user/history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            action: "add_view",
            item: historyItem,
          }),
        });

        const result = await response.json();
        console.log("✅ History saved:", result);

        // Stats шинэчлэх
        const res = await fetch(
          `/api/user/history?chapterId=${chapter.id}&courseId=${currentCourse.id}`
        );
        if (res.ok) {
          const data = await res.json();
          console.log("📊 Updated stats:", data);
          setChapterStats((prev) => ({ ...prev, [chapter.id]: data }));
        }
      } catch (err) {
        console.error("❌ Chapter tracking failed:", err);
      }
    },
    [currentCourse, userId]
  );

  /* ===== Click ===== */
  const handleChapterClick = (chapter: Chapter) => {
    trackChapterView(chapter);
    onChapterClick(chapter);
  };

  /* ================= RENDER ================= */

  if (chapters.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        Chapter байхгүй байна
      </div>
    );
  }

  return (
    <div className="mt-6 bg-[#1c1c1c] rounded-xl overflow-hidden">
      {chapters.map((ch) => {
        const stats = chapterStats[ch.id] || { totalViews: 0, uniqueViewers: 0, totalUsers: 1 };
        const percent = getPercent(stats.uniqueViewers, stats.totalUsers);

        return (
          <div
            key={ch.id}
            onClick={() => handleChapterClick(ch)}
            className="px-5 py-4 border-b border-gray-700 hover:bg-[#2a2a2a] cursor-pointer transition-all"
          >
            <p className="text-gray-400 text-sm">
              #{ch.id} · {ch.date}
            </p>

            <p className="text-white font-medium mt-1">{ch.title}</p>

            <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
              <span>💬 {ch.comments}</span>
              <span>
                👥 {stats.uniqueViewers} хүн үзсэн · 👁 {stats.totalViews} удаа · {percent}%
              </span>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
              <div
                className="bg-green-500 h-1.5 rounded-full transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>

            {loading && ch.id === chapters[0].id && (
              <p className="text-xs text-gray-500 mt-1">Статистик ачааллаж байна...</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
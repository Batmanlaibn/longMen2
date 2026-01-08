"use client";

import React from "react";
import { Eye, Clock, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

/* ================= TYPES ================= */

interface HistoryItem {
  id: number;
  courseId?: number;
  title: string;
  description: string;
  level: string;
  icon: string;
  duration: string;
  viewedAt: string;
  viewCount?: number;
  type?: string;
}

/* ================= COMPONENT ================= */

interface Props {
  viewHistory: HistoryItem[];
  formatDate: (date: string) => string;
  getLevelColor: (level: string) => string;
  clearHistory: () => void;
  removeHistoryItem: (id: number, courseId: number) => void;
}

export default function ViewHistory({
  viewHistory,
  formatDate,
  getLevelColor,
  clearHistory,
  removeHistoryItem,
}: Props) {
  const router = useRouter();

  if (viewHistory.length === 0) {
    return (
      <div className="text-center py-12">
        <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">
          Үзсэн хичээл байхгүй байна
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Хичээл үзвэл энд харагдана
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Таны үзсэн хичээлүүд ({viewHistory.length})
        </h3>

        <button
          onClick={clearHistory}
          className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
        >
          <Trash2 className="w-4 h-4" />
          Бүгдийг устгах
        </button>
      </div>

      <div className="space-y-4">
        {viewHistory.map((item, index) => (
          <div
            key={`history-${item.courseId || 0}-${item.id}-${index}`}
            className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{item.icon}</span>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.description}
                    </p>
                  </div>

                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getLevelColor(
                      item.level
                    )}`}
                  >
                    {item.level}
                  </span>
                </div>

                <div className="flex gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {formatDate(item.viewedAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {item.duration}
                  </div>
                  {item.viewCount && item.viewCount > 1 && (
                    <div className="flex items-center gap-1 text-blue-600 font-semibold">
                      🔄 {item.viewCount} удаа үзсэн
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => removeHistoryItem(item.id, item.courseId || 0)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Устгах
                </button>

                <button
                  onClick={() => router.push(`/cards/${item.courseId || item.id}`)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Дахин үзэх
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
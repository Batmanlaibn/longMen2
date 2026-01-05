"use client";

import React from "react";
import { Eye, Clock, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const ViewHistory = ({ viewHistory, formatDate, getLevelColor, clearHistory, removeHistoryItem }) => {
  const router = useRouter();

  if (viewHistory.length === 0) {
    return (
      <div className="text-center py-12">
        <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Үзсэн хичээл байхгүй байна</p>
        <p className="text-gray-400 text-sm mt-2">Хичээл үзвэл энд харагдах болно</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Таны үзсэн хичээлүүд ({viewHistory.length})</h3>
        <button
          onClick={clearHistory}
          className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
        >
          <Trash2 className="w-4 h-4" /> Бүгдийг устгах
        </button>
      </div>
      {viewHistory.map((item) => (
        <div key={item.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getLevelColor(item.level)}`}>
                  {item.level}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>Үзсэн: {formatDate(item.viewedAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{item.duration}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => removeHistoryItem(item.id)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap">
                Устгах
              </button>
              <button onClick={() => router.push(`/cards/${item.id}`)} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                Дахин үзэх
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ViewHistory;

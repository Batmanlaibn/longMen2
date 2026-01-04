"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface OfflineCourse {
  level: string;
  price: string;
  startDate: string;
  endDate: string;
  color: string;
}

export default function OfflineCourses() {
  const [offlineCourses, setOfflineCourses] = useState<OfflineCourse[]>([]);
  const router = useRouter();

  useEffect(() => {
    import("../../../public/data/data.json")
      .then((module) => {
        const json = module.default || module;
        setOfflineCourses(json.offlineCourses as OfflineCourse[]);
      })
      .catch(console.error);
  }, []);

  if (!offlineCourses.length) {
    return (
      <div className="text-center text-gray-400 py-20">
        Танхимын сургалтууд ачааллаж байна...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto mt-20 px-6">
      <h2 className="text-3xl font-bold text-white mb-2">
        Танхимын сургалт
      </h2>
      <p className="text-gray-400 mb-8">
        Биечлэн суралцах офлайн HSK 1–6 сургалтууд
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {offlineCourses.map((course, index) => (
          <div
            key={index}
            className={`rounded-2xl p-6 text-white bg-gradient-to-br ${course.color}
            border border-white/10 hover:-translate-y-1 transition`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{course.level}</h3>
              <span className="bg-black/30 px-3 py-1 rounded-full text-xs">
                OFFLINE
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <p>📅 Эхлэх: {course.startDate}</p>
              <p>⏳ Дуусах: {course.endDate}</p>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-2xl font-bold">{course.price}</span>

              <button
                onClick={() => router.push("/contact")}
                className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200"
              >
                Бүртгүүлэх
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

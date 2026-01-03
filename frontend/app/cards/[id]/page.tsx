"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import data from "../../../public/data/data.json";

/* ================= TYPES ================= */

interface Chapter {
  id: number;
  title: string;
  date: string;
  comments: number;
  video?: string;
}

interface Course {
  id: number;
  title: string;
  icon: string;
  rating: number;
  students: number;
  price: number;
  lessons: number;
  duration: string;
  level: string;
  longDescription: string;
  chapters?: Chapter[];
}

/* ================= COMPONENT ================= */

export default function CardDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [course, setCourse] = useState<Course | null>(null);
  const [video, setVideo] = useState<string | null>(null);

  /* ================= LOAD ================= */

  useEffect(() => {
    const found = data.courses.find((c) => c.id === Number(id));
    setCourse(found || null);
  }, [id]);

  /* ================= NOT FOUND ================= */

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button onClick={() => router.push("/cards")}>← Back</button>
      </div>
    );
  }

  /* ================= RENDER ================= */

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">

        {/* LEFT */}
        <div>
          <div className="bg-black rounded-xl overflow-hidden">
            {video ? (
              <video controls src={video} className="w-full" />
            ) : (
              <div className="bg-white p-12 flex justify-center">
                <span className="text-8xl">{course.icon}</span>
              </div>
            )}
          </div>

          {course.chapters && (
            <div className="mt-6 bg-[#1c1c1c] rounded-xl overflow-hidden">
              {course.chapters.map((ch) => (
                <div
                  key={ch.id}
                  onClick={() => ch.video && setVideo(ch.video)}
                  className="px-5 py-4 border-b border-gray-700 hover:bg-[#2a2a2a] cursor-pointer"
                >
                  <p className="text-gray-400 text-sm">
                    #{ch.id} · {ch.date}
                  </p>
                  <p className="text-white">{ch.title}</p>
                  <p className="text-gray-500 text-xs">💬 {ch.comments}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-xl shadow p-6">
          <button
            onClick={() => router.back()}
            className="mb-4 text-sm bg-gray-200 px-3 py-1 rounded"
          >
            ← Back
          </button>

          <h1 className="text-2xl font-semibold mb-2">{course.title}</h1>

          <div className="flex items-center gap-2 mb-4">
            <span className="font-bold text-orange-500">{course.rating}</span>
            <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
            <span className="text-sm text-blue-600">({course.students})</span>
          </div>

          <p className="text-3xl font-bold text-red-600 mb-4">
            ${course.price}
          </p>

          <ul className="text-sm text-gray-700 space-y-2 mb-6">
            <li>📚 Lessons: {course.lessons}</li>
            <li>⏱ Duration: {course.duration}</li>
            <li>🎯 Level: {course.level}</li>
            <li>{course.longDescription}</li>
          </ul>

          <button className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-lg font-medium">
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
}

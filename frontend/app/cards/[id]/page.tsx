"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

/* ================= TYPES ================= */

interface Vocabulary {
  hanzi: string;
  pinyin: string;
  mongolian: string;
}

interface Chapter {
  id: number;
  title: string;
  date: string;
  comments: number;
  video?: string;
  vocabulary?: Vocabulary[];
}

interface Course {
  id: number;
  title: string;
  description: string;
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
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [video, setVideo] = useState<string | null>(null);

  /* ================= LOAD ================= */

  useEffect(() => {
    const loadCourse = async () => {
      try {
        // Import data from JSON
        const data = await import("../../../public/data/data.json");
        const found = data.default.courses.find((c: Course) => c.id === Number(id));
        
        if (found) {
          setCourse(found);
          
          // Save to viewing history
          saveToHistory(found);
        }
      } catch (error) {
        console.error("Error loading course:", error);
      }
    };

    loadCourse();
  }, [id]);

  /* ================= SAVE TO HISTORY ================= */

  const saveToHistory = (courseData: Course) => {
    try {
      // Get current user from localStorage
      const loggedInUser = localStorage.getItem('user');
      if (!loggedInUser) return;

      const { email } = JSON.parse(loggedInUser);
      const historyKey = `viewHistory_${email}`;

      // Get existing history
      const existingHistory = localStorage.getItem(historyKey);
      let history = existingHistory ? JSON.parse(existingHistory) : [];

      // Create history item
      const historyItem = {
        id: courseData.id,
        title: courseData.title,
        description: courseData.description,
        icon: courseData.icon,
        level: courseData.level,
        duration: courseData.duration,
        viewedAt: new Date().toISOString()
      };

      // Remove if already exists (to update timestamp)
      history = history.filter((item: any) => item.id !== courseData.id);

      // Add to beginning of array
      history.unshift(historyItem);

      // Keep only last 20 items
      if (history.length > 20) {
        history = history.slice(0, 20);
      }

      // Save to localStorage
      localStorage.setItem(historyKey, JSON.stringify(history));
    } catch (error) {
      console.error("Error saving to history:", error);
    }
  };

  /* ================= NOT FOUND ================= */

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={() => router.push("/cards")}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          ← Back
        </button>
      </div>
    );
  }

  /* ================= HANDLER ================= */

  const handleChapterClick = (ch: Chapter) => {
    setActiveChapter(ch);
    if (ch.video) setVideo(ch.video);
  };

  /* ================= RENDER ================= */

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">

        {/* LEFT */}
        <div>
          {/* Video or Icon */}
          <div className="bg-black rounded-xl overflow-hidden">
            {video ? (
              <video controls src={video} className="w-full" />
            ) : (
              <div className="bg-white p-12 flex justify-center">
                <span className="text-8xl">{course.icon}</span>
              </div>
            )}
          </div>

          {/* Chapters */}
          {course.chapters && (
            <div className="mt-6 bg-[#1c1c1c] rounded-xl overflow-hidden">
              {course.chapters.map((ch) => (
                <div
                  key={ch.id}
                  onClick={() => handleChapterClick(ch)}
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

          {/* Active Chapter Vocabulary */}
          {activeChapter?.vocabulary && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
              <h3 className="font-semibold mb-3 text-lg">
                📝 {activeChapter.title} Vocabulary
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {activeChapter.vocabulary.map((word, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3 rounded border border-gray-200 shadow-sm text-center"
                  >
                    <div className="text-2xl font-bold mb-1">{word.hanzi}</div>
                    <div className="text-sm text-blue-600 mb-1">{word.pinyin}</div>
                    <div className="text-xs text-gray-700">{word.mongolian}</div>
                  </div>
                ))}
              </div>
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
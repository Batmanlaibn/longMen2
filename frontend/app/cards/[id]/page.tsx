"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import data from "../../../data/data.json"; // make sure the path is correct

/* ================= TYPES ================= */

interface Chapter {
  id: number;
  title: string;
  video: string;
  date: string;
  comments: number;
}

interface CardDetail {
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
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const idParam = params?.id;

  const [card, setCard] = useState<CardDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  /* ================= DATA LOAD ================= */

  useEffect(() => {
    if (!idParam) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const cards = data as CardDetail[];
      const found = cards.find((c) => c.id === Number(idParam));
      setCard(found || null);
    } catch (err) {
      console.error("Failed to load data:", err);
      setCard(null);
    } finally {
      setLoading(false);
    }
  }, [idParam]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading course details...</p>
        </div>
      </div>
    );
  }

  /* ================= NOT FOUND ================= */

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Course Not Found</h2>
          <p className="text-gray-600 mb-6">
            The course you are looking for does not exist or has been removed.
          </p>
          <button
            onClick={() => router.push("/cards")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            ← Back to Courses
          </button>
        </div>
      </div>
    );
  }

  /* ================= RENDER ================= */

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <div>
          {/* IMAGE / VIDEO PLAYER */}
          <div className="bg-black border rounded-xl overflow-hidden">
            {selectedVideo ? (
              <video key={selectedVideo} controls className="w-full h-auto" src={selectedVideo}>
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="bg-white p-10 flex justify-center">
                <span className="text-9xl">{card.icon}</span>
              </div>
            )}
          </div>

          {/* CHAPTER LIST */}
          {card.chapters && (
            <div className="mt-8 bg-[#1c1c1c] rounded-xl overflow-hidden">
              <div className="flex justify-between items-center px-5 py-4 border-b border-gray-700">
                <h3 className="text-white font-semibold text-lg">Chapter List</h3>
                <span className="text-gray-400 text-sm cursor-pointer">⇅</span>
              </div>

              {card.chapters.map((ch) => (
                <div
                  key={ch.id}
                  onClick={() => setSelectedVideo(ch.video)}
                  className={`flex items-center justify-between px-5 py-4 border-b border-gray-800 hover:bg-[#2a2a2a] cursor-pointer transition ${
                    selectedVideo === ch.video ? "bg-[#2a2a2a]" : ""
                  }`}
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-14 bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-xl">{card.icon}</span>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm">
                        #{String(ch.id).padStart(3, "0")} · {ch.date}
                      </p>
                      <p className="text-white font-medium">{ch.title}</p>
                      <p className="text-gray-500 text-xs">💬 {ch.comments}</p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="text-white text-xl">{selectedVideo === ch.video ? "▶" : "⋯"}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white rounded-xl shadow p-6 order-1 lg:order-2">
          {/* BACK BUTTON */}
          <button
            onClick={() => router.back()}
            className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
          >
            ← Back
          </button>

          <h1 className="text-2xl font-normal mb-2">{card.title}</h1>

          <p className="text-blue-600 text-sm mb-3 cursor-pointer hover:underline">Visit the HSK Learning Store</p>

          {/* RATING */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-orange-500 font-bold">{card.rating}</span>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(card.rating) ? "fill-orange-400 text-orange-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-blue-600">({card.students})</span>
          </div>

          <hr className="my-4" />

          {/* PRICE */}
          <p className="text-3xl font-bold text-red-600 mb-4">${card.price}</p>

          {/* SPECIFICATIONS */}
          <ul className="text-sm text-gray-700 space-y-2 mb-6">
            <li>📚 Lessons: {card.lessons}</li>
            <li>⏱ Duration: {card.duration}</li>
            <li>🎯 Level: {card.level}</li>
            <li>📝 {card.longDescription}</li>
          </ul>

          <button className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-lg font-medium transition">
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
}

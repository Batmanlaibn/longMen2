"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, Star, ShoppingCart, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import OfflineCourse from "../cards/classroom_training/page";

/* ================= TYPES ================= */

interface CardItem {
  id: number;
  title: string;
  description: string;
  level: string;
  rating: number;
  price: number;
  image: string;
  icon: string;
}



/* ================= COMPONENT ================= */

export default function CardGridSystem() {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const router = useRouter();


  /* ================= LOAD DATA ================= */

  useEffect(() => {
    import("../../public/data/data.json")
      .then((module) => {
        const json = module.default || module;
        setCards(json.courses as CardItem[]);
      })
      .catch(console.error);
  }, []);




  /* ================= LIKE ================= */

  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  /* ================= LOADING ================= */

  if (!cards.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">HSK Courses</h1>
        <p className="text-gray-400">Choose your level and start learning</p>
      </div>

      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => router.push(`/cards/${card.id}`)}
            className="cursor-pointer bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:-translate-y-1 transition"
          >
            {/* IMAGE */}
            <div className={`${card.image} h-44 flex items-center justify-center relative`}>
              <span className="text-6xl">{card.icon}</span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(card.id);
                }}
                className="absolute top-3 right-3 bg-black/30 p-2 rounded-full"
              >
                <Heart
                  className={`w-5 h-5 ${
                    liked.has(card.id)
                      ? "fill-red-500 text-red-500"
                      : "text-white"
                  }`}
                />
              </button>

              <span className="absolute top-3 left-3 bg-black/40 text-white text-xs px-3 py-1 rounded-full">
                {card.level}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-5">
              <h3 className="text-white font-semibold mb-1">{card.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{card.description}</p>

              <div className="flex items-center gap-1 mb-4">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-white">{card.rating}</span>
              </div>

              <div className="flex items-center justify-between border-t border-gray-700 pt-3">
                <span className="text-xl font-bold text-white">${card.price}</span>

                <div className="flex gap-2">
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="bg-gray-700 p-2 rounded-lg"
                  >
                    <BookOpen className="w-5 h-5 text-white" />
                  </button>

                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="bg-blue-600 px-4 py-2 rounded-lg text-white text-sm flex items-center gap-1"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <OfflineCourse />


      

    </div>
  );
}

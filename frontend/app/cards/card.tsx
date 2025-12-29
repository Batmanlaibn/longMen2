"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Star, ShoppingCart, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

/* ================= TYPES ================= */

interface CardItem {
  id: number | string;
  title: string;
  description: string;
  level: string;
  rating: number;
  price: number;
  image: string; // tailwind class (bg-gradient etc.)
  icon: string;  // emoji эсвэл text
}

/* ================= COMPONENT ================= */

const CardGridSystem: React.FC = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [likedCards, setLikedCards] = useState<Set<CardItem["id"]>>(new Set());
  const router = useRouter();

  /* ================= DATA LOAD ================= */

  useEffect(() => {
    import("../../data/data.json")
      .then((data) => {
        setCards((data.default || data) as CardItem[]);
      })
      .catch((err) => console.error("Failed to load cards:", err));
  }, []);

  /* ================= HANDLERS ================= */

  const toggleLike = (id: CardItem["id"]) => {
    setLikedCards((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  /* ================= LOADING ================= */

  if (!cards.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          HSK Study Materials
        </h1>
        <p className="text-gray-400">
          Master Chinese with our comprehensive flashcard system
        </p>
      </div>

      {/* Card Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => router.push(`/cards/${card.id}`)}
            className="cursor-pointer bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-700"
          >
            {/* Image */}
            <div
              className={`${card.image} h-48 flex items-center justify-center relative`}
            >
              <span className="text-6xl">{card.icon}</span>

              {/* Like */}
              <button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  toggleLike(card.id);
                }}
                className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30"
              >
                <Heart
                  className={`w-5 h-5 ${
                    likedCards.has(card.id)
                      ? "fill-red-500 text-red-500"
                      : "text-white"
                  }`}
                />
              </button>

              <div className="absolute top-3 left-3 bg-black/30 px-3 py-1 rounded-full">
                <span className="text-white text-sm">{card.level}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                {card.title}
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                {card.description}
              </p>

              <div className="flex items-center gap-1 mb-4">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-white">{card.rating}</span>
                <span className="text-gray-500 text-xs">/5</span>
              </div>

              <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                <span className="text-2xl font-bold text-white">
                  ${card.price}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      e.stopPropagation()
                    }
                    className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg"
                  >
                    <BookOpen className="w-5 h-5 text-white" />
                  </button>

                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      e.stopPropagation()
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-500 text-sm mt-10">
        Built with Next.js & Tailwind CSS
      </p>
    </div>
  );
};

export default CardGridSystem;

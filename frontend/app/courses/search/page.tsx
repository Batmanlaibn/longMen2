"use client";

import React from "react";
import { Search, Filter } from "lucide-react";

/* ================= TYPES ================= */

interface CourseFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  selectedLevel: string;
  setSelectedLevel: (value: string) => void;

  sortBy: string;
  setSortBy: (value: string) => void;

  levels: string[];
}

/* ================= COMPONENT ================= */

const CourseFilters: React.FC<CourseFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedLevel,
  setSelectedLevel,
  sortBy,
  setSortBy,
  levels,
}) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
            </div>

            {/* Level Filter */}
            <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none appearance-none"
                >
                    {levels.map((level) => (
                    <option key={level} value={level}>
                        {level}
                    </option>
                    ))}
                </select>
            </div>

            {/* Sort */}
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                <option value="level">Sort by Level</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="popular">Most Popular</option>
            </select>
        </div>
    </div>
  );
};

export default CourseFilters;

"use client";

import React from "react";
import CardGridSystem from "../../cards/card";
import CourseFilters from "../search/page";

/* ================= TYPES ================= */

interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  price: number;
  rating: number;
  students: number;
}

interface FiltersGridProps {
  courses: Course[];
  filteredCourses: Course[];

  searchTerm: string;
  setSearchTerm: (v: string) => void;

  selectedLevel: string;
  setSelectedLevel: (v: string) => void;

  sortBy: string;
  setSortBy: (v: string) => void;

  levels: string[];
}

/* ================= COMPONENT ================= */

const FiltersGrid: React.FC<FiltersGridProps> = ({
  courses,
  filteredCourses,
  searchTerm,
  setSearchTerm,
  selectedLevel,
  setSelectedLevel,
  sortBy,
  setSortBy,
  levels,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Filters */}
      <CourseFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        sortBy={sortBy}
        setSortBy={setSortBy}
        levels={levels}
      />

      {/* Result Count */}
      <p className="text-gray-400 mb-6">
        Showing {filteredCourses.length} of {courses.length} courses
      </p>

      {/* Grid */}
      <CardGridSystem />
      {/* <CardGridSystem courses={filteredCourses} /> */}
    </div>
  );
};

export default FiltersGrid;

"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Star, Clock, GraduationCap, Users, ChevronRight, Filter, Search } from "lucide-react";
import Header from "../components/header";

/* ================= TYPES ================= */

interface Course {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  level: string;
  rating: number;
  price: number;
  duration: string;
  lessons: number;
  students: number;
  image: string;
  icon: string;
}

/* ================= COMPONENT ================= */

const HSKCoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("level");

  /* ================= DATA LOAD ================= */

  useEffect(() => {
    // Simulating data load - replace with your actual data source
    const mockData: Course[] = [
      {
        id: 1,
        title: "HSK 1 Vocabulary Cards",
        shortTitle: "HSK 1",
        description: "150 essential Chinese characters",
        longDescription: "This course covers the most common 150 Chinese characters, basic pronunciation, and simple sentence structures for absolute beginners.",
        level: "Beginner",
        rating: 4.8,
        price: 29,
        duration: "4 weeks",
        lessons: 20,
        students: 1200,
        image: "bg-gradient-to-br from-blue-400 to-purple-500",
        icon: "📚"
      },
      {
        id: 2,
        title: "HSK 2 Grammar Essentials",
        shortTitle: "HSK 2",
        description: "Core grammar patterns and structures",
        longDescription: "Focuses on sentence building, daily conversation grammar, and essential structures used in everyday Chinese.",
        level: "Elementary",
        rating: 4.7,
        price: 39,
        duration: "5 weeks",
        lessons: 25,
        students: 980,
        image: "bg-gradient-to-br from-green-400 to-teal-500",
        icon: "✏️"
      },
      {
        id: 3,
        title: "HSK 3 Reading Practice",
        shortTitle: "HSK 3",
        description: "Intermediate reading comprehension",
        longDescription: "Improves reading speed and understanding through real-world texts, short stories, and exam-style questions.",
        level: "Intermediate",
        rating: 4.9,
        price: 49,
        duration: "6 weeks",
        lessons: 30,
        students: 860,
        image: "bg-gradient-to-br from-orange-400 to-red-500",
        icon: "📖"
      },
      {
        id: 4,
        title: "HSK 4 Listening Skills",
        shortTitle: "HSK 4",
        description: "Audio lessons and exercises",
        longDescription: "Advanced listening practice with native speakers, exam simulations, and real-life conversations.",
        level: "Upper-Intermediate",
        rating: 4.6,
        price: 59,
        duration: "6 weeks",
        lessons: 32,
        students: 640,
        image: "bg-gradient-to-br from-pink-400 to-purple-500",
        icon: "🎧"
      },
      {
        id: 5,
        title: "HSK 5 Advanced Writing",
        shortTitle: "HSK 5",
        description: "Essay and composition practice",
        longDescription: "Master advanced writing skills, formal essays, argument structure, and exam-focused writing techniques.",
        level: "Advanced",
        rating: 4.8,
        price: 69,
        duration: "7 weeks",
        lessons: 35,
        students: 420,
        image: "bg-gradient-to-br from-yellow-400 to-orange-500",
        icon: "✍️"
      },
      {
        id: 6,
        title: "HSK 6 Master Course",
        shortTitle: "HSK 6",
        description: "Complete mastery preparation",
        longDescription: "Full mastery course including advanced reading, listening, writing, mock exams, and real-life usage.",
        level: "Mastery",
        rating: 5.0,
        price: 99,
        duration: "8 weeks",
        lessons: 40,
        students: 210,
        image: "bg-gradient-to-br from-indigo-400 to-blue-500",
        icon: "🏆"
      }
    ];

    setCourses(mockData);
    setFilteredCourses(mockData);
  }, []);

  /* ================= FILTERING & SORTING ================= */

  useEffect(() => {
    let result = [...courses];

    // Filter by level
    if (selectedLevel !== "All") {
      result = result.filter(course => course.level === selectedLevel);
    }

    // Filter by search term
    if (searchTerm) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortBy === "level") {
      result.sort((a, b) => a.id - b.id);
    } else if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "popular") {
      result.sort((a, b) => b.students - a.students);
    }

    setFilteredCourses(result);
  }, [selectedLevel, searchTerm, sortBy, courses]);

  const levels = ["All", "Beginner", "Elementary", "Intermediate", "Upper-Intermediate", "Advanced", "Mastery"];

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Header />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">HSK Chinese Courses</h1>
          <p className="text-xl text-blue-100 mb-6">
            Master Mandarin Chinese from beginner to advanced with our comprehensive HSK courses
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <BookOpen className="w-5 h-5" />
              <span>6 Complete Courses</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <Users className="w-5 h-5" />
              <span>4,310+ Students</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
              <span>4.8 Average Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
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
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none appearance-none"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
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

        {/* Results Count */}
        <div className="text-gray-400 mb-6">
          Showing {filteredCourses.length} of {courses.length} courses
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 group"
            >
              {/* Course Header */}
              <div className={`${course.image} h-48 flex items-center justify-center relative`}>
                <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                  {course.icon}
                </span>
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-white text-sm font-medium">{course.level}</span>
                </div>
                <div className="absolute top-4 right-4 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-sm">{course.rating}</span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {course.shortTitle}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{course.students}</span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div>
                    <span className="text-3xl font-bold text-white">${course.price}</span>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/50">
                    <span className="font-medium">Enroll</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No courses found</h3>
            <p className="text-gray-400">Try adjusting your filters or search term</p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto px-4 py-12 border-t border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <GraduationCap className="w-12 h-12 text-blue-500 mx-auto mb-3" />
            <h4 className="text-white font-semibold mb-2">Expert Instruction</h4>
            <p className="text-gray-400 text-sm">Learn from certified HSK instructors</p>
          </div>
          <div>
            <BookOpen className="w-12 h-12 text-purple-500 mx-auto mb-3" />
            <h4 className="text-white font-semibold mb-2">Comprehensive Materials</h4>
            <p className="text-gray-400 text-sm">All materials included in each course</p>
          </div>
          <div>
            <Star className="w-12 h-12 text-yellow-500 mx-auto mb-3 fill-current" />
            <h4 className="text-white font-semibold mb-2">Proven Results</h4>
            <p className="text-gray-400 text-sm">High success rate in HSK exams</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HSKCoursesPage;
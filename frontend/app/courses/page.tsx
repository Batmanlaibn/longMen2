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

interface OfflineCourse {
  level: string;
  price: string;
  startDate: string;
  endDate: string;
  color: string;
}

/* ================= MAIN COMPONENT ================= */

const HSKCoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [offlineCourses, setOfflineCourses] = useState<OfflineCourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("level");
  const [loading, setLoading] = useState<boolean>(true);

  /* ================= DATA LOAD FROM JSON ================= */

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/data/data.json"); // root-relative URL

        if (!response.ok) {
          throw new Error("Failed to load data.json");
        }

        const data = await response.json();

        setCourses(data.courses);
        setFilteredCourses(data.courses);
        setOfflineCourses(data.offlineCourses ?? []);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);



  /* ================= FILTERING & SORTING ================= */

  useEffect(() => {
    let result = [...courses];

    if (selectedLevel !== "All") {
      result = result.filter(course => course.level === selectedLevel);
    }

    if (searchTerm) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      {/* Hero Section - Online сургалт */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Online HSK Courses</h1>
          <p className="text-xl text-blue-100 mb-6">
            Master Mandarin Chinese from beginner to advanced with our comprehensive HSK courses
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <BookOpen className="w-5 h-5" />
              <span>{courses.length} Complete Courses</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <Users className="w-5 h-5" />
              <span>{courses.reduce((sum, c) => sum + c.students, 0)}+ Students</span>
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

        <div className="text-gray-400 mb-6">
          Showing {filteredCourses.length} of {courses.length} courses
        </div>

        {/* Online Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 group"
            >
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

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {course.shortTitle}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

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

        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No courses found</h3>
            <p className="text-gray-400">Try adjusting your filters or search term</p>
          </div>
        )}
      </div>

      {/* Таны сургалт Section - Танхимын сургалт */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl p-8 border border-purple-500/30 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-purple-400" />
            Таны сургалт - Танхимын сургалт
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {offlineCourses.map((course, index) => (
              <div 
                key={index}
                className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className={`bg-gradient-to-r ${course.color} text-white text-center py-3 px-4 rounded-lg mb-4 font-bold text-lg`}>
                  {course.level}
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-4">{course.price}</div>
                  <div className="bg-gray-700/50 rounded-lg p-3 mb-3 text-left">
                    <div className="text-xs text-gray-400 mb-1">Эхлэх огноо:</div>
                    <div className="text-sm text-white font-medium">{course.startDate}</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3 mb-3 text-left">
                    <div className="text-xs text-gray-400 mb-1">Дуусах огноо:</div>
                    <div className="text-sm text-white font-medium">{course.endDate}</div>
                  </div>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 font-medium flex items-center justify-center gap-2">
                    <span>Бүртгүүлэх</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
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
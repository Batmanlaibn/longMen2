"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/header";
import OfflineCourse from "../cards/classroom_training/page";

/* ===== New Components ===== */
import OnlineCoursesHero from "./courses_header/page";
import FiltersGrid from "./filters_grid/page";
import HSKCourseDetails from "../hanzi/page";
import CourseFooterInfo from "./courses_footer/page";

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
  chapters?: Chapter[];
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
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("level");
  const [loading, setLoading] = useState(true);

  const levels = [
    "All",
    "Beginner",
    "Elementary",
    "Intermediate",
    "Upper-Intermediate",
    "Advanced",
    "Mastery",
  ];

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/data/data.json");
        const data = await res.json();

        setCourses(data.courses);
        setFilteredCourses(data.courses);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /* ================= FILTER & SORT ================= */

  useEffect(() => {
    let result = [...courses];

    if (selectedLevel !== "All") {
      result = result.filter((c) => c.level === selectedLevel);
    }

    if (searchTerm) {
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        result.sort((a, b) => b.students - a.students);
        break;
      default:
        result.sort((a, b) => a.id - b.id);
    }

    setFilteredCourses(result);
  }, [courses, selectedLevel, searchTerm, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-xl">
        Loading...
      </div>
    );
  }

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />

      {/* Hero */}
      <OnlineCoursesHero
        totalCourses={courses.length}
        totalStudents={courses.reduce((s, c) => s + c.students, 0)}
      />

      <FiltersGrid
        courses={courses}
        filteredCourses={filteredCourses}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        sortBy={sortBy}
        setSortBy={setSortBy}
        levels={levels}
      />

      {/* Offline Courses */}
      <OfflineCourse />

      {/* Course Details */}
      <HSKCourseDetails courses={courses} />

      {/* Footer Info */}
      <CourseFooterInfo />
    </div>
  );
};

export default HSKCoursesPage;

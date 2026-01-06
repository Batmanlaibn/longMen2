"use client";

import React from "react";
import { BookOpen, Star, Users } from "lucide-react";

/* ================= TYPES ================= */

interface OnlineCoursesHeroProps {
    totalCourses: number;
    totalStudents: number;
    averageRating?: number;
}

/* ================= COMPONENT ================= */

const OnlineCoursesHero: React.FC<OnlineCoursesHeroProps> = ({
    totalCourses,
    totalStudents,
    averageRating = 4.8,
}) => {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Online HSK Courses
                </h1>

                <p className="text-xl text-blue-100 mb-6">
                    Master Mandarin Chinese from beginner to advanced with our comprehensive HSK courses
                </p>

                <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                        <BookOpen className="w-5 h-5" />
                        <span>{totalCourses} Complete Courses</span>
                    </div>

                    <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                        <Users className="w-5 h-5" />
                        <span>{totalStudents}+ Students</span>
                    </div>

                    <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                        <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                        <span>{averageRating} Average Rating</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnlineCoursesHero;

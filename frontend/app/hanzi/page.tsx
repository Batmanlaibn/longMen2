"use client";

import React from "react";

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
  vocabulary?: Vocabulary[];
}

interface Course {
  id: number;
  shortTitle: string;
  lessons: number;
  duration: string;
  icon: string;
  chapters?: Chapter[];
}

interface HSKCourseDetailsProps {
  courses: Course[];
}

/* ================= COMPONENT ================= */

const HSKCourseDetails: React.FC<HSKCourseDetailsProps> = ({ courses }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 border-t border-gray-800">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        HSK Хичээлийн Дэлгэрэнгүй
      </h2>

      <div className="space-y-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            {/* Course Header */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{course.icon}</span>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {course.shortTitle}
                </h3>
                <p className="text-gray-400">
                  {course.lessons} хичээл • {course.duration}
                </p>
              </div>
            </div>

            {/* Chapters */}
            {course.chapters && course.chapters.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-white mb-3">
                  Хичээлүүд:
                </h4>

                <div className="space-y-3">
                  {course.chapters.map((chapter) => (
                    <div
                      key={chapter.id}
                      className="bg-gray-700/50 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="text-white font-medium">
                          {chapter.title}
                        </h5>
                        <span className="text-sm text-gray-400">
                          {chapter.date}
                        </span>
                      </div>

                      {/* Vocabulary */}
                      {chapter.vocabulary && chapter.vocabulary.length > 0 && (
                        <div className="mt-3 border-t border-gray-600 pt-3">
                          <p className="text-sm text-gray-400 mb-2">
                            Үгийн сан ({chapter.vocabulary.length} үг):
                          </p>

                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                            {chapter.vocabulary.map((word, idx) => (
                              <div
                                key={idx}
                                className="bg-gray-800 rounded-lg p-3 border border-gray-600 hover:border-blue-500 transition-all duration-300"
                              >
                                <div className="text-3xl text-center mb-2">
                                  {word.hanzi}
                                </div>
                                <div className="text-center">
                                  <p className="text-blue-400 text-sm font-medium">
                                    {word.pinyin}
                                  </p>
                                  <p className="text-gray-400 text-xs mt-1">
                                    {word.mongolian}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HSKCourseDetails;

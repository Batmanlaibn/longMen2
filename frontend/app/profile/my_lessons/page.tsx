"use client";

import React from "react";
import { Video, Users, Calendar, MapPin, Clock } from "lucide-react";

const MyLessons = ({ courses, getLevelColor }) => {
  return (
    <div className="space-y-4">
      {courses && courses.length > 0 ? (
        courses.map(course => (
          <div key={course.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    {course.type === "online" ? <Video className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                    <span>{course.type === "online" ? "Онлайн" : "Танхим"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{course.schedule}</span>
                  </div>
                  {course.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{course.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all" style={{ width: `${course.progress}%` }} />
                </div>
                <p className="text-sm text-gray-600 mt-1">{course.progress}% гүйцэтгэл</p>
              </div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                Үргэлжлүүлэх
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">Одоогоор хичээл байхгүй байна</div>
      )}
    </div>
  );
};

export default MyLessons;

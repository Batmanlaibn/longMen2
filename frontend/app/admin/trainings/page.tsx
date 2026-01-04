import React from "react";
import { Users, Clock, DollarSign } from "lucide-react";

/* ================= TYPES ================= */

export interface Course {
  id: number;
  title: string;
  level: string;
  students: number;
  duration: string;
  price: number;
}

interface CoursesProps {
  courses: Course[];
}

/* ================= COMPONENT ================= */

const Courses: React.FC<CoursesProps> = ({ courses }) => {
  return (
    <div className="space-y-6">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Сургалтууд</h2>
      </div>

      {/* ===== COURSE CARDS ===== */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map(course => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  {course.title}
                </h3>
                <span className="text-xs text-gray-500">
                  {course.level}
                </span>
              </div>

              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                Идэвхтэй
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{course.students} сурагч</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>${course.price}</span>
              </div>
            </div>
          </div>
        ))}

        {(!courses || courses.length === 0) && (
          <div className="col-span-full text-center text-gray-500 py-10">
            Сургалт олдсонгүй
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;

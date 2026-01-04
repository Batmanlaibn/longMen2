"use client";

import React, { useState } from "react";
import { BookOpen, Trash2, Plus, Save } from "lucide-react";

interface Chapter {
  id: number;
  title: string;
  date: string;
  comments: number;
  video?: string;
}

interface Course {
  id: number;
  title: string;
  icon: string;
  rating: number;
  students: number;
  price: number;
  lessons: number;
  duration: string;
  level: string;
  longDescription: string;
  chapters?: Chapter[];
}

interface CoursesSettingsProps {
  courses: Course[];
  updateCourses: (courses: Course[]) => void;
  handleSaveCourses: () => void;
}

export default function CoursesSettings({
  courses,
  updateCourses,
  handleSaveCourses,
}: CoursesSettingsProps) {
  const [localCourses, setLocalCourses] = useState<Course[]>([...courses]);

  const updateCourseField = (index: number, field: keyof Course, value: any) => {
    const updated = [...localCourses];
    updated[index][field] = value;
    setLocalCourses(updated);
  };

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now(),
      title: "Шинэ курс",
      icon: "📚",
      rating: 0,
      students: 0,
      price: 0,
      lessons: 0,
      duration: "0 weeks",
      level: "Beginner",
      longDescription: "",
      chapters: [],
    };
    setLocalCourses([...localCourses, newCourse]);
  };

  const deleteCourse = (index: number) => {
    const updated = [...localCourses];
    updated.splice(index, 1);
    setLocalCourses(updated);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Courses тохиргоо</h2>

      <div className="space-y-6 bg-white p-6 rounded-xl shadow-md">
        {localCourses.map((course, index) => (
          <div key={course.id} className="border-b border-gray-200 pb-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800">{course.title}</h3>
              <button
                onClick={() => deleteCourse(index)}
                className="text-red-500 p-1 rounded hover:bg-red-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Title"
                value={course.title}
                onChange={(v) => updateCourseField(index, "title", v)}
              />
              <Input
                label="Icon"
                value={course.icon}
                onChange={(v) => updateCourseField(index, "icon", v)}
              />
              <Input
                label="Level"
                value={course.level}
                onChange={(v) => updateCourseField(index, "level", v)}
              />
              <Input
                label="Price"
                value={course.price}
                onChange={(v) =>
                  updateCourseField(index, "price", Number(v))
                }
              />
              <Input
                label="Lessons"
                value={course.lessons}
                onChange={(v) =>
                  updateCourseField(index, "lessons", Number(v))
                }
              />
              <Input
                label="Duration"
                value={course.duration}
                onChange={(v) => updateCourseField(index, "duration", v)}
              />
              <Textarea
                label="Long Description"
                value={course.longDescription}
                onChange={(v) =>
                  updateCourseField(index, "longDescription", v)
                }
              />
            </div>
          </div>
        ))}

        <button
          onClick={addCourse}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          <Plus className="w-4 h-4" /> Add Course
        </button>

        <button
          onClick={() => {
            updateCourses(localCourses);
            handleSaveCourses();
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Save className="w-4 h-4" /> Save All
        </button>
      </div>
    </div>
  );
}

/* ===== REUSABLE UI ===== */
const Input = ({ label, value, onChange }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const Textarea = ({ label, value, onChange }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      rows={2}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

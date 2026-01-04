import React from "react";
import { Mail, Phone, Award } from "lucide-react";

/* ================= TYPES ================= */

interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: number;
  avatar: string;
  hskLevels: string[];
  bio: string;
}

interface TeachersPanelProps {
  teachers: Teacher[];
}

/* ================= COMPONENT ================= */

const TeachersPanel: React.FC<TeachersPanelProps> = ({ teachers }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Багш нар</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl">{teacher.avatar}</div>
              <div>
                <h3 className="font-bold text-gray-900">
                  {teacher.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {teacher.specialization}
                </p>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-gray-600 mb-4">
              {teacher.bio}
            </p>

            {/* Info */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-500" />
                <span>{teacher.experience} жилийн туршлага</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>{teacher.email}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{teacher.phone}</span>
              </div>
            </div>

            {/* HSK Levels */}
            <div className="mt-4 flex flex-wrap gap-2">
              {teacher.hskLevels.map((level) => (
                <span
                  key={level}
                  className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700"
                >
                  {level}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeachersPanel;

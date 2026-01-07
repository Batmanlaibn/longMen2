import React from "react";

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

interface Props {
  teachers: Teacher[];
}

const TeachersSection: React.FC<Props> = ({ teachers }) => {
  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        Манай багш нар
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition"
          >
            <div className="text-5xl mb-4">{teacher.avatar}</div>

            <h3 className="text-xl font-semibold">{teacher.name}</h3>
            <p className="text-sm text-gray-500 mb-2">
              {teacher.specialization}
            </p>

            <p className="text-gray-600 text-sm mb-3">
              {teacher.bio}
            </p>

            <div className="text-sm text-gray-700 space-y-1">
              <p>📞 {teacher.phone}</p>
              <p>✉️ {teacher.email}</p>
              <p>🎓 Туршлага: {teacher.experience} жил</p>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {teacher.hskLevels.map((level) => (
                <span
                  key={level}
                  className="px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full"
                >
                  {level}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeachersSection;

import { Star } from "lucide-react";
import { useRouter } from "next/navigation";



interface Teacher {
  id: number;
  name: string;
  hskLevels: string[];
}

interface Course {
  title: string;
  rating: number;
  students: number;
  price: number;
  lessons: number;
  duration: string;
  level: string;
  longDescription: string;
  shortTitle: string; // "HSK 1" гэх мэт
}

interface Props {
  course: Course;
  teachers: Teacher[]; // 👈 тусад нь
}

export default function CourseInfo({ course, teachers }: Props) {
  const router = useRouter();

  // тухайн course-д таарах багш нар
  const courseTeachers = teachers.filter((t) =>
    t.hskLevels.includes(course.shortTitle)
  );

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <button
        onClick={() => router.back()}
        className="mb-4 text-sm bg-gray-200 px-3 py-1 rounded"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-semibold mb-2">{course.title}</h1>

      <div className="flex items-center gap-2 mb-4">
        <span className="font-bold text-orange-500">{course.rating}</span>
        <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
        <span className="text-sm text-blue-600">({course.students})</span>
      </div>

      <p className="text-3xl font-bold text-red-600 mb-4">${course.price}</p>

      <ul className="text-sm text-gray-700 space-y-2 mb-6">
        <li>📚 Lessons: {course.lessons}</li>
        <li>⏱ Duration: {course.duration}</li>
        <li>🎯 Level: {course.level}</li>

        <li>
          👨‍🏫 Teachers:
          {courseTeachers.length > 0 ? (
            <ul className="ml-6 list-disc mt-1">
              {courseTeachers.map((teacher) => (
                <li key={teacher.id}>{teacher.name}</li>
              ))}
            </ul>
          ) : (
            <span className="ml-2 text-gray-400">
              Багш оноогоогүй
            </span>
          )}
        </li>

        <li className="pt-2 text-gray-600">{course.longDescription}</li>
      </ul>

      <button className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-lg font-medium">
        Start Learning
      </button>
    </div>
  );
}


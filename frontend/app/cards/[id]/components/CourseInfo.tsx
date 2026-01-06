import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

interface Course {
  title: string;
  rating: number;
  students: number;
  price: number;
  lessons: number;
  duration: string;
  level: string;
  longDescription: string;
}

interface Props {
  course: Course;
}

export default function CourseInfo({ course }: Props) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <button onClick={() => router.back()} className="mb-4 text-sm bg-gray-200 px-3 py-1 rounded">← Back</button>

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
        <li>{course.longDescription}</li>
      </ul>

      <button className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-lg font-medium">
        Start Learning
      </button>
    </div>
  );
}

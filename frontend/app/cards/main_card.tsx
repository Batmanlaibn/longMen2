import Card from "../cards/card"
import ClassroomTraining from "../cards/classroom_training/page";

export default function MainCard() {
  return (
    <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">HSK Courses</h1>
            <p className="text-gray-400">Choose your level and start learning</p>
        </div>
        <Card />
        <ClassroomTraining />
    </div>
  );
}

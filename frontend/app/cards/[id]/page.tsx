"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import VideoSection from "./components/VideoSection";
import ChapterList from "./components/ChapterList";
import VocabularyGrid from "./components/VocabularyGrid";
import CourseInfo from "./components/CourseInfo";

interface Vocabulary {
  hanzi: string;
  pinyin: string;
  mongolian: string;
}

interface Chapter {
  id: number;
  title: string;
  date: string;
  comments: number;
  video?: string;
  vocabulary?: Vocabulary[];
}

interface Course {
  id: number;
  title: string;
  description: string;
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

export default function CardDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [video, setVideo] = useState<string | null>(null);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const data = await import("../../../public/data/data.json");
        const found = data.default.courses.find((c: Course) => c.id === Number(id));
        if (found) {
          setCourse(found);
          saveToHistory(found);
        }
      } catch (error) {
        console.error("Error loading course:", error);
      }
    };
    loadCourse();
  }, [id]);

  const saveToHistory = (courseData: Course) => {
    try {
      const loggedInUser = localStorage.getItem('user');
      if (!loggedInUser) return;

      const { email } = JSON.parse(loggedInUser);
      const historyKey = `viewHistory_${email}`;
      const existingHistory = localStorage.getItem(historyKey);
      let history = existingHistory ? JSON.parse(existingHistory) : [];

      const historyItem = {
        id: courseData.id,
        title: courseData.title,
        description: courseData.description,
        icon: courseData.icon,
        level: courseData.level,
        duration: courseData.duration,
        viewedAt: new Date().toISOString()
      };

      history = history.filter((item: any) => item.id !== courseData.id);
      history.unshift(historyItem);
      if (history.length > 20) history = history.slice(0, 20);

      localStorage.setItem(historyKey, JSON.stringify(history));
    } catch (error) {
      console.error("Error saving to history:", error);
    }
  };

  const handleChapterClick = (ch: Chapter) => {
    setActiveChapter(ch);
    setVideo(ch.video || null);
  };

  if (!course) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
        {/* LEFT */}
        <div>
          <VideoSection icon={course.icon} video={video} />
          {course.chapters && <ChapterList chapters={course.chapters} onChapterClick={handleChapterClick} />}
          {activeChapter?.vocabulary && <VocabularyGrid vocabulary={activeChapter.vocabulary} title={activeChapter.title} />}
        </div>

        {/* RIGHT */}
        <CourseInfo course={course} />
      </div>
    </div>
  );
}

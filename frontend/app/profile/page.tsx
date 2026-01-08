"use client";

import React, { useState, useEffect } from "react";
import { Eye, Trash2, Book, Target, Award, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

import ProfileHeader from "./profile_header/page";
import MyLessons from "./my_lessons/page";
import ViewHistory from "./view_history/page";
import Progress from "./progress/page";
import Achievements from "./achievements/page";
import Header from "../components/header";

const HSKProfilePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("courses");
  const [currentUser, setCurrentUser] = useState(null);
  const [viewHistory, setViewHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // --- utility functions ---
  const getLevelColor = (level) => {
    const colors = {
      "HSK 1": "bg-green-100 text-green-700",
      "HSK 2": "bg-blue-100 text-blue-700",
      "HSK 3": "bg-yellow-100 text-yellow-700",
      "HSK 4": "bg-orange-100 text-orange-700",
      "HSK 5": "bg-red-100 text-red-700",
      "HSK 6": "bg-purple-100 text-purple-700",
    };
    return colors[level] || "bg-gray-100 text-gray-700";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getProgressForLevel = (level) => {
    if (!currentUser) return 0;
    const levelNum = parseInt(level.split(" ")[1]);
    const currentLevelNum = parseInt(currentUser.hskLevel.split(" ")[1]);
    if (levelNum < currentLevelNum) return 100;
    if (levelNum === currentLevelNum) {
      const totalProgress = currentUser.courses.reduce((sum, c) => sum + c.progress, 0);
      return Math.round(totalProgress / currentUser.courses.length);
    }
    return 0;
  };

  // --- fetch user data ---
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const loggedInUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
        if (!loggedInUser) {
          router.push("/login");
          return;
        }
        const { email } = JSON.parse(loggedInUser);
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const users = await response.json();
        const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (!user) {
          setError("Хэрэглэгч олдсонгүй. Имэйл: " + email);
          setIsLoading(false);
          return;
        }
        setCurrentUser(user);

        // Load view history from user.json (not localStorage)
        setViewHistory(user.viewHistory || []);
        setIsLoading(false);
      } catch (err) {
        console.error("Алдаа гарлаа:", err);
        setError(`Алдаа: ${err.message}`);
        setIsLoading(false);
      }
    };
    loadUserData();
  }, [router]);

  // --- CLEAR HISTORY ---
  const clearHistory = async () => {
    if (currentUser && confirm("Үзсэн түүхийг бүрэн устгах уу?")) {
      try {
        await fetch("/api/user/history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: currentUser.ner,
            action: "clear",
          }),
        });
        setViewHistory([]);
      } catch (err) {
        console.error("Clear history failed:", err);
      }
    }
  };

  // --- REMOVE SINGLE HISTORY ITEM ---
  const removeHistoryItem = async (chapterId: number, courseId: number) => {
    if (currentUser) {
      try {
        await fetch("/api/user/history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: currentUser.ner,
            action: "remove",
            item: { id: chapterId, courseId },
          }),
        });

        setViewHistory((prev) =>
          prev.filter((item) => !(item.id === chapterId && (item.courseId || 0) === courseId))
        );
      } catch (err) {
        console.error("Remove history failed:", err);
      }
    }
  };

  // --- LOADING & ERROR STATES ---
  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Ачааллаж байна...</div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Алдаа гарлаа</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/login")}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Буцах
          </button>
        </div>
      </div>
    );

  if (!currentUser)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Хэрэглэгч олдсонгүй</div>
      </div>
    );

  // --- STATS ---
  const stats = [
    {
      icon: Book,
      label: "Нийт хичээл",
      value: currentUser.stats.totalCourses.toString(),
      color: "text-blue-600",
    },
    {
      icon: Target,
      label: "Одоогийн түвшин",
      value: currentUser.hskLevel,
      color: "text-green-600",
    },
    {
      icon: Award,
      label: "Авсан сертификат",
      value: currentUser.stats.certificates.toString(),
      color: "text-yellow-600",
    },
    {
      icon: Clock,
      label: "Суралцсан цаг",
      value: currentUser.stats.studyHours.toString(),
      color: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <div className="max-w-6xl mx-auto mt-5 px-4 pb-8">
        <ProfileHeader currentUser={currentUser} getLevelColor={getLevelColor} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mb-2`} />
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b">
            {["courses", "history", "progress", "achievements"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab === "courses" && "Миний хичээлүүд"}
                {tab === "history" && (
                  <div className="flex items-center justify-center gap-2">
                    <Eye className="w-5 h-5" /> Үзсэн түүх
                    {viewHistory.length > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                        {viewHistory.length}
                      </span>
                    )}
                  </div>
                )}
                {tab === "progress" && "Явц"}
                {tab === "achievements" && "Амжилтууд"}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "courses" && (
              <MyLessons courses={currentUser.courses} getLevelColor={getLevelColor} />
            )}
            {activeTab === "history" && (
              <ViewHistory
                viewHistory={viewHistory}
                formatDate={formatDate}
                getLevelColor={getLevelColor}
                clearHistory={clearHistory}
                removeHistoryItem={removeHistoryItem}
              />
            )}
            {activeTab === "progress" && (
              <Progress currentUser={currentUser} getProgressForLevel={getProgressForLevel} />
            )}
            {activeTab === "achievements" && <Achievements currentUser={currentUser} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HSKProfilePage;
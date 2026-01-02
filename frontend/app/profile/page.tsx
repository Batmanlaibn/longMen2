"use client";

import React, { useState } from 'react';
import { Book, Calendar, Award, Target, Users, Video, MapPin, Clock } from 'lucide-react';
import Header from '../components/header';

interface Course {
  id: number;
  title: string;
  level: string;
  type: 'online' | 'classroom';
  progress: number;
  schedule?: string;
  location?: string;
  startDate: string;
  duration: string;
}

interface Achievement {
  level: string;
  date: string;
  score: number;
}

const HSKProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'progress' | 'achievements'>('courses');

  const user = {
    name: 'Болд',
    email: 'bold@example.com',
    currentLevel: 'HSK 3',
    joinDate: '2024-01-15',
    avatar: '👨‍🎓'
  };

  const courses: Course[] = [
    {
      id: 1,
      title: 'HSK 3 Интенсив курс',
      level: 'HSK 3',
      type: 'online',
      progress: 65,
      schedule: 'Даваа, Лхагва 19:00',
      startDate: '2024-01-20',
      duration: '3 сар'
    },
    {
      id: 2,
      title: 'HSK 4 Бэлтгэл курс',
      level: 'HSK 4',
      type: 'classroom',
      progress: 30,
      schedule: 'Мягмар, Баасан 18:00',
      location: 'Сүхбаатар дүүрэг, Барилга 5',
      startDate: '2024-02-01',
      duration: '4 сар'
    },
    {
      id: 3,
      title: 'Хэлний дасгал - Speaking',
      level: 'HSK 3-4',
      type: 'online',
      progress: 45,
      schedule: 'Бямба 10:00',
      startDate: '2024-01-25',
      duration: '2 сар'
    }
  ];

  const achievements: Achievement[] = [
    { level: 'HSK 2', date: '2023-10-15', score: 245 },
    { level: 'HSK 1', date: '2023-06-20', score: 195 }
  ];

  const stats = [
    { icon: Book, label: 'Нийт хичээл', value: '3', color: 'text-blue-600' },
    { icon: Target, label: 'Одоогийн түвшин', value: user.currentLevel, color: 'text-green-600' },
    { icon: Award, label: 'Авсан сертификат', value: '2', color: 'text-yellow-600' },
    { icon: Clock, label: 'Суралцсан цаг', value: '124', color: 'text-purple-600' }
  ];

  const getLevelColor = (level: string): string => {
    const colors: { [key: string]: string } = {
      'HSK 1': 'bg-green-100 text-green-700',
      'HSK 2': 'bg-blue-100 text-blue-700',
      'HSK 3': 'bg-yellow-100 text-yellow-700',
      'HSK 4': 'bg-orange-100 text-orange-700',
      'HSK 5': 'bg-red-100 text-red-700',
      'HSK 6': 'bg-purple-100 text-purple-700'
    };
    return colors[level] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
      <div className="max-w-6xl mx-auto mt-5">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-6xl">{user.avatar}</div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(user.currentLevel)}`}>
                  {user.currentLevel}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                  {user.joinDate}-с хойш
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
              <stat.icon className={`w-8 h-8 ${stat.color} mb-2`} />
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'courses'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              Миний хичээлүүд
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'progress'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              Явц
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'achievements'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              Амжилтууд
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'courses' && (
              <div className="space-y-4">
                {courses.map(course => (
                  <div
                    key={course.id}
                    className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                  >
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
                            {course.type === 'online' ? <Video className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                            <span>{course.type === 'online' ? 'Онлайн' : 'Танхим'}</span>
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
                          <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{course.progress}% гүйцэтгэл</p>
                      </div>

                      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                        Үргэлжлүүлэх
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">HSK Түвшний явц</h3>
                  <div className="space-y-4">
                    {['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6'].map((level, idx) => {
                      const progress = idx === 0 ? 100 : idx === 1 ? 100 : idx === 2 ? 65 : idx === 3 ? 30 : 0;
                      return (
                        <div key={level}>
                          <div className="flex justify-between mb-1">
                            <span className="font-semibold text-gray-700">{level}</span>
                            <span className="text-gray-600">{progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full transition-all ${
                                progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                              }`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-4">
                {achievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-800">{achievement.level} Сертификат</h4>
                      <p className="text-gray-600">Оноо: {achievement.score}/300</p>
                      <p className="text-sm text-gray-500">{achievement.date}</p>
                    </div>
                    <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                      Харах
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HSKProfilePage;
"use client";

import React, { useState, useEffect } from 'react';
import { Book, Calendar, Award, Target, Users, Video, MapPin, Clock, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '../components/header';



const HSKProfilePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('courses');
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // localStorage-с нэвтэрсэн хэрэглэгчийн имэйл авах
        const loggedInUser = typeof window !== 'undefined' 
          ? localStorage.getItem('user') 
          : null;

        console.log('localStorage-с авсан:', loggedInUser);

        if (!loggedInUser) {
          console.log('Нэвтрээгүй байна, login page руу шилжүүлж байна');
          router.push('/login');
          return;
        }

        const { email } = JSON.parse(loggedInUser);
        console.log('Нэвтэрсэн хэрэглэгчийн имэйл:', email);

        // API-аас хэрэглэгчдийн датаг унших
        console.log('API дуудаж байна...');
        const response = await fetch('/api/users');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const users = await response.json();
        console.log('Унших хэрэглэгчдийн тоо:', users.length);
        
        // Нэвтэрсэн хэрэглэгчийн мэдээллийг олох
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        console.log('Олдсон хэрэглэгч:', user ? user.ner : 'олдсонгүй');

        if (!user) {
          setError('Хэрэглэгч олдсонгүй. Имэйл: ' + email);
          setIsLoading(false);
          return;
        }

        setCurrentUser(user);
        setIsLoading(false);
      } catch (err) {
        console.error('Алдаа гарлаа:', err);
        setError(`Алдаа: ${err.message}. Console-г шалгана уу (F12)`);
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [router]);

  const getLevelColor = (level) => {
    const colors = {
      'HSK 1': 'bg-green-100 text-green-700',
      'HSK 2': 'bg-blue-100 text-blue-700',
      'HSK 3': 'bg-yellow-100 text-yellow-700',
      'HSK 4': 'bg-orange-100 text-orange-700',
      'HSK 5': 'bg-red-100 text-red-700',
      'HSK 6': 'bg-purple-100 text-purple-700'
    };
    return colors[level] || 'bg-gray-100 text-gray-700';
  };

  const getProgressForLevel = (level) => {
    if (!currentUser) return 0;
    const levelNum = parseInt(level.split(' ')[1]);
    const currentLevelNum = parseInt(currentUser.hskLevel.split(' ')[1]);
    
    if (levelNum < currentLevelNum) return 100;
    if (levelNum === currentLevelNum) {
      const totalProgress = currentUser.courses.reduce((sum, c) => sum + c.progress, 0);
      return Math.round(totalProgress / currentUser.courses.length);
    }
    return 0;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Ачааллаж байна...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Алдаа гарлаа</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/login')}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Буцах
          </button>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Хэрэглэгч олдсонгүй</div>
      </div>
    );
  }

  const stats = [
    { icon: Book, label: 'Нийт хичээл', value: currentUser.stats.totalCourses.toString(), color: 'text-blue-600' },
    { icon: Target, label: 'Одоогийн түвшин', value: currentUser.hskLevel, color: 'text-green-600' },
    { icon: Award, label: 'Авсан сертификат', value: currentUser.stats.certificates.toString(), color: 'text-yellow-600' },
    { icon: Clock, label: 'Суралцсан цаг', value: currentUser.stats.studyHours.toString(), color: 'text-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <div className="max-w-6xl mx-auto mt-5 px-4 pb-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-6xl">{currentUser.avatar}</div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800">{currentUser.ner}</h1>
              <p className="text-gray-600">{currentUser.email}</p>
              <p className="text-sm text-gray-500">Нас: {currentUser.nas}</p>
              <p className="text-sm text-gray-500">Утас: {currentUser.utas}</p>
              <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(currentUser.hskLevel)}`}>
                  {currentUser.hskLevel}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                  {currentUser.joinDate}-с хойш
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
                {currentUser.courses && currentUser.courses.length > 0 ? (
                  currentUser.courses.map(course => (
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
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Одоогоор хичээл байхгүй байна
                  </div>
                )}
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">HSK Түвшний явц</h3>
                  <div className="space-y-4">
                    {['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6'].map((level) => {
                      const progress = getProgressForLevel(level);
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
                {currentUser.achievements && currentUser.achievements.length > 0 ? (
                  currentUser.achievements.map((achievement, idx) => (
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
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Одоогоор амжилт байхгүй байна
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HSKProfilePage;
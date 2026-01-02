"use client";

import React, { useState } from 'react';
import { User, Bell, Globe, Lock, CreditCard, Mail, Shield, Moon, Sun, Volume2, BookOpen, LogOut } from 'lucide-react';
import Header from '../components/header';

interface SettingSection {
  id: string;
  title: string;
  icon: React.ElementType;
}

const HSKSettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [language, setLanguage] = useState('mn');
  const [twoFactor, setTwoFactor] = useState(false);

  const sections: SettingSection[] = [
    { id: 'profile', title: 'Хувийн мэдээлэл', icon: User },
    { id: 'notifications', title: 'Мэдэгдэл', icon: Bell },
    { id: 'language', title: 'Хэл ба бүс нутаг', icon: Globe },
    { id: 'security', title: 'Нууцлал ба аюулгүй байдал', icon: Shield },
    { id: 'learning', title: 'Суралцах тохиргоо', icon: BookOpen },
    { id: 'subscription', title: 'Эрх ба төлбөр', icon: CreditCard }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Хувийн мэдээлэл</h2>
            
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-4xl text-white">
                👨‍🎓
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Зураг солих
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Нэр</label>
                <input
                  type="text"
                  defaultValue="Болд"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Имэйл хаяг</label>
                <input
                  type="email"
                  defaultValue="bold@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Утасны дугаар</label>
                <input
                  type="tel"
                  defaultValue="+976 9999 9999"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Био</label>
                <textarea
                  rows={3}
                  defaultValue="HSK суралцагч, Хятад хэлийг сонирхдог"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Хадгалах
              </button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Мэдэгдлийн тохиргоо</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">Имэйл мэдэгдэл</h3>
                  <p className="text-sm text-gray-600">Хичээл, сорил, шинэчлэлтийн мэдэгдэл</p>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                      emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">Push мэдэгдэл</h3>
                  <p className="text-sm text-gray-600">Гар утсанд мэдэгдэл авах</p>
                </div>
                <button
                  onClick={() => setPushNotifications(!pushNotifications)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    pushNotifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                      pushNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-2 p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Мэдэгдлийн төрөл</h3>
                {['Хичээлийн сануулга', 'Шинэ контент', 'Явцын тайлан', 'Онооны мэдээлэл'].map(item => (
                  <label key={item} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 'language':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Хэл ба бүс нутгийн тохиргоо</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Интерфэйсийн хэл</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="mn">Монгол</option>
                  <option value="en">English</option>
                  <option value="zh">中文</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Цагийн бүс</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>UTC+8 (Улаанбаатар)</option>
                  <option>UTC+8 (Beijing)</option>
                  <option>UTC+0 (London)</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">Харанхуй горим</h3>
                  <p className="text-sm text-gray-600">Харанхуй өнгөний загвар ашиглах</p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    darkMode ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform flex items-center justify-center ${
                      darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  >
                    {darkMode ? <Moon className="w-3 h-3 text-blue-600" /> : <Sun className="w-3 h-3 text-gray-400" />}
                  </div>
                </button>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Нууцлал ба аюулгүй байдал</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Нууц үг солих</h3>
                <div className="space-y-3">
                  <input
                    type="password"
                    placeholder="Одоогийн нууц үг"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="password"
                    placeholder="Шинэ нууц үг"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="password"
                    placeholder="Шинэ нууц үг давтах"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Нууц үг солих
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">Хоёр шаттай баталгаажуулалт</h3>
                  <p className="text-sm text-gray-600">Нэмэлт аюулгүй байдлын давхарга</p>
                </div>
                <button
                  onClick={() => setTwoFactor(!twoFactor)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    twoFactor ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                      twoFactor ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Идэвхтэй сесс</h3>
                <div className="space-y-2">
                  {['Chrome - Windows (Одоо)', 'Safari - iPhone (2 цагийн өмнө)'].map((device, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700">{device}</span>
                      <button className="text-sm text-red-600 hover:text-red-700">Устгах</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'learning':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Суралцах тохиргоо</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">Дууны эффект</h3>
                  <p className="text-sm text-gray-600">Хичээл явцад дууны эффект</p>
                </div>
                <button
                  onClick={() => setSoundEffects(!soundEffects)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    soundEffects ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                      soundEffects ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">Автомат тоглуулах</h3>
                  <p className="text-sm text-gray-600">Видео автоматаар тоглуулах</p>
                </div>
                <button
                  onClick={() => setAutoplay(!autoplay)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    autoplay ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                      autoplay ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Өдөрт суралцах зорилго</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>15 минут</option>
                  <option>30 минут</option>
                  <option>1 цаг</option>
                  <option>2 цаг</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Хүндрэлийн түвшин</label>
                <div className="flex gap-2">
                  {['Амархан', 'Дунд', 'Хүнд'].map(level => (
                    <button
                      key={level}
                      className="flex-1 py-2 border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'subscription':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Эрх ба төлбөрийн мэдээлэл</h2>
            
            <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Premium эрх</h3>
                  <p className="text-blue-100">2024-12-31 хүртэл идэвхтэй</p>
                </div>
                <div className="text-3xl">💎</div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Premium боломжууд</h3>
              {[
                'Бүх хичээлүүдэд хязгааргүй хандах',
                'Офлайн режим',
                'Зар сурталчилгаагүй',
                'Хувийн багш',
                'Сертификат тэнцэх'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Төлбөрийн түүх</h3>
              <div className="space-y-2">
                {[
                  { date: '2024-01-15', amount: '99,000₮', status: 'Төлсөн' },
                  { date: '2023-10-15', amount: '99,000₮', status: 'Төлсөн' }
                ].map((payment, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium text-gray-800">{payment.amount}</p>
                      <p className="text-sm text-gray-600">{payment.date}</p>
                    </div>
                    <span className="text-sm text-green-600 font-semibold">{payment.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-semibold">
              Эрхийг цуцлах
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

        <Header />
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Тохиргоо</h1>
          <p className="text-gray-600">Та өөрийн бүртгэл болон тохиргоог энд удирдана</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{section.title}</span>
                </button>
              ))}
              
              <button className="w-full flex items-center gap-3 p-4 text-left text-red-600 hover:bg-red-50 transition-colors border-t">
                <LogOut className="w-5 h-5" />
                <span className="font-medium text-sm">Гарах</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HSKSettingsPage;
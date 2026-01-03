"use client";

import React, { useState, useEffect } from 'react';
import { User, Bell, Globe, Shield, Moon, Sun, BookOpen, LogOut, Save, AlertCircle, CheckCircle } from 'lucide-react';
import Header from '../components/header';

interface UserSettings {
  email: string;
  ner: string;
  utas: string;
  nas: number;
  bio?: string;
  avatar?: string;
  darkMode: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  soundEffects: boolean;
  autoplay: boolean;
  language: string;
  timezone: string;
  twoFactor: boolean;
  studyGoal: string;
  difficulty: string;
  notificationTypes: {
    lessonReminders: boolean;
    newContent: boolean;
    progressReport: boolean;
    scoreUpdates: boolean;
  };
}

interface SettingSection {
  id: string;
  title: string;
  icon: React.ElementType;
}

const HSKSettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('profile');
  const [currentUser, setCurrentUser] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [formData, setFormData] = useState<Partial<UserSettings>>({});

  useEffect(() => {
    loadUserSettings();
  }, []);

  const loadUserSettings = async () => {
    try {
      const loggedInUser = localStorage.getItem('user');
      
      if (!loggedInUser) {
        window.location.href = '/login';
        return;
      }

      const { email } = JSON.parse(loggedInUser);
      
      const response = await fetch('/api/users');
      const users = await response.json();
      
      const user = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        throw new Error('User not found');
      }

      const settings: UserSettings = {
        email: user.email,
        ner: user.ner,
        utas: user.utas,
        nas: user.nas,
        bio: user.bio || `HSK суралцагч, Хятад хэлийг сонирхдог`,
        avatar: user.avatar || '👨‍🎓',
        darkMode: user.darkMode ?? false,
        emailNotifications: user.emailNotifications ?? true,
        pushNotifications: user.pushNotifications ?? true,
        soundEffects: user.soundEffects ?? true,
        autoplay: user.autoplay ?? false,
        language: user.language || 'mn',
        timezone: user.timezone || 'UTC+8',
        twoFactor: user.twoFactor ?? false,
        studyGoal: user.studyGoal || '30',
        difficulty: user.difficulty || 'Дунд',
        notificationTypes: user.notificationTypes || {
          lessonReminders: true,
          newContent: true,
          progressReport: true,
          scoreUpdates: true
        }
      };

      setCurrentUser(settings);
      setFormData(settings);
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading settings:', err);
      setIsLoading(false);
    }
  };

  const saveSettings = async () => {
    if (!currentUser) return;

    setIsSaving(true);
    setSaveMessage(null);

    try {
      const settingsToSave = { ...currentUser, ...formData };
      
      // Save to backend API
      const response = await fetch('/api/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: currentUser.email,
          settings: settingsToSave
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      // Update local state
      setCurrentUser(settingsToSave);
      
      // Also save to localStorage as backup
      localStorage.setItem(`settings_${currentUser.email}`, JSON.stringify(settingsToSave));
      
      setSaveMessage({ type: 'success', text: 'Тохиргоо амжилттай хадгалагдлаа!' });
      
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
      setSaveMessage({ type: 'error', text: 'Хадгалахад алдаа гарлаа. Дахин оролдоно уу.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleToggle = (field: keyof UserSettings) => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleNotificationTypeToggle = (type: keyof UserSettings['notificationTypes']) => {
    setFormData(prev => ({
      ...prev,
      notificationTypes: {
        ...(prev.notificationTypes || currentUser?.notificationTypes || {}),
        [type]: !(prev.notificationTypes?.[type] ?? currentUser?.notificationTypes?.[type] ?? true)
      }
    }));
  };

  const sections: SettingSection[] = [
    { id: 'profile', title: 'Хувийн мэдээлэл', icon: User },
    { id: 'notifications', title: 'Мэдэгдэл', icon: Bell },
    { id: 'language', title: 'Хэл ба бүс нутаг', icon: Globe },
    { id: 'security', title: 'Нууцлал ба аюулгүй байдал', icon: Shield },
    { id: 'learning', title: 'Суралцах тохиргоо', icon: BookOpen },
  ];

  const renderContent = () => {
    if (!currentUser) return null;

    const currentFormData = { ...currentUser, ...formData };

    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Хувийн мэдээлэл</h2>
            
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-4xl">
                {currentFormData.avatar}
              </div>
              <div className="text-sm text-gray-600">
                <p>Аватар өөрчлөх боломж удахгүй нэмэгдэнэ</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Нэр</label>
                <input
                  type="text"
                  value={currentFormData.ner || ''}
                  onChange={(e) => handleInputChange('ner', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Имэйл хаяг</label>
                <input
                  type="email"
                  value={currentFormData.email || ''}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">И-мэйл хаяг өөрчлөх боломжгүй</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Утасны дугаар</label>
                <input
                  type="tel"
                  value={currentFormData.utas || ''}
                  onChange={(e) => handleInputChange('utas', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Нас</label>
                <input
                  type="number"
                  value={currentFormData.nas || 0}
                  onChange={(e) => handleInputChange('nas', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Био</label>
                <textarea
                  rows={3}
                  value={currentFormData.bio || ''}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button 
                onClick={saveSettings}
                disabled={isSaving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Хадгалж байна...' : 'Хадгалах'}
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
                  onClick={() => handleToggle('emailNotifications')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    currentFormData.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                      currentFormData.emailNotifications ? 'translate-x-6' : 'translate-x-1'
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
                  onClick={() => handleToggle('pushNotifications')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    currentFormData.pushNotifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                      currentFormData.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-2 p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Мэдэгдлийн төрөл</h3>
                {[
                  { key: 'lessonReminders', label: 'Хичээлийн сануулга' },
                  { key: 'newContent', label: 'Шинэ контент' },
                  { key: 'progressReport', label: 'Явцын тайлан' },
                  { key: 'scoreUpdates', label: 'Онооны мэдээлэл' }
                ].map(item => (
                  <label key={item.key} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={currentFormData.notificationTypes?.[item.key as keyof UserSettings['notificationTypes']] ?? true}
                      onChange={() => handleNotificationTypeToggle(item.key as keyof UserSettings['notificationTypes'])}
                      className="w-4 h-4 text-blue-600" 
                    />
                    <span className="text-gray-700">{item.label}</span>
                  </label>
                ))}
              </div>

              <button 
                onClick={saveSettings}
                disabled={isSaving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Хадгалж байна...' : 'Хадгалах'}
              </button>
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
                  value={currentFormData.language || 'mn'}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="mn">Монгол</option>
                  <option value="en">English</option>
                  <option value="zh">中文</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Цагийн бүс</label>
                <select 
                  value={currentFormData.timezone || 'UTC+8'}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="UTC+8">UTC+8 (Улаанбаатар)</option>
                  <option value="UTC+8-Beijing">UTC+8 (Beijing)</option>
                  <option value="UTC+0">UTC+0 (London)</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">Харанхуй горим</h3>
                  <p className="text-sm text-gray-600">Харанхуй өнгөний загвар ашиглах</p>
                </div>
                <button
                  onClick={() => handleToggle('darkMode')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    currentFormData.darkMode ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform flex items-center justify-center ${
                      currentFormData.darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  >
                    {currentFormData.darkMode ? <Moon className="w-3 h-3 text-blue-600" /> : <Sun className="w-3 h-3 text-gray-400" />}
                  </div>
                </button>
              </div>

              <button 
                onClick={saveSettings}
                disabled={isSaving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Хадгалж байна...' : 'Хадгалах'}
              </button>
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
                <p className="text-sm text-gray-600 mb-3">Нууц үг солих боломж удахгүй нэмэгдэнэ</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">Хоёр шаттай баталгаажуулалт</h3>
                  <p className="text-sm text-gray-600">Нэмэлт аюулгүй байдлын давхарга</p>
                </div>
                <button
                  onClick={() => handleToggle('twoFactor')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    currentFormData.twoFactor ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                      currentFormData.twoFactor ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <button 
                onClick={saveSettings}
                disabled={isSaving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Хадгалж байна...' : 'Хадгалах'}
              </button>
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
                  onClick={() => handleToggle('soundEffects')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    currentFormData.soundEffects ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                      currentFormData.soundEffects ? 'translate-x-6' : 'translate-x-1'
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
                  onClick={() => handleToggle('autoplay')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    currentFormData.autoplay ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                      currentFormData.autoplay ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Өдөрт суралцах зорилго</label>
                <select 
                  value={currentFormData.studyGoal || '30'}
                  onChange={(e) => handleInputChange('studyGoal', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="15">15 минут</option>
                  <option value="30">30 минут</option>
                  <option value="60">1 цаг</option>
                  <option value="120">2 цаг</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Хүндрэлийн түвшин</label>
                <div className="flex gap-2">
                  {['Амархан', 'Дунд', 'Хүнд'].map(level => (
                    <button
                      key={level}
                      onClick={() => handleInputChange('difficulty', level)}
                      className={`flex-1 py-2 border-2 rounded-lg transition-colors ${
                        currentFormData.difficulty === level 
                          ? 'border-blue-600 bg-blue-50 text-blue-600' 
                          : 'border-gray-300 hover:border-blue-600 hover:text-blue-600'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={saveSettings}
                disabled={isSaving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Хадгалж байна...' : 'Хадгалах'}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Ачааллаж байна...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Тохиргоо</h1>
          <p className="text-gray-600">Та өөрийн бүртгэл болон тохиргоог энд удирдана</p>
        </div>

        {saveMessage && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            saveMessage.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {saveMessage.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{saveMessage.text}</span>
          </div>
        )}

        <div className="grid md:grid-cols-4 gap-6">
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
              
              <button 
                onClick={() => {
                  localStorage.removeItem('user');
                  window.location.href = '/login';
                }}
                className="w-full flex items-center gap-3 p-4 text-left text-red-600 hover:bg-red-50 transition-colors border-t"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium text-sm">Гарах</span>
              </button>
            </div>
          </div>

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
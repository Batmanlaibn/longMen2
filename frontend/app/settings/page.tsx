"use client";

import React, { useState, useEffect } from 'react';
import { User, Bell, Globe, Shield, BookOpen, LogOut, Save, AlertCircle, CheckCircle } from 'lucide-react';
import Header from '../components/header';

import ProfileSettings from './profile/page';
import NotificationSettings from './notifications/page';
import LanguageSettings from './language/page';
import SecuritySettings from './security/page';
import LearningSettings from './learning/page';

export interface UserSettings {
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
      if (!user) throw new Error('User not found');

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
      const response = await fetch('/api/users/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: currentUser.email, settings: settingsToSave })
      });

      if (!response.ok) throw new Error('Failed to save settings');

      setCurrentUser(settingsToSave);
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
        return <ProfileSettings currentFormData={currentFormData} handleInputChange={handleInputChange} saveSettings={saveSettings} isSaving={isSaving} />;
      case 'notifications':
        return <NotificationSettings currentFormData={currentFormData} handleToggle={handleToggle} handleNotificationTypeToggle={handleNotificationTypeToggle} saveSettings={saveSettings} isSaving={isSaving} />;
      case 'language':
        return <LanguageSettings currentFormData={currentFormData} handleInputChange={handleInputChange} handleToggle={handleToggle} saveSettings={saveSettings} isSaving={isSaving} />;
      case 'security':
        return <SecuritySettings currentFormData={currentFormData} handleToggle={handleToggle} saveSettings={saveSettings} isSaving={isSaving} />;
      case 'learning':
        return <LearningSettings currentFormData={currentFormData} handleInputChange={handleInputChange} handleToggle={handleToggle} saveSettings={saveSettings} isSaving={isSaving} />;
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
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${saveMessage.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {saveMessage.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
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
                  className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${activeSection === section.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-50 text-gray-700'}`}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{section.title}</span>
                </button>
              ))}
              <button 
                onClick={() => { localStorage.removeItem('user'); window.location.href = '/login'; }}
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

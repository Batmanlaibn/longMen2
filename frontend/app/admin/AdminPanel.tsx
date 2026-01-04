import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, Award, TrendingUp, Edit2, Trash2, Plus, Search, 
  BarChart3, DollarSign, Clock, Settings, GraduationCap, FileText, 
  Mail, Phone, MapPin, Save, X, Calendar, Globe
} from 'lucide-react';
import Header from '../components/header';
import Dashboard from './control_panel/page';
import Userss from './users/page';
import Courses from './trainings/page';
import ContentSettings from './website_information/page';
import TeachersPanel from './teachers/page';
import SystemSettings from './settings/page';




const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [siteData, setSiteData] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalCourses: 0,
    totalRevenue: 0,
    newStudents: 0,
    totalTeachers: 0
  });

  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchTerm, selectedLevel, users]);

  const loadAllData = async () => {
    try {
      const [usersRes, dataRes] = await Promise.all([
        fetch('/data/user.json').then(r => r.json()).catch(() => []),
        fetch('/data/data.json').then(r => r.json()).catch(() => null)
      ]);
      
      setUsers(usersRes);
      setFilteredUsers(usersRes);
      setSiteData(dataRes);
      calculateStats(usersRes, dataRes);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const filterUsers = () => {
    let result = [...users];
    if (searchTerm) {
      result = result.filter(user => 
        user.ner?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedLevel !== 'All') {
      result = result.filter(user => user.hskLevel === selectedLevel);
    }
    setFilteredUsers(result);
  };

  const calculateStats = (userData, data) => {
    const totalUsers = userData.length;
    const activeUsers = userData.filter(u => u.courses?.length > 0).length;
    const totalCourses = data?.courses?.length || 0;
    const totalRevenue = userData.reduce((sum, u) => sum + (u.stats?.totalCourses || 0) * 50, 0);
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    const newStudents = userData.filter(u => new Date(u.joinDate) > monthAgo).length;

    setStats({
      totalUsers,
      activeUsers,
      totalCourses,
      totalRevenue,
      newStudents,
      totalTeachers: 3
    });
  };

  const handleSaveUser = () => {
    if (!editingUser) return;
    const updatedUsers = users.map(u => u.email === editingUser.email ? editingUser : u);
    setUsers(updatedUsers);
    setShowEditModal(false);
    setEditingUser(null);
    alert('Хэрэглэгчийн мэдээлэл амжилттай шинэчлэгдлээ!');
  };

  const handleDeleteUser = (email) => {
    if (!confirm('Та энэ хэрэглэгчийг устгахдаа итгэлтэй байна уу?')) return;
    setUsers(users.filter(u => u.email !== email));
    alert('Хэрэглэгч амжилттай устгагдлаа!');
  };

  const handleSaveSiteData = () => {
    alert('Website мэдээлэл амжилттай хадгалагдлаа!');
  };

  const updateSiteData = (path, value) => {
    setSiteData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const StatCard = ({ icon: Icon, title, value, color, subtitle }) => (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );

  const navigationTabs = [
    { id: 'dashboard', title: 'Хяналтын самбар', icon: BarChart3 },
    { id: 'users', title: 'Хэрэглэгчид', icon: Users },
    { id: 'courses', title: 'Сургалтууд', icon: BookOpen },
    { id: 'teachers', title: 'Багш нар', icon: GraduationCap },
    { id: 'content', title: 'Website мэдээлэл', icon: FileText },
    { id: 'settings', title: 'Тохиргоо', icon: Settings }
  ];

  if (!siteData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Мэдээлэл ачааллаж байна...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">👑</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-500">HSK Mongolia</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">ADMIN@GMAIL.COM</span>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">👑</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6">
            {navigationTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5 inline mr-2" />
                {tab.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "dashboard" && (
          <Dashboard
            stats={stats}
            users={users}
          />
        )}


        {activeTab === "users" && (
          <Userss
            users={users}
            filteredUsers={filteredUsers}
            searchTerm={searchTerm}
            selectedLevel={selectedLevel}
            setSearchTerm={setSearchTerm}
            setSelectedLevel={setSelectedLevel}
            onEdit={(user) => {
              setEditingUser(user);
              setShowEditModal(true);
            }}
            onDelete={handleDeleteUser}
          />
        )}

        {activeTab === "courses" && (
          <Courses courses={siteData.courses || []} />
        )}


        {activeTab === "content" && (
          <ContentSettings
            siteData={siteData}
            updateSiteData={updateSiteData}
            handleSaveSiteData={handleSaveSiteData}
          />
        )}

        
        
        

        {activeTab === "teachers" && (
          <TeachersPanel teachers={siteData.teachers || []} />
        )}


        {/* {activeTab === "settings" && (
          <SystemSettings
            settings={systemSettings}
            updateSettings={updateSettings}
            handleSaveSettings={handleSaveSettings}
          />
        )} */}

      </div>

      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Хэрэглэгч засах</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Нэр</label>
                <input
                  type="text"
                  value={editingUser.ner}
                  onChange={(e) => setEditingUser({ ...editingUser, ner: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">И-мэйл</label>
                <input
                  type="email"
                  value={editingUser.email}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Утас</label>
                <input
                  type="tel"
                  value={editingUser.utas}
                  onChange={(e) => setEditingUser({ ...editingUser, utas: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Нас</label>
                <input
                  type="number"
                  value={editingUser.nas}
                  onChange={(e) => setEditingUser({ ...editingUser, nas: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">HSK Түвшин</label>
                <select
                  value={editingUser.hskLevel}
                  onChange={(e) => setEditingUser({ ...editingUser, hskLevel: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6'].map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveUser}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Хадгалах
              </button>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingUser(null);
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Болих
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
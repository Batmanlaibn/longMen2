import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, Award, TrendingUp, Edit2, Trash2, Plus, Search, 
  BarChart3, DollarSign, Clock, Settings, GraduationCap, FileText, 
  Mail, Phone, MapPin, Save, X, Calendar, Globe
} from 'lucide-react';

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
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard icon={Users} title="Нийт хэрэглэгч" value={stats.totalUsers} color="bg-blue-500" subtitle={`${stats.activeUsers} идэвхтэй`} />
              <StatCard icon={BookOpen} title="Нийт хичээл" value={stats.totalCourses} color="bg-green-500" subtitle="Бүртгэлтэй хичээл" />
              <StatCard icon={DollarSign} title="Нийт орлого" value={`$${stats.totalRevenue}`} color="bg-yellow-500" subtitle="Нийт борлуулалт" />
              <StatCard icon={TrendingUp} title="Шинэ сурагч" value={stats.newStudents} color="bg-purple-500" subtitle="Сүүлийн 30 хоног" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">HSK түвшний тархалт</h3>
                <div className="space-y-3">
                  {['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6'].map(level => {
                    const count = users.filter(u => u.hskLevel === level).length;
                    const percentage = (count / (users.length || 1) * 100);
                    return (
                      <div key={level}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-700">{level}</span>
                          <span className="text-gray-600">{count} хүн ({percentage.toFixed(0)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Сүүлийн үйл ажиллагаа</h3>
                <div className="space-y-4">
                  {users.slice(0, 5).map((user, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl">{user.avatar}</div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{user.ner}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <span className="text-xs text-gray-500">{user.joinDate}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-1 gap-4 w-full md:w-auto">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Хайх (нэр, имэйл)..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">Бүх түвшин</option>
                    {['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6'].map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">{filteredUsers.length} хэрэглэгч олдлоо</div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Хэрэглэгч</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Холбоо</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Түвшин</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Хичээл</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Огноо</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Үйлдэл</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.email} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="text-2xl mr-3">{user.avatar}</div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.ner}</div>
                              <div className="text-sm text-gray-500">Нас: {user.nas}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{user.email}</div>
                          <div className="text-sm text-gray-500">{user.utas}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{user.hskLevel}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{user.courses?.length || 0}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{user.joinDate}</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => { setEditingUser(user); setShowEditModal(true); }} className="text-blue-600 hover:text-blue-900 mr-3">
                            <Edit2 className="w-4 h-4 inline" />
                          </button>
                          <button onClick={() => handleDeleteUser(user.email)} className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Сургалтууд</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {siteData.courses?.map(course => (
                <div key={course.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{course.title}</h3>
                      <span className="text-xs text-gray-500">{course.level}</span>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Идэвхтэй</span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{course.students} сурагч</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span>${course.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Website мэдээлэл засах</h2>

            <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Бидний тухай</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Гарчиг</label>
                    <input
                      type="text"
                      value={siteData.about?.introduction?.title || ''}
                      onChange={(e) => updateSiteData('about.introduction.title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Танилцуулга - 1 дэх догол мөр</label>
                    <textarea
                      rows={3}
                      value={siteData.about?.introduction?.paragraphs?.[0] || ''}
                      onChange={(e) => {
                        const newParagraphs = [...(siteData.about?.introduction?.paragraphs || ['', ''])];
                        newParagraphs[0] = e.target.value;
                        updateSiteData('about.introduction.paragraphs', newParagraphs);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Танилцуулга - 2 дахь догол мөр</label>
                    <textarea
                      rows={3}
                      value={siteData.about?.introduction?.paragraphs?.[1] || ''}
                      onChange={(e) => {
                        const newParagraphs = [...(siteData.about?.introduction?.paragraphs || ['', ''])];
                        newParagraphs[1] = e.target.value;
                        updateSiteData('about.introduction.paragraphs', newParagraphs);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Холбоо барих мэдээлэл</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">И-мэйл</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={siteData.about?.contact?.email || ''}
                        onChange={(e) => updateSiteData('about.contact.email', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Утас</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={siteData.about?.contact?.phone || ''}
                        onChange={(e) => updateSiteData('about.contact.phone', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={siteData.about?.contact?.facebook || ''}
                        onChange={(e) => updateSiteData('about.contact.facebook', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Холбоо барих хуудасны мэдээлэл</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hero гарчиг</label>
                    <input
                      type="text"
                      value={siteData.contactPage?.hero?.title || ''}
                      onChange={(e) => updateSiteData('contactPage.hero.title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hero дэд гарчиг</label>
                    <input
                      type="text"
                      value={siteData.contactPage?.hero?.subtitle || ''}
                      onChange={(e) => updateSiteData('contactPage.hero.subtitle', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Холбоо барих хэсгийн гарчиг</label>
                    <input
                      type="text"
                      value={siteData.contactPage?.contactInfo?.title || ''}
                      onChange={(e) => updateSiteData('contactPage.contactInfo.title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Footer мэдээлэл</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Брэнд нэр</label>
                    <input
                      type="text"
                      value={siteData.footer?.brand?.name || ''}
                      onChange={(e) => updateSiteData('footer.brand.name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Брэнд тайлбар</label>
                    <textarea
                      rows={2}
                      value={siteData.footer?.brand?.description || ''}
                      onChange={(e) => updateSiteData('footer.brand.description', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Copyright текст</label>
                    <input
                      type="text"
                      value={siteData.footer?.copyright?.text || ''}
                      onChange={(e) => updateSiteData('footer.copyright.text', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Footer имэйл</label>
                    <input
                      type="email"
                      value={siteData.footer?.contact?.email || ''}
                      onChange={(e) => updateSiteData('footer.contact.email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Footer утас</label>
                    <input
                      type="tel"
                      value={siteData.footer?.contact?.phone || ''}
                      onChange={(e) => updateSiteData('footer.contact.phone', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Footer хаяг</label>
                    <input
                      type="text"
                      value={siteData.footer?.contact?.address || ''}
                      onChange={(e) => updateSiteData('footer.contact.address', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveSiteData}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Хадгалах
              </button>
            </div>
          </div>
        )}

        {activeTab === 'teachers' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Багш нар</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-gray-600">Багш нарын мэдээллийг удахгүй нэмнэ.</p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Системийн тохиргоо</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-gray-600">Системийн тохиргоог удахгүй нэмнэ.</p>
            </div>
          </div>
        )}
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
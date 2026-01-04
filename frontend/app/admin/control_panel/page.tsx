import React from "react";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
} from "lucide-react";

/* ================= TYPES ================= */

interface Stats {
  totalUsers: number;
  activeUsers: number;
  totalCourses: number;
  totalRevenue: number;
  newStudents: number;
}

interface User {
  email: string;
  ner: string;
  avatar?: string;
  hskLevel: string;
  joinDate: string;
}

interface DashboardProps {
  stats: Stats;
  users: User[];
}

/* ================= COMPONENT ================= */

const StatCard = ({
  icon: Icon,
  title,
  value,
  color,
  subtitle,
}: any) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-gray-600 text-sm">{title}</h3>
    <p className="text-3xl font-bold text-gray-900">{value}</p>
    {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ stats, users }) => {
  return (
    <div className="space-y-6">
      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Нийт хэрэглэгч"
          value={stats.totalUsers}
          color="bg-blue-500"
          subtitle={`${stats.activeUsers} идэвхтэй`}
        />
        <StatCard
          icon={BookOpen}
          title="Нийт хичээл"
          value={stats.totalCourses}
          color="bg-green-500"
        />
        <StatCard
          icon={DollarSign}
          title="Нийт орлого"
          value={`$${stats.totalRevenue}`}
          color="bg-yellow-500"
        />
        <StatCard
          icon={TrendingUp}
          title="Шинэ сурагч"
          value={stats.newStudents}
          color="bg-purple-500"
          subtitle="Сүүлийн 30 хоног"
        />
      </div>

      {/* ===== CHART + ACTIVITY ===== */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* HSK distribution */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-4">HSK түвшний тархалт</h3>

          {["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"].map(level => {
            const count = users.filter(u => u.hskLevel === level).length;
            const percent = (count / (users.length || 1)) * 100;

            return (
              <div key={level} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>{level}</span>
                  <span>{count} хүн</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-blue-600 rounded"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-4">Сүүлийн үйл ажиллагаа</h3>

          <div className="space-y-3">
            {users.slice(0, 5).map(user => (
              <div
                key={user.email}
                className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"
              >
                <div className="text-2xl">{user.avatar}</div>
                <div className="flex-1">
                  <p className="font-medium">{user.ner}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <span className="text-xs text-gray-400">{user.joinDate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";
import { Search, Edit2, Trash2 } from "lucide-react";

/* ================= TYPES ================= */

export interface User {
  email: string;
  ner: string;
  nas: number;
  utas: string;
  avatar?: string;
  hskLevel: string;
  joinDate: string;
  courses?: any[];
}

interface UsersProps {
  users: User[];
  filteredUsers: User[];
  searchTerm: string;
  selectedLevel: string;
  setSearchTerm: (v: string) => void;
  setSelectedLevel: (v: string) => void;
  onEdit: (user: User) => void;
  onDelete: (email: string) => void;
}

/* ================= COMPONENT ================= */

const Users: React.FC<UsersProps> = ({
  users,
  filteredUsers,
  searchTerm,
  selectedLevel,
  setSearchTerm,
  setSelectedLevel,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="space-y-6">
      {/* ===== FILTER BAR ===== */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Хайх (нэр, имэйл)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">Бүх түвшин</option>
              {["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"].map(level => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          {filteredUsers.length} хэрэглэгч олдлоо
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500">Хэрэглэгч</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500">Холбоо</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500">Түвшин</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500">Хичээл</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500">Огноо</th>
                <th className="px-6 py-3 text-right text-xs text-gray-500">Үйлдэл</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredUsers.map(user => (
                <tr key={user.email} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{user.avatar}</div>
                      <div>
                        <p className="font-medium">{user.ner}</p>
                        <p className="text-sm text-gray-500">Нас: {user.nas}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-sm">{user.email}</p>
                    <p className="text-sm text-gray-500">{user.utas}</p>
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {user.hskLevel}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {user.courses?.length || 0}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.joinDate}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onEdit(user)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Edit2 className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() => onDelete(user.email)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    Хэрэглэгч олдсонгүй
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;

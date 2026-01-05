"use client";

import React from "react";
import { Award } from "lucide-react";

const Achievements = ({ currentUser }) => {
  return (
    <div className="space-y-4">
      {currentUser.achievements && currentUser.achievements.length > 0 ? (
        currentUser.achievements.map((achievement, idx) => (
          <div key={idx} className="flex items-center gap-4 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
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
  );
};

export default Achievements;

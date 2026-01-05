"use client";

import React from "react";

const Progress = ({ currentUser, getProgressForLevel }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">HSK Түвшний явц</h3>
        <div className="space-y-4">
          {['HSK 1','HSK 2','HSK 3','HSK 4','HSK 5','HSK 6'].map(level => {
            const progress = getProgressForLevel(level);
            return (
              <div key={level}>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-gray-700">{level}</span>
                  <span className="text-gray-600">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className={`h-3 rounded-full transition-all ${progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${progress}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Progress;

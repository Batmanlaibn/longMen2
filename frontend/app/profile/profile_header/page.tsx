"use client";

import React from "react";

const ProfileHeader = ({ currentUser, getLevelColor }) => {
  return (
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
  );
};

export default ProfileHeader;

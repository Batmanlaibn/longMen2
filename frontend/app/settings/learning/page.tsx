"use client";

import React from "react";
import { Save } from "lucide-react";

interface LearningSettingsProps {
  currentFormData: any;
  isSaving: boolean;
  handleInputChange: (field: string, value: any) => void;
  handleToggle: (field: any) => void;
  saveSettings: () => void;
}

const LearningSettings: React.FC<LearningSettingsProps> = ({
  currentFormData,
  isSaving,
  handleInputChange,
  handleToggle,
  saveSettings,
}) => {
  const difficultyLevels = ["Амархан", "Дунд", "Хүнд"];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Суралцах тохиргоо</h2>

      <div className="space-y-4">
        {/* Sound effects */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-semibold text-gray-800">Дууны эффект</h3>
            <p className="text-sm text-gray-600">Хичээл явцад дууны эффект</p>
          </div>
          <button
            onClick={() => handleToggle("soundEffects")}
            className={`w-12 h-6 rounded-full transition-colors ${
              currentFormData.soundEffects ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                currentFormData.soundEffects ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Autoplay */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-semibold text-gray-800">Автомат тоглуулах</h3>
            <p className="text-sm text-gray-600">Видео автоматаар тоглуулах</p>
          </div>
          <button
            onClick={() => handleToggle("autoplay")}
            className={`w-12 h-6 rounded-full transition-colors ${
              currentFormData.autoplay ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                currentFormData.autoplay ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Study goal */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Өдөрт суралцах зорилго
          </label>
          <select
            value={currentFormData.studyGoal || "30"}
            onChange={(e) => handleInputChange("studyGoal", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="15">15 минут</option>
            <option value="30">30 минут</option>
            <option value="60">1 цаг</option>
            <option value="120">2 цаг</option>
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Хүндрэлийн түвшин
          </label>
          <div className="flex gap-2">
            {difficultyLevels.map((level) => (
              <button
                key={level}
                onClick={() => handleInputChange("difficulty", level)}
                className={`flex-1 py-2 border-2 rounded-lg transition-colors ${
                  currentFormData.difficulty === level
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-300 hover:border-blue-600 hover:text-blue-600"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={saveSettings}
          disabled={isSaving}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Хадгалж байна..." : "Хадгалах"}
        </button>
      </div>
    </div>
  );
};

export default LearningSettings;

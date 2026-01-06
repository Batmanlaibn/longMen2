"use client";

import React from "react";
import { Save, Moon, Sun } from "lucide-react";

interface LanguageSettingsProps {
  currentFormData: any;
  isSaving: boolean;
  handleInputChange: (field: string, value: any) => void;
  handleToggle: (field: any) => void;
  saveSettings: () => void;
}

const LanguageSettings: React.FC<LanguageSettingsProps> = ({
  currentFormData,
  isSaving,
  handleInputChange,
  handleToggle,
  saveSettings,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Хэл ба бүс нутгийн тохиргоо
      </h2>

      <div className="space-y-4">
        {/* Interface language */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Интерфэйсийн хэл
          </label>
          <select
            value={currentFormData.language || "mn"}
            onChange={(e) => handleInputChange("language", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="mn">Монгол</option>
            <option value="en">English</option>
            <option value="zh">中文</option>
          </select>
        </div>

        {/* Timezone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Цагийн бүс
          </label>
          <select
            value={currentFormData.timezone || "UTC+8"}
            onChange={(e) => handleInputChange("timezone", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="UTC+8">UTC+8 (Улаанбаатар)</option>
            <option value="UTC+8-Beijing">UTC+8 (Beijing)</option>
            <option value="UTC+0">UTC+0 (London)</option>
          </select>
        </div>

        {/* Dark mode */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-semibold text-gray-800">Харанхуй горим</h3>
            <p className="text-sm text-gray-600">
              Харанхуй өнгөний загвар ашиглах
            </p>
          </div>

          <button
            onClick={() => handleToggle("darkMode")}
            className={`w-12 h-6 rounded-full transition-colors ${
              currentFormData.darkMode ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform flex items-center justify-center ${
                currentFormData.darkMode
                  ? "translate-x-6"
                  : "translate-x-1"
              }`}
            >
              {currentFormData.darkMode ? (
                <Moon className="w-3 h-3 text-blue-600" />
              ) : (
                <Sun className="w-3 h-3 text-gray-400" />
              )}
            </div>
          </button>
        </div>

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

export default LanguageSettings;

"use client";

import React from "react";
import { Save } from "lucide-react";

interface ProfileSettingsProps {
  currentFormData: any;
  isSaving: boolean;
  handleInputChange: (field: string, value: any) => void;
  saveSettings: () => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  currentFormData,
  isSaving,
  handleInputChange,
  saveSettings,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Хувийн мэдээлэл</h2>

      <div className="flex items-center gap-6">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-4xl">
          {currentFormData.avatar}
        </div>
        <div className="text-sm text-gray-600">
          <p>Аватар өөрчлөх боломж удахгүй нэмэгдэнэ</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Нэр
          </label>
          <input
            type="text"
            value={currentFormData.ner || ""}
            onChange={(e) => handleInputChange("ner", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Имэйл хаяг
          </label>
          <input
            type="email"
            value={currentFormData.email || ""}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1">
            И-мэйл хаяг өөрчлөх боломжгүй
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Утасны дугаар
          </label>
          <input
            type="tel"
            value={currentFormData.utas || ""}
            onChange={(e) => handleInputChange("utas", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Нас
          </label>
          <input
            type="number"
            value={currentFormData.nas || 0}
            onChange={(e) =>
              handleInputChange("nas", parseInt(e.target.value))
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Био
          </label>
          <textarea
            rows={3}
            value={currentFormData.bio || ""}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
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

export default ProfileSettings;

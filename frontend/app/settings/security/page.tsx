"use client";

import React from "react";
import { Save } from "lucide-react";

interface SecuritySettingsProps {
  currentFormData: any;
  isSaving: boolean;
  handleToggle: (field: any) => void;
  saveSettings: () => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  currentFormData,
  isSaving,
  handleToggle,
  saveSettings,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Нууцлал ба аюулгүй байдал
      </h2>

      <div className="space-y-4">
        {/* Change password */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Нууц үг солих</h3>
          <p className="text-sm text-gray-600 mb-3">
            Нууц үг солих боломж удахгүй нэмэгдэнэ
          </p>
        </div>

        {/* Two-factor authentication */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-semibold text-gray-800">Хоёр шаттай баталгаажуулалт</h3>
            <p className="text-sm text-gray-600">
              Нэмэлт аюулгүй байдлын давхарга
            </p>
          </div>
          <button
            onClick={() => handleToggle("twoFactor")}
            className={`w-12 h-6 rounded-full transition-colors ${
              currentFormData.twoFactor ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                currentFormData.twoFactor ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
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

export default SecuritySettings;

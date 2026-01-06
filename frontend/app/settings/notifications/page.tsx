"use client";

import React from "react";
import { Save } from "lucide-react";

interface NotificationSettingsProps {
  currentFormData: any;
  isSaving: boolean;
  handleToggle: (field: any) => void;
  handleNotificationTypeToggle: (type: any) => void;
  saveSettings: () => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  currentFormData,
  isSaving,
  handleToggle,
  handleNotificationTypeToggle,
  saveSettings,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Мэдэгдлийн тохиргоо
      </h2>

      <div className="space-y-4">
        {/* Email notifications */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-semibold text-gray-800">Имэйл мэдэгдэл</h3>
            <p className="text-sm text-gray-600">
              Хичээл, сорил, шинэчлэлтийн мэдэгдэл
            </p>
          </div>
          <button
            onClick={() => handleToggle("emailNotifications")}
            className={`w-12 h-6 rounded-full transition-colors ${
              currentFormData.emailNotifications ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                currentFormData.emailNotifications
                  ? "translate-x-6"
                  : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Push notifications */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-semibold text-gray-800">Push мэдэгдэл</h3>
            <p className="text-sm text-gray-600">
              Гар утсанд мэдэгдэл авах
            </p>
          </div>
          <button
            onClick={() => handleToggle("pushNotifications")}
            className={`w-12 h-6 rounded-full transition-colors ${
              currentFormData.pushNotifications ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                currentFormData.pushNotifications
                  ? "translate-x-6"
                  : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Notification types */}
        <div className="space-y-2 p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3">
            Мэдэгдлийн төрөл
          </h3>

          {[
            { key: "lessonReminders", label: "Хичээлийн сануулга" },
            { key: "newContent", label: "Шинэ контент" },
            { key: "progressReport", label: "Явцын тайлан" },
            { key: "scoreUpdates", label: "Онооны мэдээлэл" },
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={
                  currentFormData.notificationTypes?.[item.key] ?? true
                }
                onChange={() =>
                  handleNotificationTypeToggle(item.key)
                }
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700">{item.label}</span>
            </label>
          ))}
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

export default NotificationSettings;

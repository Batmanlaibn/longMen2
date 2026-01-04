import React from "react";
import { Save, Shield, Globe, Bell } from "lucide-react";

/* ================= TYPES ================= */

interface SystemSettingsProps {
  settings: {
    siteName: string;
    defaultLanguage: string;
    maintenanceMode: boolean;
    emailNotifications: boolean;
  };
  updateSettings: (key: string, value: any) => void;
  handleSaveSettings: () => void;
}

/* ================= COMPONENT ================= */

const SystemSettings: React.FC<SystemSettingsProps> = ({
  settings,
  updateSettings,
  handleSaveSettings,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Системийн тохиргоо
      </h2>

      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">

        {/* ===== GENERAL ===== */}
        <section>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <Globe className="w-5 h-5" />
            Ерөнхий тохиргоо
          </h3>

          <div className="space-y-4">
            <Input
              label="Сайтын нэр"
              value={settings.siteName}
              onChange={(v) => updateSettings("siteName", v)}
            />

            <Select
              label="Үндсэн хэл"
              value={settings.defaultLanguage}
              onChange={(v) => updateSettings("defaultLanguage", v)}
              options={[
                { value: "mn", label: "Монгол" },
                { value: "en", label: "English" },
                { value: "zh", label: "中文" },
              ]}
            />
          </div>
        </section>

        {/* ===== SECURITY ===== */}
        <section>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <Shield className="w-5 h-5" />
            Аюулгүй байдал
          </h3>

          <Toggle
            label="Maintenance mode"
            description="Сайт түр хугацаанд хаагдана"
            checked={settings.maintenanceMode}
            onChange={(v) => updateSettings("maintenanceMode", v)}
          />
        </section>

        {/* ===== NOTIFICATIONS ===== */}
        <section>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <Bell className="w-5 h-5" />
            Мэдэгдэл
          </h3>

          <Toggle
            label="И-мэйл мэдэгдэл"
            description="Системийн мэдэгдлийг и-мэйлээр авах"
            checked={settings.emailNotifications}
            onChange={(v) => updateSettings("emailNotifications", v)}
          />
        </section>

        {/* ===== SAVE ===== */}
        <button
          onClick={handleSaveSettings}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          Тохиргоо хадгалах
        </button>
      </div>
    </div>
  );
};

export default SystemSettings;

/* ================= UI HELPERS ================= */

const Input = ({ label, value, onChange }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const Select = ({ label, value, onChange, options }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
    >
      {options.map((o: any) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

const Toggle = ({ label, description, checked, onChange }: any) => (
  <div className="flex items-center justify-between border rounded-lg p-4">
    <div>
      <p className="font-medium text-gray-900">{label}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="w-5 h-5 accent-blue-600"
    />
  </div>
);

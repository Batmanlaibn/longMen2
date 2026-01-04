import React from "react";
import { Mail, Phone, Globe, Save } from "lucide-react";
import AboutSettings from "./about/page";
import ContactSettings from "./contact/page";
import FooterSettings from "./footer/page";
import CoursesSettings from "./courses/page";

/* ================= TYPES ================= */

interface ContentSettingsProps {
  siteData: any;
  updateSiteData: (path: string, value: any) => void;
  handleSaveSiteData: () => void;
}

/* ================= COMPONENT ================= */

const ContentSettings: React.FC<ContentSettingsProps> = ({
  siteData,
  updateSiteData,
  handleSaveSiteData,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Website мэдээлэл засах
      </h2>

      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">

        {/* ===== ABOUT ===== */}
        <AboutSettings
          about={siteData.about}
          updateSiteData={updateSiteData}
        />


        {/* ===== CONTACT ===== */}
        <ContactSettings
          siteData={siteData}
          updateSiteData={updateSiteData}
        />


        {/* ===== FOOTER ===== */}
        <FooterSettings
          siteData={siteData}
          updateSiteData={updateSiteData}
        />

        <CoursesSettings
          courses={siteData.courses}
          updateCourses={(updated) =>
            updateSiteData("courses", updated)
          }
          handleSaveCourses={handleSaveSiteData}
        />
        

        {/* ===== SAVE ===== */}
        <button
          onClick={handleSaveSiteData}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          Хадгалах
        </button>
      </div>
    </div>
  );
};

export default ContentSettings;

/* ================= REUSABLE UI ================= */

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

const Textarea = ({ label, value, onChange }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <textarea
      rows={3}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const IconInput = ({ label, icon: Icon, value, onChange }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
);

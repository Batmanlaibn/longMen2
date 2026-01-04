import React from "react";

interface AboutSettingsProps {
  about: any;
  updateSiteData: (path: string, value: any) => void;
}

const AboutSettings: React.FC<AboutSettingsProps> = ({
  about,
  updateSiteData,
}) => {
  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Бидний тухай
      </h3>

      <div className="space-y-4">
        <Input
          label="Гарчиг"
          value={about?.introduction?.title || ""}
          onChange={(v) =>
            updateSiteData("about.introduction.title", v)
          }
        />

        <Textarea
          label="Танилцуулга - 1 дэх догол мөр"
          value={about?.introduction?.paragraphs?.[0] || ""}
          onChange={(v) => {
            const arr = [...(about?.introduction?.paragraphs || ["", ""])];
            arr[0] = v;
            updateSiteData("about.introduction.paragraphs", arr);
          }}
        />

        <Textarea
          label="Танилцуулга - 2 дахь догол мөр"
          value={about?.introduction?.paragraphs?.[1] || ""}
          onChange={(v) => {
            const arr = [...(about?.introduction?.paragraphs || ["", ""])];
            arr[1] = v;
            updateSiteData("about.introduction.paragraphs", arr);
          }}
        />
      </div>
      ------------------------------------------------------------------------------------------------------------------------------------
    </section>
  );
};

export default AboutSettings;

/* ===== UI ===== */

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

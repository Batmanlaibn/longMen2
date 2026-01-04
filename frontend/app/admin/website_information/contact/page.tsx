import React from "react";
import { Mail, Phone, Globe } from "lucide-react";

interface ContactSettingsProps {
  siteData: any;
  updateSiteData: (path: string, value: any) => void;
}

const ContactSettings: React.FC<ContactSettingsProps> = ({
  siteData,
  updateSiteData,
}) => {
  return (
    <>
      {/* ===== CONTACT (ABOUT доторх) ===== */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Холбоо барих мэдээлэл
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <IconInput
            label="И-мэйл"
            icon={Mail}
            value={siteData.about?.contact?.email || ""}
            onChange={(v) =>
              updateSiteData("about.contact.email", v)
            }
          />

          <IconInput
            label="Утас"
            icon={Phone}
            value={siteData.about?.contact?.phone || ""}
            onChange={(v) =>
              updateSiteData("about.contact.phone", v)
            }
          />

          <IconInput
            label="Facebook"
            icon={Globe}
            value={siteData.about?.contact?.facebook || ""}
            onChange={(v) =>
              updateSiteData("about.contact.facebook", v)
            }
          />
        </div>
      </section>

      {/* ===== CONTACT PAGE ===== */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Холбоо барих хуудас
        </h3>

        <div className="space-y-4">
          <Input
            label="Hero гарчиг"
            value={siteData.contactPage?.hero?.title || ""}
            onChange={(v) =>
              updateSiteData("contactPage.hero.title", v)
            }
          />

          <Input
            label="Hero дэд гарчиг"
            value={siteData.contactPage?.hero?.subtitle || ""}
            onChange={(v) =>
              updateSiteData("contactPage.hero.subtitle", v)
            }
          />

          <Input
            label="Холбоо барих хэсгийн гарчиг"
            value={siteData.contactPage?.contactInfo?.title || ""}
            onChange={(v) =>
              updateSiteData("contactPage.contactInfo.title", v)
            }
          />
        </div>
        ------------------------------------------------------------------------------------------------------------------------------------
      </section>
    </>
  );
};

export default ContactSettings;

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

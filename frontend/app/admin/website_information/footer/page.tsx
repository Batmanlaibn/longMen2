import React from "react";

interface FooterSettingsProps {
  siteData: any;
  updateSiteData: (path: string, value: any) => void;
}

const FooterSettings: React.FC<FooterSettingsProps> = ({
  siteData,
  updateSiteData,
}) => {
  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Footer мэдээлэл
      </h3>

      <div className="space-y-4">
        <Input
          label="Брэнд нэр"
          value={siteData.footer?.brand?.name || ""}
          onChange={(v) =>
            updateSiteData("footer.brand.name", v)
          }
        />

        <Textarea
          label="Брэнд тайлбар"
          value={siteData.footer?.brand?.description || ""}
          onChange={(v) =>
            updateSiteData("footer.brand.description", v)
          }
        />

        <Input
          label="Copyright текст"
          value={siteData.footer?.copyright?.text || ""}
          onChange={(v) =>
            updateSiteData("footer.copyright.text", v)
          }
        />

        <Input
          label="Footer имэйл"
          value={siteData.footer?.contact?.email || ""}
          onChange={(v) =>
            updateSiteData("footer.contact.email", v)
          }
        />

        <Input
          label="Footer утас"
          value={siteData.footer?.contact?.phone || ""}
          onChange={(v) =>
            updateSiteData("footer.contact.phone", v)
          }
        />

        <Input
          label="Footer хаяг"
          value={siteData.footer?.contact?.address || ""}
          onChange={(v) =>
            updateSiteData("footer.contact.address", v)
          }
        />
      </div>
    </section>
  );
};

export default FooterSettings;

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
      rows={2}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

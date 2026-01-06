"use client";

import data from "../../public/data/data.json";
import FooterBrand from "./FooterComponents/FooterBrand";
import FooterLinks from "./FooterComponents/FooterLinks";
import FooterContact from "./FooterComponents/FooterContact";

type FooterData = {
  brand: {
    name: string;
    description: string;
  };
  links: {
    title: string;
    items: string[];
  };
  contact: {
    title: string;
    email: string;
    phone: string;
    address: string;
  };
};

const footerData: FooterData = data.footer;

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        <FooterBrand {...footerData.brand} />
        <FooterLinks {...footerData.links} />
        <FooterContact {...footerData.contact} />
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} {footerData.brand.name}. Бүх эрх хуулиар хамгаалагдсан.
      </div>
    </footer>
  );
}

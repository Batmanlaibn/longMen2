import React from "react";

interface ContactInfo {
  title: string;
  description: string;
  email: string;
  phone: string;
  facebook: string;
}

interface ContactSectionProps {
  contact: ContactInfo;
}

const ContactSection: React.FC<ContactSectionProps> = ({ contact }) => {
  return (
    <section className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md p-8 text-white">
      <h2 className="text-2xl font-bold mb-4">{contact.title}</h2>
      <p className="mb-4">{contact.description}</p>
      <div className="space-y-2">
        <p>📧 Email: {contact.email}</p>
        <p>📱 Утас: {contact.phone}</p>
        <p>🌐 Facebook: {contact.facebook}</p>
      </div>
    </section>
  );
};

export default ContactSection;

"use client";

interface FooterContactProps {
  title: string;
  email: string;
  phone: string;
  address: string;
}

export default function FooterContact({ title, email, phone, address }: FooterContactProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      <p className="text-sm">📧 {email}</p>
      <p className="text-sm">📞 {phone}</p>
      <p className="text-sm">📍 {address}</p>
    </div>
  );
}

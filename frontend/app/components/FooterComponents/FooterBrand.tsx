"use client";

interface FooterBrandProps {
  name: string;
  description: string;
}

export default function FooterBrand({ name, description }: FooterBrandProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-3">{name}</h2>
      <p className="text-sm">{description}</p>
    </div>
  );
}

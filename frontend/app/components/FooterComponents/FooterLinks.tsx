"use client";

interface FooterLinksProps {
  title: string;
  items: string[];
}

export default function FooterLinks({ title, items }: FooterLinksProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      <ul className="space-y-2 text-sm">
        {items.map((item, index) => (
          <li
            key={index}
            className="hover:text-white cursor-pointer transition"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

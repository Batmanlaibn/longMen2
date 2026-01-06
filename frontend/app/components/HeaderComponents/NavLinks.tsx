import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinksProps {
  menuItems: { title: string; href: string }[];
  mobile?: boolean;
  onClick?: () => void;
}

export default function NavLinks({ menuItems, mobile, onClick }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <>
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClick}
          className={`${
            mobile
              ? pathname === item.href
                ? "bg-red-100 text-red-600 font-semibold"
                : "text-gray-700"
              : pathname === item.href
              ? "text-red-600 font-semibold"
              : "text-gray-700"
          } ${mobile ? "px-2 py-1 rounded hover:bg-red-50" : "hover:text-red-600 transition"}`}
        >
          {item.title}
        </Link>
      ))}
    </>
  );
}

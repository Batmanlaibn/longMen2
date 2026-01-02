"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false); // Mobile menu
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [profileMenu, setProfileMenu] = useState(false); // Profile dropdown
  const pathname = usePathname();

  const profileRef = useRef<HTMLDivElement>(null);

  // LocalStorage-с хэрэглэгч байгаа эсэхийг шалгах
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setIsLoggedIn(true);
  }, []);

  // Profile menu-г гадагшаа click хийхэд хаах
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setProfileMenu(false);
  };

  const menuItems = [
    { title: "Нүүр", href: "/" },
    { title: "Хичээлүүд", href: "/courses" },
    { title: "Бидний тухай", href: "/about" },
    { title: "Холбоо барих", href: "/contact" },
  ];

  return (
    <header className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-red-600">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
            <img
              className="w-full h-full object-cover"
              src="https://scontent.fuln4-2.fna.fbcdn.net/v/t39.30808-6/557457428_122106458367049316_7884193393419168958_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=z6GYK3AONkAQ7kNvwGYhraA&_nc_oc=AdnIE22fw00X4QuhXRm7OXDD3CH1jaAc7f7atzmHEBXqOHSoVDyIHi59ROCS589eSTI&_nc_zt=23&_nc_ht=scontent.fuln4-2.fna&_nc_gid=HpSG1tRvYXRxmGKgR8OCvw&oh=00_AfmPn-oPu99rxfgxFSlUJ6y92vLuC2mkdITeKuyU4WtZ9Q&oe=69584F13"
              alt="Logo"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="space-x-6 hidden md:flex">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${
                pathname === item.href
                  ? "text-red-600 font-semibold"
                  : "text-gray-700"
              } hover:text-red-600 transition`}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Desktop: Login/Profile */}
          {isLoggedIn ? (
            <div className="relative" ref={profileRef}>
              <div
                className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 cursor-pointer"
                onClick={() => setProfileMenu(!profileMenu)}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Profile dropdown */}
              <div
                className={`absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg transition-transform duration-300 ${
                  profileMenu
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0 pointer-events-none"
                }`}
              >
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition"
                  onClick={() => setProfileMenu(false)}
                >
                  Профайл
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition"
                  onClick={() => setProfileMenu(false)}
                >
                  Тохиргоо
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition"
                >
                  Гарах
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden md:block">
              <Link
                href="/login"
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Нэвтрэх
              </Link>
            </div>
          )}

          {/* Mobile menu icon */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex justify-between items-center border-b">
          <span className="text-xl font-bold text-red-600">Цэс</span>
          <button className="text-2xl" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>

        <nav className="flex flex-col p-6 space-y-4 text-lg">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`px-2 py-1 rounded ${
                pathname === item.href
                  ? "bg-red-100 text-red-600 font-semibold"
                  : "text-gray-700"
              } hover:bg-red-50`}
            >
              {item.title}
            </Link>
          ))}

          {isLoggedIn ? (
            <div className="flex flex-col mt-4 gap-2">
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Профайл
              </Link>
              <Link
                href="/settings"
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Тохиргоо
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg hover:bg-gray-100 transition text-left"
              >
                Гарах
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-4 bg-red-600 text-white text-center py-2 rounded-lg hover:bg-red-700 transition"
            >
              Нэвтрэх
            </Link>
          )}
        </nav>
      </div>

      {/* Background overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  );
}

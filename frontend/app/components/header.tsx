
"use client";


import { useState, useEffect, useRef } from "react";
import Logo from "./HeaderComponents/Logo";
import NavLinks from "./HeaderComponents/NavLinks";
import MobileMenu from "./HeaderComponents/MobileMenu";
import ProfileMenu from "./HeaderComponents/ProfileMenu";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [profileMenu, setProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { title: "Нүүр", href: "/" },
    { title: "Хичээлүүд", href: "/courses" },
    { title: "Бидний тухай", href: "/about" },
    { title: "Холбоо барих", href: "/contact" },
  ];

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setUserEmail(userData.email);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserEmail('');
    setProfileMenu(false);
  };

  return (
    <header className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Logo />

        <nav className="space-x-6 hidden md:flex">
          <NavLinks menuItems={menuItems} />
        </nav>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="relative" ref={profileRef}>
              <div
                className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 cursor-pointer hover:border-blue-500 transition"
                onClick={() => setProfileMenu(!profileMenu)}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>

              {profileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg" onClick={() => setProfileMenu(false)}>Профайл</Link>
                  <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setProfileMenu(false)}>Тохиргоо</Link>
                  {userEmail.toUpperCase() === 'ADMIN@GMAIL.COM' && (
                    <Link href="/admin" className="block px-4 py-2 hover:bg-purple-50 text-purple-600 font-semibold border-t border-gray-200" onClick={() => setProfileMenu(false)}>👑 Admin Panel</Link>
                  )}
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg border-t border-gray-200">Гарах</button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:block">
              <Link href="/login" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">Нэвтрэх</Link>
            </div>
          )}

          <button className="md:hidden text-3xl" onClick={() => setOpen(true)}>☰</button>
        </div>
      </div>

      <MobileMenu open={open} setOpen={setOpen} menuItems={menuItems} isLoggedIn={isLoggedIn} userEmail={userEmail} handleLogout={handleLogout} />
    </header>
  );
}

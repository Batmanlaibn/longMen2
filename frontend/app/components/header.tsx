"use client";
import { useState, useEffect, useRef } from "react";
import Logo from "./HeaderComponents/Logo";
import NavLinks from "./HeaderComponents/NavLinks";
import MobileMenu from "./HeaderComponents/MobileMenu";
import ProfileMenu from "./HeaderComponents/ProfileMenu";
import ThemeToggle from "./HeaderComponents/ThemeToggle";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [profileMenu, setProfileMenu] = useState(false);
  const profileRef = useRef(null);

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
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          <NavLinks menuItems={menuItems} />
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {isLoggedIn ? (
            <div className="relative hidden md:block" ref={profileRef}>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                onClick={() => setProfileMenu(!profileMenu)}
              >
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-semibold">
                  {userEmail.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">{userEmail}</span>
              </button>

              {profileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border dark:border-gray-700">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
                    onClick={() => setProfileMenu(false)}
                  >
                    Профайл
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
                    onClick={() => setProfileMenu(false)}
                  >
                    Тохиргоо
                  </Link>
                  {userEmail.toUpperCase() === 'ADMIN@GMAIL.COM' && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-purple-600 dark:text-purple-400 font-semibold transition"
                      onClick={() => setProfileMenu(false)}
                    >
                      👑 Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
                  >
                    Гарах
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden md:block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Нэвтрэх
            </Link>
          )}

          <button
            className="md:hidden text-2xl text-gray-700 dark:text-gray-300"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>
      </div>

      <MobileMenu
        open={open}
        setOpen={setOpen}
        menuItems={menuItems}
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        handleLogout={handleLogout}
      />
    </header>
  );
}
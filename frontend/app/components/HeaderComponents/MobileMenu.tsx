import Link from "next/link";  // <-- Энийг нэмнэ
import NavLinks from "./NavLinks";
import ProfileMenu from "./ProfileMenu";

interface MobileMenuProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  menuItems: { title: string; href: string }[];
  isLoggedIn: boolean;
  userEmail: string;
  handleLogout: () => void;
}

export default function MobileMenu({ open, setOpen, menuItems, isLoggedIn, userEmail, handleLogout }: MobileMenuProps) {
  return (
    <>
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
          <NavLinks menuItems={menuItems} mobile onClick={() => setOpen(false)} />

          {isLoggedIn ? (
            <ProfileMenu userEmail={userEmail} handleLogout={handleLogout} open={open} setOpen={setOpen} />
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

      {open && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />}
    </>
  );
}

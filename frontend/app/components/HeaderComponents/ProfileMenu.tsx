import Link from "next/link";

interface ProfileMenuProps {
  userEmail: string;
  handleLogout: () => void;
  open: boolean;
  setOpen: (val: boolean) => void;
}

export default function ProfileMenu({ userEmail, handleLogout, open, setOpen }: ProfileMenuProps) {
  const isAdmin = userEmail.toUpperCase() === "ADMIN@GMAIL.COM";

  return (
    <div className="flex flex-col mt-4 gap-2">
      <Link 
        href="/profile" 
        onClick={() => setOpen(false)} 
        className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition"
      >
        Профайл
      </Link>
      <Link 
        href="/settings" 
        onClick={() => setOpen(false)} 
        className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition"
      >
        Тохиргоо
      </Link>
      {isAdmin && (
        <Link
          href="/admin"
          onClick={() => setOpen(false)}
          className="px-4 py-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition"
        >
          👑 Admin Panel
        </Link>
      )}
      <button
        onClick={() => {
          handleLogout();
          setOpen(false);
        }}
        className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition text-left"
      >
        Гарах
      </button>
    </div>
  );
}
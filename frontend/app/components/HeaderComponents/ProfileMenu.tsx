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
      <Link href="/profile" onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg hover:bg-gray-100 transition">
        Профайл
      </Link>
      <Link href="/settings" onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg hover:bg-gray-100 transition">
        Тохиргоо
      </Link>
      {isAdmin && (
        <Link
          href="/admin"
          onClick={() => setOpen(false)}
          className="px-4 py-2 rounded-lg bg-purple-100 text-purple-700 font-semibold hover:bg-purple-200 transition"
        >
          👑 Admin Panel
        </Link>
      )}
      <button
        onClick={() => {
          handleLogout();
          setOpen(false);
        }}
        className="px-4 py-2 rounded-lg hover:bg-gray-100 transition text-left"
      >
        Гарах
      </button>
    </div>
  );
}

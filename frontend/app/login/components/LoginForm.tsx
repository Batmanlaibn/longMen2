"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  setNuutsugSergeeh: (value: boolean) => void;
  router: ReturnType<typeof useRouter>;
}

type LoginFormData = {
  email: string;
  nuutsugs: string;
};

export default function LoginForm({ setNuutsugSergeeh, router }: Props) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    nuutsugs: "",
  });
  const [aldaa, setAldaa] = useState("");
  const [amjilttai, setAmjilttai] = useState(false);
  const [nuutsugHaruulah, setNuutsugHaruulah] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAldaa("");
    setAmjilttai(false);

    if (!formData.email || !formData.nuutsugs) {
      setAldaa("И-мэйл болон нууц үгээ оруулна уу");
      return;
    }

    try {
      const res = await fetch("/api/users");
      const users: { email: string; nuutsugs: string }[] = await res.json();
      const existingUser = users.find((u) => u.email === formData.email);

      if (!existingUser) {
        setAldaa("И-мэйл олдсонгүй");
        return;
      }

      const bcrypt = (await import("bcryptjs")).default;
      const isPasswordValid = await bcrypt.compare(
        formData.nuutsugs,
        existingUser.nuutsugs
      );

      if (!isPasswordValid) {
        setAldaa("Нууц үг буруу байна");
        return;
      }

      setAmjilttai(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify({ email: existingUser.email }));
      }

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error: unknown) {
      setAldaa(error instanceof Error ? error.message : "Нэвтрэх үед алдаа гарлаа");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Нэвтрэх</h1>
      <p className="text-gray-600 text-center mb-6">Бүртгэлтэй хэрэглэгч</p>

      <div className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="И-мэйл"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <div className="relative">
          <input
            type={nuutsugHaruulah ? "text" : "password"}
            name="nuutsugs"
            placeholder="Нууц үг"
            value={formData.nuutsugs}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="button"
            onClick={() => setNuutsugHaruulah(!nuutsugHaruulah)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {nuutsugHaruulah ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="text-right">
          <button
            type="button"
            onClick={() => setNuutsugSergeeh(true)}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Нууц үгээ мартсан уу?
          </button>
        </div>

        {aldaa && <p className="text-red-600 text-sm bg-red-50 p-2 rounded">{aldaa}</p>}
        {amjilttai && (
          <p className="text-green-600 text-sm bg-green-50 p-2 rounded">
            Амжилттай нэвтэрлээ! Хуудас шилжүүлж байна...
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={amjilttai}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Нэвтрэх
        </button>
      </div>
    </>
  );
}

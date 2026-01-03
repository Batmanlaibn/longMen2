"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

type LoginForm = {
  email: string;
  nuutsugs: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    nuutsugs: "",
  });

  const [aldaa, setAldaa] = useState<string>("");
  const [amjilttai, setAmjilttai] = useState<boolean>(false);
  const [nuutsugHaruulah, setNuutsugHaruulah] = useState<boolean>(false);
  const [nuutsugSergeeh, setNuutsugSergeeh] = useState<boolean>(false);
  const [sergeehEmail, setSergeehEmail] = useState<string>("");
  const [sergeehAmjilttai, setSergeehAmjilttai] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      
      // localStorage-д хэрэглэгчийн мэдээлэл хадгалах
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          "user",
          JSON.stringify({ email: existingUser.email })
        );
      }
      
      // 1 секундын дараа home page руу шилжих
      setTimeout(() => {
        router.push("/");
      }, 1000);
      
    } catch (error: unknown) {
      if (error instanceof Error) setAldaa(error.message);
      else setAldaa("Нэвтрэх үед алдаа гарлаа");
    }
  };

  const handleNuutsugSergeeh = async () => {
    setAldaa("");
    setSergeehAmjilttai(false);

    if (!sergeehEmail) {
      setAldaa("И-мэйл хаягаа оруулна уу");
      return;
    }

    try {
      const res = await fetch("/api/users");
      const users: { email: string }[] = await res.json();

      const existingUser = users.find((u) => u.email === sergeehEmail);
      if (!existingUser) {
        setAldaa("И-мэйл олдсонгүй");
        return;
      }

      // Энд имэйл илгээх логик нэмэх
      // await fetch("/api/reset-password", { method: "POST", body: JSON.stringify({ email: sergeehEmail }) });
      
      setSergeehAmjilttai(true);
      setTimeout(() => {
        setNuutsugSergeeh(false);
        setSergeehEmail("");
        setSergeehAmjilttai(false);
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof Error) setAldaa(error.message);
      else setAldaa("Алдаа гарлаа");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        {!nuutsugSergeeh ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
              Нэвтрэх
            </h1>
            <p className="text-gray-600 text-center mb-6">
              Бүртгэлтэй хэрэглэгч
            </p>

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
                  aria-label={nuutsugHaruulah ? "Нууц үг нуух" : "Нууц үг харуулах"}
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

              {aldaa && (
                <p className="text-red-600 text-sm bg-red-50 p-2 rounded">
                  {aldaa}
                </p>
              )}
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

            <div className="mt-6 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Эсвэл</span>
                </div>
              </div>
              
              <button
                onClick={() => {/* signIn("google") */}}
                className="mt-4 w-full flex items-center justify-center border border-gray-300 py-2 rounded hover:bg-gray-50 transition"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google-аар нэвтрэх
              </button>
            </div>

            <p className="text-gray-600 text-center mt-6 text-sm">
              Шинэ хэрэглэгч үү?{" "}
              <a
                href="/register"
                className="text-indigo-600 font-semibold hover:text-indigo-700"
              >
                Бүртгүүлэх
              </a>
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
              Нууц үг сэргээх
            </h1>
            <p className="text-gray-600 text-center mb-6">
              Бүртгэлтэй и-мэйл хаягаа оруулна уу
            </p>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="И-мэйл"
                value={sergeehEmail}
                onChange={(e) => setSergeehEmail(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />

              {aldaa && (
                <p className="text-red-600 text-sm bg-red-50 p-2 rounded">
                  {aldaa}
                </p>
              )}
              {sergeehAmjilttai && (
                <p className="text-green-600 text-sm bg-green-50 p-2 rounded">
                  Нууц үг сэргээх холбоосыг таны и-мэйл хаяг руу илгээлээ!
                </p>
              )}

              <button
                onClick={handleNuutsugSergeeh}
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition font-medium"
              >
                Холбоос илгээх
              </button>

              <button
                type="button"
                onClick={() => {
                  setNuutsugSergeeh(false);
                  setSergeehEmail("");
                  setAldaa("");
                }}
                className="w-full text-gray-600 hover:text-gray-800 py-2 transition font-medium"
              >
                Буцах
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
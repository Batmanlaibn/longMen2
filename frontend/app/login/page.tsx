"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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
      localStorage.setItem(
        "user",
        JSON.stringify({ email: existingUser.email })
      );
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) setAldaa(error.message);
      else setAldaa("Нэвтрэх үед алдаа гарлаа");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Нэвтрэх
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Бүртгэлтэй хэрэглэгч
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="И-мэйл"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="password"
            name="nuutsugs"
            placeholder="Нууц үг"
            value={formData.nuutsugs}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />

          {aldaa && <p className="text-red-600">{aldaa}</p>}
          {amjilttai && <p className="text-green-600">Амжилттай нэвтэрлээ!</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Нэвтрэх
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600 mb-2">Эсвэл Google-аар нэвтрэх:</p>
          <button
            onClick={() => signIn("google")}  
            className="w-full flex items-center justify-center border py-2 rounded hover:bg-gray-100 transition"
          >
            <img src="/google-logo.svg" alt="Google" className="w-5 h-5 mr-2" />
            Google-аар нэвтрэх
          </button>
        </div>

        <p className="text-gray-600 text-center mt-4">
          Шинэ хэрэглэгч үү?{" "}
          <a
            href="/register"
            className="text-indigo-600 font-semibold hover:text-indigo-700"
          >
            Бүртгүүлэх
          </a>
        </p>
      </div>
    </div>
  );
}

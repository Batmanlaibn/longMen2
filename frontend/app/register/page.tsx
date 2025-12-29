"use client";

import { useState } from "react";

type FormData = {
  ner: string;
  email: string;
  utas: string;
  nas: string;
  nuutsugs: string;
  nuutsugsButalgaajuulah: string;
};

type ApiResponse = {
  message: string;
};

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    ner: "",
    email: "",
    utas: "",
    nas: "",
    nuutsugs: "",
    nuutsugsButalgaajuulah: ""
  });
  const [aldaa, setAldaa] = useState<string>("");
  const [amjilttai, setAmjilttai] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAldaa("");
    setAmjilttai(false);

    if (formData.nuutsugs !== formData.nuutsugsButalgaajuulah) {
      setAldaa("Нууц үг таарахгүй байна");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setAldaa("И-мэйл буруу байна");
      return;
    }

    if (Number(formData.nas) < 18) {
      setAldaa("Танд бүртгүүлэх нас хүрээгүй байна");
      return;
    }

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ner: formData.ner,
          email: formData.email,
          utas: formData.utas,
          nas: formData.nas,
          nuutsugs: formData.nuutsugs
        })
      });

      const data: ApiResponse = await res.json();
      if (!res.ok) throw new Error(data.message);

      setAmjilttai(true);
      setFormData({
        ner: "",
        email: "",
        utas: "",
        nas: "",
        nuutsugs: "",
        nuutsugsButalgaajuulah: ""
      });
    } catch (error: unknown) {
      if (error instanceof Error) setAldaa(error.message);
      else setAldaa("Бүртгэл амжилтгүй боллоо");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Бүртгүүлэх</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="ner"
            placeholder="Нэр"
            value={formData.ner}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="И-мэйл"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="utas"
            type="tel"
            placeholder="Утас"
            value={formData.utas}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="nas"
            type="number"
            placeholder="Нас"
            value={formData.nas}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="nuutsugs"
            type="password"
            placeholder="Нууц үг"
            value={formData.nuutsugs}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="nuutsugsButalgaajuulah"
            type="password"
            placeholder="Нууц үг баталгаажуулах"
            value={formData.nuutsugsButalgaajuulah}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          {aldaa && <p className="text-red-600">{aldaa}</p>}
          {amjilttai && <p className="text-green-600">Бүртгэл амжилттай боллоо!</p>}

          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">
            Бүртгүүлэх
          </button>

          {/* Нэвтрэх холбоос */}
          <p className="text-gray-600 text-center mt-4">
            Бүртгэлтэй юу?{" "}
            <a href="/login" className="text-indigo-600 font-semibold hover:text-indigo-700">
              Нэвтрэх
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

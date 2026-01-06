"use client";

import { useState } from "react";

interface Props {
  setNuutsugSergeeh: (value: boolean) => void;
}

export default function PasswordResetForm({ setNuutsugSergeeh }: Props) {
  const [sergeehEmail, setSergeehEmail] = useState("");
  const [aldaa, setAldaa] = useState("");
  const [sergeehAmjilttai, setSergeehAmjilttai] = useState(false);

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

      // TODO: Send reset email
      setSergeehAmjilttai(true);
      setTimeout(() => {
        setNuutsugSergeeh(false);
        setSergeehEmail("");
        setSergeehAmjilttai(false);
      }, 3000);
    } catch (error: unknown) {
      setAldaa(error instanceof Error ? error.message : "Алдаа гарлаа");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Нууц үг сэргээх</h1>
      <p className="text-gray-600 text-center mb-6">Бүртгэлтэй и-мэйл хаягаа оруулна уу</p>

      <div className="space-y-4">
        <input
          type="email"
          placeholder="И-мэйл"
          value={sergeehEmail}
          onChange={(e) => setSergeehEmail(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        {aldaa && <p className="text-red-600 text-sm bg-red-50 p-2 rounded">{aldaa}</p>}
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
  );
}

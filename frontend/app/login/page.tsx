"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./components/LoginForm";
import PasswordResetForm from "./components/PasswordResetForm";

export default function LoginPage() {
  const router = useRouter();
  const [nuutsugSergeeh, setNuutsugSergeeh] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        {!nuutsugSergeeh ? (
          <LoginForm setNuutsugSergeeh={setNuutsugSergeeh} router={router} />
        ) : (
          <PasswordResetForm setNuutsugSergeeh={setNuutsugSergeeh} />
        )}
      </div>
    </div>
  );
}

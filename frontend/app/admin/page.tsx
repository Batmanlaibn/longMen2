"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues
const AdminPanel = dynamic(() => import('./AdminPanel'), { ssr: false });

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = () => {
      const user = localStorage.getItem('user');
      if (!user) {
        router.push('/login');
        return;
      }

      const { email } = JSON.parse(user);
      if (email.toUpperCase() !== 'ADMIN@GMAIL.COM') {
        alert('Та админ эрхгүй байна!');
        router.push('/');
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    };

    checkAdmin();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl text-gray-600">Ачааллаж байна...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return <AdminPanel />;
}
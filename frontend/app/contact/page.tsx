"use client";

import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
import Header from '../components/header';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    level: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', level: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Бидэнтэй холбогдох</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            HSK 1-6 хүртэлх бүх түвшний хичээлүүд. Туршлагатай багш нар таныг амжилтанд хүргэнэ.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Холбоо барих мэдээлэл</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Утас</p>
                    <p className="text-gray-600">+976 9999-9999</p>
                    <p className="text-gray-600">+976 8888-8888</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Имэйл</p>
                    <p className="text-gray-600">info@hskmongolia.mn</p>
                    <p className="text-gray-600">contact@hskmongolia.mn</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Хаяг</p>
                    <p className="text-gray-600">Улаанбаатар хот, Сүхбаатар дүүрэг</p>
                    <p className="text-gray-600">Төв талбай, Тэнгис кино театрын зүүн талд</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Ажиллах цаг</p>
                    <p className="text-gray-600">Даваа - Баасан: 09:00 - 18:00</p>
                    <p className="text-gray-600">Бямба: 10:00 - 16:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* HSK Levels */}
            <div className="bg-gradient-to-br from-blue-600 to-red-600 rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Бидний санал болгож буй түвшин</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>HSK 1 - Анхан шат (150 үг)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>HSK 2 - Суурь шат (300 үг)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>HSK 3 - Дунд шат (600 үг)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>HSK 4 - Дунд дээд шат (1200 үг)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>HSK 5 - Ахисан шат (2500 үг)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>HSK 6 - Дээд шат (5000+ үг)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Мессеж илгээх</h3>
            
            {submitted ? (
              <div className="text-center py-12">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Амжилттай илгээгдлээ!</h4>
                <p className="text-gray-600">Бид таньтай удахгүй холбогдох болно.</p>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Нэр
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Таны нэр"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Имэйл
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Утасны дугаар
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="+976 9999-9999"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Сонирхож буй түвшин
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  >
                    <option value="">Түвшин сонгох</option>
                    <option value="hsk1">HSK 1 - Анхан шат</option>
                    <option value="hsk2">HSK 2 - Суурь шат</option>
                    <option value="hsk3">HSK 3 - Дунд шат</option>
                    <option value="hsk4">HSK 4 - Дунд дээд шат</option>
                    <option value="hsk5">HSK 5 - Ахисан шат</option>
                    <option value="hsk6">HSK 6 - Дээд шат</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Мессеж
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Таны асуулт эсвэл мессеж..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white font-bold py-4 rounded-lg hover:from-blue-700 hover:to-red-700 transition transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Илгээх</span>
                  <Send className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 HSK Mongolia. Бүх эрх хуулиар хамгаалагдсан.</p>
          <p className="text-gray-500 mt-2 text-sm">Хятад хэл амжилттай эзэмших таны сонголт</p>
        </div>
      </footer>
    </div>
  );
}
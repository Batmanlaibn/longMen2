"use client";

import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import data from "../../../public/data/data.json";

export default function SendAMessage() {
  const { contactPage } = data;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    level: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        level: "",
        message: "",
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        {contactPage.form.title}
      </h3>

      {submitted ? (
        <div className="text-center py-12">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h4 className="text-2xl font-bold text-gray-900 mb-2">
            {contactPage.form.successMessage.title}
          </h4>
          <p className="text-gray-600">
            {contactPage.form.successMessage.subtitle}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder={contactPage.form.fields.name.placeholder}
            className="w-full px-4 py-3 border rounded-lg"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder={contactPage.form.fields.email.placeholder}
            className="w-full px-4 py-3 border rounded-lg"
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder={contactPage.form.fields.phone.placeholder}
            className="w-full px-4 py-3 border rounded-lg"
          />

          {/* Level */}
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg"
          >
            <option value="">
              {contactPage.form.fields.level.placeholder}
            </option>
            {contactPage.form.fields.level.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Message */}
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            placeholder={contactPage.form.fields.message.placeholder}
            className="w-full px-4 py-3 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white py-4 rounded-lg flex items-center justify-center gap-2"
          >
            {contactPage.form.submitButton}
            <Send className="w-5 h-5" />
          </button>
        </form>
      )}
    </div>
  );
}
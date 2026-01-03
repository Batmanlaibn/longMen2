"use client";

import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
import Header from '../components/header';
import data from '../../public/data/data.json';

export default function ContactPage() {
  const { contactPage } = data;
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
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{contactPage.hero.title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {contactPage.hero.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{contactPage.contactInfo.title}</h3>
              
              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{contactPage.contactInfo.phone.label}</p>
                    {contactPage.contactInfo.phone.numbers.map((number, idx) => (
                      <p key={idx} className="text-gray-600">{number}</p>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{contactPage.contactInfo.email.label}</p>
                    {contactPage.contactInfo.email.addresses.map((email, idx) => (
                      <p key={idx} className="text-gray-600">{email}</p>
                    ))}
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{contactPage.contactInfo.address.label}</p>
                    {contactPage.contactInfo.address.lines.map((line, idx) => (
                      <p key={idx} className="text-gray-600">{line}</p>
                    ))}
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{contactPage.contactInfo.workingHours.label}</p>
                    {contactPage.contactInfo.workingHours.schedule.map((time, idx) => (
                      <p key={idx} className="text-gray-600">{time}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* HSK Levels */}
            <div className="bg-gradient-to-br from-blue-600 to-red-600 rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">{contactPage.hskLevelsOffered.title}</h3>
              <div className="space-y-3">
                {contactPage.hskLevelsOffered.levels.map((level) => (
                  <div key={level.code} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5" />
                    <span>{level.name} ({level.words})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{contactPage.form.title}</h3>
            
            {submitted ? (
              <div className="text-center py-12">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  {contactPage.form.successMessage.title}
                </h4>
                <p className="text-gray-600">{contactPage.form.successMessage.subtitle}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {contactPage.form.fields.name.label}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder={contactPage.form.fields.name.placeholder}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {contactPage.form.fields.email.label}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder={contactPage.form.fields.email.placeholder}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {contactPage.form.fields.phone.label}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder={contactPage.form.fields.phone.placeholder}
                  />
                </div>

                {/* Level */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {contactPage.form.fields.level.label}
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  >
                    <option value="">{contactPage.form.fields.level.placeholder}</option>
                    {contactPage.form.fields.level.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {contactPage.form.fields.message.label}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder={contactPage.form.fields.message.placeholder}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white font-bold py-4 rounded-lg hover:from-blue-700 hover:to-red-700 transition transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>{contactPage.form.submitButton}</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">{data.footer.copyright.text}</p>
          <p className="text-gray-500 mt-2 text-sm">{data.footer.copyright.tagline}</p>
        </div>
      </footer>
    </div>
  );
}
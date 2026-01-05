"use client";

import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
import Header from '../components/header';
import data from '../../public/data/data.json';
import SendAMessage from "./send_a_message/page";


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
            

          </div>

          {/* Contact Form */}
          <SendAMessage />

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
"use client";

import React from "react";
import Header from "../../components/header";
import data from "../../../public/data/data.json";

export default function ContactHeaderPage() {
  const { contactPage } = data;

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Main Header */}
      <Header />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          {contactPage.hero.title}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {contactPage.hero.subtitle}
        </p>
      </section>
    </div>
  );
}

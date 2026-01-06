"use client";

import React, { useState } from "react";
import data from "../../public/data/data.json";
import SendAMessage from "./send_a_message/page";
import ContactOverviewPage from "./contact_information/page";
import ContactHeader from "./contact_header/page";
import Footer from "../components/footer";

export default function ContactPage() {
  const { contactPage } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      
      <ContactHeader />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">

          {/* LEFT */}
          <div className="space-y-6">
            <ContactOverviewPage />
          </div>

          {/* RIGHT */}
          <SendAMessage />
        </div>
      </main>

      <footer className="bg-gray-900 text-white mt-16 py-8">
        <Footer />
      </footer>
    </div>
  );
}

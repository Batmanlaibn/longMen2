"use client";

import React from "react";

import ContactInfoPage from "./contact_information_main/page";
import Information from "./information/page";

export default function ContactOverviewPage() {
  return (
    <div className="space-y-8">
      {/* Contact Information */}
      <ContactInfoPage />

      {/* HSK Levels / Information */}
      <Information />
    </div>
  );
}

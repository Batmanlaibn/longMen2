"use client";

import React from "react";
import data from "../../../../public/data/data.json";

import PhoneInfo from "./phone/page";
import EmailInfo from "./email/page";
import AddressInfo from "./address/page";
import WorkingHoursInfo from "./working_hours/page";

export default function ContactInfoPage() {
  const { contactPage } = data;

  return (
    <div className="space-y-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{contactPage.contactInfo.title}</h3>
            
        </div>
        <PhoneInfo
            label={contactPage.contactInfo.phone.label}
            numbers={contactPage.contactInfo.phone.numbers}
        />

        <EmailInfo
            label={contactPage.contactInfo.email.label}
            addresses={contactPage.contactInfo.email.addresses}
        />

        <AddressInfo
            label={contactPage.contactInfo.address.label}
            lines={contactPage.contactInfo.address.lines}
        />

        <WorkingHoursInfo
            label={contactPage.contactInfo.workingHours.label}
            schedule={contactPage.contactInfo.workingHours.schedule}
        />
    </div>
  );
}

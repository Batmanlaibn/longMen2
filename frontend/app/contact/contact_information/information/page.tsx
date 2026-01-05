"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import data from "../../../../public/data/data.json";

export default function Information() {
  const { contactPage } = data;

  return (
    <div className="bg-gradient-to-br from-blue-600 to-red-600 rounded-2xl shadow-lg p-8 text-white">
      <h3 className="text-2xl font-bold mb-4">
        {contactPage.hskLevelsOffered.title}
      </h3>

      <div className="space-y-3">
        {contactPage.hskLevelsOffered.levels.map((level) => (
          <div key={level.code} className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5" />
            <span>
              {level.name} ({level.words})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
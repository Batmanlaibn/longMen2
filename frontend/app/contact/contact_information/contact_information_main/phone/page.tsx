"use client";

import React from "react";
import { Phone } from "lucide-react";

interface PhoneInfoProps {
  label: string;
  numbers: string[];
}

const PhoneInfo: React.FC<PhoneInfoProps> = ({ label, numbers }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="bg-blue-100 p-3 rounded-lg">
        <Phone className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <p className="font-semibold text-gray-900">{label}</p>
        {numbers.map((number, idx) => (
          <p key={idx} className="text-gray-600">
            {number}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PhoneInfo;

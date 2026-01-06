"use client";

import React from "react";
import { Mail } from "lucide-react";

interface EmailInfoProps {
  label: string;
  addresses: string[];
}

const EmailInfo: React.FC<EmailInfoProps> = ({ label, addresses }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="bg-red-100 p-3 rounded-lg">
        <Mail className="w-6 h-6 text-red-600" />
      </div>
      <div>
        <p className="font-semibold text-gray-900">{label}</p>
        {addresses.map((email, idx) => (
          <p key={idx} className="text-gray-600">
            {email}
          </p>
        ))}
      </div>
    </div>
  );
};

export default EmailInfo;

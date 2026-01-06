"use client";

import React from "react";
import { MapPin } from "lucide-react";

interface AddressInfoProps {
  label: string;
  lines: string[];
}

const AddressInfo: React.FC<AddressInfoProps> = ({ label, lines }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="bg-green-100 p-3 rounded-lg">
        <MapPin className="w-6 h-6 text-green-600" />
      </div>
      <div>
        <p className="font-semibold text-gray-900">{label}</p>
        {lines.map((line, idx) => (
          <p key={idx} className="text-gray-600">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AddressInfo;

"use client";

import React from "react";
import { Clock } from "lucide-react";

interface WorkingHoursInfoProps {
  label: string;
  schedule: string[];
}

const WorkingHoursInfo: React.FC<WorkingHoursInfoProps> = ({ label, schedule }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="bg-yellow-100 p-3 rounded-lg">
        <Clock className="w-6 h-6 text-yellow-600" />
      </div>
      <div>
        <p className="font-semibold text-gray-900">{label}</p>
        {schedule.map((time, idx) => (
          <p key={idx} className="text-gray-600">
            {time}
          </p>
        ))}
      </div>
    </div>
  );
};

export default WorkingHoursInfo;

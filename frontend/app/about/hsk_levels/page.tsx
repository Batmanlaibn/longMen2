// components/about/HSKLevelsSection.tsx
import React from "react";

export interface HSKLevelItem {
  level: number | string;
  words: string;
  description: string;
  color: string;
  textColor: string;
}

interface HSKLevelsSectionProps {
  hskLevels: HSKLevelItem[];
}

const HSKLevelsSection: React.FC<HSKLevelsSectionProps> = ({ hskLevels }) => {
  return (
    <section className="bg-white rounded-lg shadow-md p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        HSK Түвшингүүд
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hskLevels.map((item) => (
          <div
            key={item.level}
            className={`${item.color} border-2 rounded-lg p-6 hover:shadow-lg transition-shadow`}
          >
            <h3 className={`text-xl font-bold ${item.textColor} mb-2`}>
              HSK {item.level}
            </h3>
            <p className="text-gray-700">
              <span className="font-semibold">{item.words}</span> үг
            </p>
            <p className="text-sm text-gray-600 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HSKLevelsSection;

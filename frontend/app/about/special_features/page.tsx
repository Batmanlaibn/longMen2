import React from "react";

interface Feature {
  number: number | string;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features: Feature[];
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features }) => {
  return (
    <section className="bg-white rounded-lg shadow-md p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Онцлог шинж чанарууд
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <div key={feature.number} className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
              {feature.number}
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;

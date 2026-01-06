import React from "react";

interface IntroductionSectionProps {
  title: string;
  paragraphs: string[];
}

const IntroductionSection: React.FC<IntroductionSectionProps> = ({
  title,
  paragraphs,
}) => {
  return (
    <section className="bg-white rounded-lg shadow-md p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {title}
      </h2>

      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="text-gray-700 leading-relaxed mb-4"
        >
          {paragraph}
        </p>
      ))}
    </section>
  );
};

export default IntroductionSection;

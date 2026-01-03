import React from 'react';
import Header from '../components/header';
import data from '../../public/data/data.json';

const AboutPage: React.FC = () => {
  const { about } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction Section */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {about.introduction.title}
          </h2>
          {about.introduction.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </section>

        {/* HSK Levels Section */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">HSK Түвшингүүд</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {about.hskLevels.map((item) => (
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

        {/* Features Section */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Онцлог шинж чанарууд
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {about.features.map((feature) => (
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

        {/* Contact Section */}
        <section className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">{about.contact.title}</h2>
          <p className="mb-4">{about.contact.description}</p>
          <div className="space-y-2">
            <p>📧 Email: {about.contact.email}</p>
            <p>📱 Утас: {about.contact.phone}</p>
            <p>🌐 Facebook: {about.contact.facebook}</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p>&copy; 2024 HSK Үг Сурах. Бүх эрх хуулиар хамгаалагдсан.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
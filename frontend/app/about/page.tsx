import React from 'react';
import Header from '../components/header';
import data from '../../public/data/data.json';
import Footer from '../components/footer';

import IntroductionSection from './about_us/page';
import HSKLevelsSection from './hsk_levels/page';
import FeaturesSection from './special_features/page';
import ContactSection from './contact/page';
import TeachersSection from './teachers/page'; 

const AboutPage: React.FC = () => {
  const { about, teachers } = data; 

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <IntroductionSection
          title={about.introduction.title}
          paragraphs={about.introduction.paragraphs}
        />

        <HSKLevelsSection hskLevels={about.hskLevels} />

        <FeaturesSection features={about.features} />

        <TeachersSection teachers={teachers} />

        <ContactSection contact={about.contact} />
      </main>

      <footer className="bg-gray-800 text-white mt-12">
        <Footer />
      </footer>
    </div>
  );
};

export default AboutPage;

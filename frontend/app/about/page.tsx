import React from 'react';
import Header from '../components/header';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction Section */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Бидний тухай</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            HSK Үг Сурах платформ нь хятад хэл сурагчдад зориулсан цогц сургалтын систем юм. 
            Бид HSK 1-ээс 6 хүртэлх бүх түвшний үгсийг судлах, дасгал хийх боломжийг олгодог.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Манай зорилго бол хятад хэл сурахыг илүү хялбар, хүртээмжтэй, үр дүнтэй болгох явдал юм.
          </p>
        </section>

        {/* HSK Levels Section */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">HSK Түвшингүүд</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { level: 1, words: 150, color: 'bg-green-100 border-green-300', textColor: 'text-green-700' },
              { level: 2, words: 300, color: 'bg-blue-100 border-blue-300', textColor: 'text-blue-700' },
              { level: 3, words: 600, color: 'bg-purple-100 border-purple-300', textColor: 'text-purple-700' },
              { level: 4, words: 1200, color: 'bg-orange-100 border-orange-300', textColor: 'text-orange-700' },
              { level: 5, words: 2500, color: 'bg-red-100 border-red-300', textColor: 'text-red-700' },
              { level: 6, words: 5000, color: 'bg-indigo-100 border-indigo-300', textColor: 'text-indigo-700' },
            ].map((item) => (
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
                <p className="text-sm text-gray-600 mt-2">
                  {item.level === 1 && 'Эхлэгч түвшин'}
                  {item.level === 2 && 'Анхан шатны түвшин'}
                  {item.level === 3 && 'Дунд түвшин'}
                  {item.level === 4 && 'Дунд дээд түвшин'}
                  {item.level === 5 && 'Ахисан түвшин'}
                  {item.level === 6 && 'Мэргэшсэн түвшин'}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Онцлог шинж чанарууд</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Интерактив сургалт</h3>
                <p className="text-gray-600">Flashcard, дасгал, тоглоом ашиглан үг сурах</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Дуу хоолойн дэмжлэг</h3>
                <p className="text-gray-600">Бүх үгийн зөв дуудлагыг сонсох боломжтой</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Явцын хяналт</h3>
                <p className="text-gray-600">Өөрийн ахиц дэвшлийг хянах, статистик үзэх</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                4
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Шалгалтын бэлтгэл</h3>
                <p className="text-gray-600">HSK шалгалтад бэлтгэх төрөл бүрийн дасгал</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Холбоо барих</h2>
          <p className="mb-4">
            Асуулт, санал хүсэлт байвал бидэнтэй холбогдоорой!
          </p>
          <div className="space-y-2">
            <p>📧 Email: info@hsklearn.mn</p>
            <p>📱 Утас: +976 xxxx-xxxx</p>
            <p>🌐 Facebook: @HSKLearnMongolia</p>
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
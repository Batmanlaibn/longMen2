export default function Footer (){
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        
        {/* About */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">
            汉语学院
          </h2>
          <p className="text-sm">
            Хятад хэл сурах хамгийн хялбар, орчин үеийн онлайн сургалтын платформ.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Холбоосууд
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Хичээлүүд</li>
            <li className="hover:text-white cursor-pointer">HSK бэлтгэл</li>
            <li className="hover:text-white cursor-pointer">Багш нар</li>
            <li className="hover:text-white cursor-pointer">Тусламж</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Холбоо барих
          </h3>
          <p className="text-sm">📧 info@chinese.edu</p>
          <p className="text-sm">📞 +976 9999 9999</p>
          <p className="text-sm">📍 Улаанбаатар, Монгол</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} 汉语学院. Бүх эрх хуулиар хамгаалагдсан.
      </div>
    </footer>
  );
}

import data from "../../data/data.json";

const footerData = data[0]; // ⬅ footer info

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* About */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">
            {footerData.brand.name}
          </h2>
          <p className="text-sm">
            {footerData.brand.description}
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            {footerData.links.title}
          </h3>
          <ul className="space-y-2 text-sm">
            {footerData.links.items.map((item: string, index: number) => (
              <li
                key={index}
                className="hover:text-white cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            {footerData.contact.title}
          </h3>
          <p className="text-sm">📧 {footerData.contact.email}</p>
          <p className="text-sm">📞 {footerData.contact.phone}</p>
          <p className="text-sm">📍 {footerData.contact.address}</p>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} {footerData.brand.name}. Бүх эрх хуулиар хамгаалагдсан.
      </div>
    </footer>
  );
}

// [
//     {
//     "brand": {
//       "name": "汉语学院",
//       "description": "Хятад хэл сурах хамгийн хялбар, орчин үеийн онлайн сургалтын платформ."
//     },
//     "links": {
//       "title": "Холбоосууд",
//       "items": [
//         "Хичээлүүд",
//         "HSK бэлтгэл",
//         "Багш нар",
//         "Тусламж"
//       ]
//     },
//     "contact": {
//       "title": "Холбоо барих",
//       "email": "info@chinese.edu",
//       "phone": "+976 9999 9999",
//       "address": "Улаанбаатар, Монгол"
//     }
//   },
// ]
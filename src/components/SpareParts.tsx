import Link from "next/link";

const brands = [
  "Toyota",
  "Honda",
  "Cworks",
  "Wurth",
  "Berner",
  "Mak",
  "Motul",
  "Suzuki"
];

export default function SpareParts() {
  return (
    <section id="spareparts" className="py-16 bg-white">
      <div className="max-w-[1100px] mx-auto px-4 text-center">
        <h3 className="text-3xl font-bold mb-4 text-gray-900">Spare Parts</h3>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          We supply high-quality genuine and OEM spare parts for leading vehicle manufacturers.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-12">
          {brands.map((brand, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-6 flex items-center justify-center border border-gray-100 shadow-sm hover:shadow-md transition-all hover:bg-gray-100">
              <span className="font-bold text-lg text-gray-700">{brand}</span>
            </div>
          ))}
        </div>

        <Link 
          href="/spare-parts" 
          className="inline-block px-8 py-3 bg-accent text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1"
        >
          View All Spare Parts
        </Link>
      </div>
    </section>
  );
}

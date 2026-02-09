import Image from "next/image";
import Link from "next/link";

const brands = [
  { name: "Toyota", logo: "https://res.cloudinary.com/dklcexfun/image/upload/v1770631946/toyota_amcrvz.png" },
  { name: "Honda", logo: "https://res.cloudinary.com/dklcexfun/image/upload/v1770631945/honda_aasage.png" },
  { name: "Cworks", logo: "https://res.cloudinary.com/dklcexfun/image/upload/v1770631946/cworks_zf3s3a.png" },
  { name: "Wurth", logo: "https://res.cloudinary.com/dklcexfun/image/upload/v1770631945/wurth_drxfud.png" },
  { name: "Berner", logo: "https://res.cloudinary.com/dklcexfun/image/upload/v1770631944/berner_j9qwwl.png" },
  { name: "Mak", logo: "https://res.cloudinary.com/dklcexfun/image/upload/v1770631945/mak_gbvjnw.png" },
  { name: "Motul", logo: "https://res.cloudinary.com/dklcexfun/image/upload/v1770631945/motul_hkxsj3.png" },
  { name: "Suzuki", logo: "https://res.cloudinary.com/dklcexfun/image/upload/v1770631946/susuki_iiktfw.png" }
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
            <div key={idx} className="bg-gray-50 rounded-lg p-6 flex items-center justify-center border border-gray-100 shadow-sm hover:shadow-md transition-all hover:bg-gray-100 h-24">
              <div className="relative w-full h-full">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  fill
                  className="object-contain filter transition-all duration-300"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>
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

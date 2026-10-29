import Image from "next/image";
import Link from "next/link";

import { brands } from "@/data/brands";
import { partCategories } from "@/data/partCategories";

const askForPartUrl = `https://wa.me/94716188187?text=${encodeURIComponent(
  "Hi NSS Auto Engineers, do you have this part?\nVehicle: \nPart: "
)}`;

export default function SpareParts() {
  return (
    <section id="spareparts" className="py-16 bg-white">
      <div className="max-w-[1100px] mx-auto px-4 text-center">
        <h3 className="text-3xl font-bold mb-4 text-gray-900">Spare Parts Shop</h3>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Visit our shop or message us. We stock genuine and OEM spare parts for leading vehicle manufacturers.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 text-left">
          {partCategories.map(({ name, icon: Icon, examples }) => (
            <div key={name} className="bg-gray-50 p-5 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center mb-3">
                <Icon className="text-accent" size={22} />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">{name}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{examples}</p>
            </div>
          ))}
        </div>

        <h4 className="text-lg font-bold text-gray-900 mb-6">Brands We Stock</h4>
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

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/spare-parts"
            className="inline-block px-8 py-3 bg-accent text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1"
          >
            View All Spare Parts
          </Link>
          <a
            href={askForPartUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#25d366] text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt=""
              width={20}
              height={20}
            />
            Ask for a Part
          </a>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { brands } from "@/data/brands";
import { contact } from "@/data/contact";
import { partCategories } from "@/data/partCategories";

const askForPartUrl = `${contact.whatsappUrl}?text=${encodeURIComponent(
  "Hi NSS Auto Engineers, do you have this part?\nVehicle: \nPart: "
)}`;

export default function SpareParts() {
  return (
    <section id="spareparts" className="py-16 bg-gray-50">
      <div className="max-w-[1100px] mx-auto px-4">
        <SectionHeading
          eyebrow="Spare Parts Shop"
          title="Genuine & OEM Parts in Stock"
          subtitle="Visit our shop or message us. We stock quality spare parts for leading vehicle manufacturers."
          align="center"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-14">
          {partCategories.map(({ name, icon: Icon, examples }, idx) => (
            <Reveal key={name} delay={idx * 80} className="h-full">
              <div className="group h-full bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent transition-colors duration-300">
                  <Icon className="text-accent group-hover:text-white transition-colors duration-300" size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{examples}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 className="text-center text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">Brands We Stock</h3>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {brands.map((brand, idx) => (
            <Reveal key={brand.name} delay={(idx % 4) * 60}>
              <div className="group bg-white rounded-xl p-5 flex items-center justify-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-24">
                <div className="relative w-full h-full">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/spare-parts"
            className="inline-flex items-center justify-center px-8 py-3 bg-accent text-white rounded-full text-lg font-semibold shadow-lg hover:bg-accent-dark hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            View All Spare Parts
          </Link>
          <a
            href={askForPartUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#25d366] text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt=""
              width={20}
              height={20}
            />
            Ask for a Part
          </a>
        </Reveal>
      </div>
    </section>
  );
}

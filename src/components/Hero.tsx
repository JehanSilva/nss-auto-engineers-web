import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="pt-24 pb-12 bg-gradient-to-r from-white/60 to-white/90">
      {/* Banner Image */}
      <div className="w-full mb-6">
        <Image
          src="https://res.cloudinary.com/dklcexfun/image/upload/v1770638248/sponser-banner-2_jckbpp.png"
          alt="NSS Banner"
          width={1200}
          height={400}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      <div className="max-w-[1100px] mx-auto px-4 grid md:grid-cols-[1fr_380px] gap-8 items-center">
        <div className="hero-content">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Expert Auto Repair & Maintenance
          </h2>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            Your trusted partner for all automotive repair needs. Professional <br className="hidden md:block" />
            service you can rely on.
          </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center bg-[#D32F2F] text-white px-8 py-3.5 rounded-full font-semibold shadow-lg hover:bg-[#B71C1C] hover:shadow-xl hover:scale-105 transition-all duration-300 group"
          >
            <span>Book Service Now</span>
            <svg
              className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <Link
            href="/spare-parts"
            className="inline-flex items-center justify-center bg-white border-2 border-[#D32F2F] text-[#D32F2F] px-8 py-3.5 rounded-full font-semibold shadow-md hover:bg-[#D32F2F] hover:text-white hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Browse Spare Parts
          </Link>
        </div>
      </div>
    </div>
    </section>
  );
}
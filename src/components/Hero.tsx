import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="pt-24 pb-10 bg-white">
      {/* Banner Image */}
      <div className="w-full mb-6">
        <Image
          src="https://res.cloudinary.com/dklcexfun/image/upload/v1770638248/sponser-banner-2_jckbpp.png"
          alt="NSS Auto Engineers banner"
          width={1200}
          height={400}
          className="w-full h-auto object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <div className="max-w-[1100px] mx-auto px-4 lg:flex lg:items-center lg:justify-between lg:gap-10">
        <div>
          <p className="animate-fade-up text-accent text-xs font-bold uppercase tracking-[0.2em] mb-3">
            Ja-Ela · Since 1995
          </p>
          <h1 className="animate-fade-up text-3xl md:text-4xl font-bold mb-3 text-gray-900 leading-tight [animation-delay:100ms]">
            Auto Repair Workshop & Spare Parts Shop in Ja-Ela
          </h1>
          <p className="animate-fade-up text-gray-600 mb-6 lg:mb-0 text-lg leading-relaxed max-w-2xl [animation-delay:200ms]">
            Expert car repairs, engine tune-ups and hybrid servicing, plus a parts shop stocked with genuine and OEM spare parts for Toyota, Honda, Suzuki and more.
          </p>
        </div>

        <div className="animate-fade-up flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0 [animation-delay:300ms]">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-3.5 rounded-full font-semibold shadow-lg hover:bg-accent-dark hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
            >
              Book Service Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/spare-parts"
              className="inline-flex items-center justify-center bg-white border-2 border-accent text-accent px-8 py-3.5 rounded-full font-semibold shadow-md hover:bg-accent hover:text-white hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Browse Spare Parts
            </Link>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const services = [
  { title: "Engine Services", img: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638241/engine-repair_sktvj2.png", desc: "Expert engine tune ups, complete overhauling, and automobile car repair diagnostics." },
  { title: "Hybrid & General", img: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638258/hybrid_i2nmsc.png", desc: "Specialized auto repair in Ja-Ela for Hybrid, Gasoline, and Diesel vehicles." },
  { title: "Scanning", img: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638255/scanning_lfuoln.png", desc: "Advanced computer diagnostics and ECU programming." },
  { title: "Suspension", img: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638242/suspension_j7cdmq.png", desc: "Shock absorbers, control arms, and full suspension restoration." },
  { title: "Radiator", img: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638243/radiator_betlye.png", desc: "Radiator repair, flushing, and cooling system maintenance." },
  { title: "Welding", img: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638248/welding_jbdntj.png", desc: "Professional arc and gas welding for chassis and exhaust." },
  { title: "Hydraulic", img: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638243/pressing_o2za9w.png", desc: "Bushing replacement and heavy-duty pressing works." },
  { title: "Spare Parts", img: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638279/parts-sales_ybhbhh.png", desc: "Retail sales of genuine and OEM spare parts." },
];

export default function Services() {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-[1100px] mx-auto px-4">
        <SectionHeading
          eyebrow="Our Services"
          title="Complete Care for Your Vehicle"
          subtitle="From routine servicing to engine overhauls, our mechanics handle hybrid, petrol and diesel vehicles."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, idx) => (
            <Reveal key={service.title} delay={(idx % 4) * 80} className="h-full">
              <div className="group h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="h-32 md:h-40 w-full relative overflow-hidden bg-gray-100">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base md:text-lg font-bold mb-1.5 text-gray-900 group-hover:text-accent transition-colors">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

const services = [
  { title: "Engine Services", img: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638241/engine-repair_sktvj2.png", desc: "Complete overhauling, tune-ups, and diagnostics." },
  { title: "Hybrid & General", img: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638258/hybrid_i2nmsc.png", desc: "Specialized repair for Hybrid, Gasoline, and Diesel vehicles." },
  { title: "Scanning", img: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638255/scanning_lfuoln.png", desc: "Advanced computer diagnostics and ECU programming." },
  { title: "Suspension", img: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638242/suspension_j7cdmq.png", desc: "Shock absorbers, control arms, and full suspension restoration." },
  { title: "Radiator", img: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638243/radiator_betlye.png", desc: "Radiator repair, flushing, and cooling system maintenance." },
  { title: "Welding", img: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638248/welding_jbdntj.png", desc: "Professional arc and gas welding for chassis and exhaust." },
  { title: "Hydraulic", img: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638243/pressing_o2za9w.png", desc: "Bushing replacement and heavy-duty pressing works." },
  { title: "Spare Parts", img: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638279/parts-sales_ybhbhh.png", desc: "Retail sales of genuine and OEM spare parts." },
];

export default function Services() {
  return (
    <section id="services" className="py-12 bg-white">
      <div className="max-w-[1100px] mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-gray-900">Our Services</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-40 w-full relative mb-4 rounded-md overflow-hidden bg-gray-100">
                <Image
                  src={`${service.img}`}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
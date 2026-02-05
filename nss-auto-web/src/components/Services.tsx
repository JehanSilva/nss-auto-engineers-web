import Image from "next/image";

const services = [
  { title: "Engine Services", img: "engine-repair.png", desc: "Complete overhauling, tune-ups, and diagnostics." },
  { title: "Hybrid & General", img: "hybrid.png", desc: "Specialized repair for Hybrid, Gasoline, and Diesel vehicles." },
  { title: "Scanning", img: "scanning.png", desc: "Advanced computer diagnostics and ECU programming." },
  { title: "Suspension", img: "suspension.png", desc: "Shock absorbers, control arms, and full suspension restoration." },
  { title: "Radiator", img: "radiator.png", desc: "Radiator repair, flushing, and cooling system maintenance." },
  { title: "Welding", img: "welding.png", desc: "Professional arc and gas welding for chassis and exhaust." },
  { title: "Hydraulic", img: "pressing.png", desc: "Bushing replacement and heavy-duty pressing works." },
  { title: "Spare Parts", img: "parts-sales.png", desc: "Retail sales of genuine and OEM spare parts." },
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
                  src={`/assets/${service.img}`}
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
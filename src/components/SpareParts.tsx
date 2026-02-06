import Image from "next/image";

const parts = [
  {
    title: "Brake Pads (Set)",
    img: "cworks-break-pads.png",
    desc: "Premium quality brake pads with excellent stopping power and durability.",
    specs: ["Fitment: Most car models", "Material: Semi-metallic", "Warranty: 12 months"]
  },
  {
    title: "Oil Filter",
    img: "cworks-oilfilter.png",
    desc: "High-efficiency oil filters that protect your engine by removing contaminants.",
    specs: ["Fitment: Most car models", "Type: Spin-on cartridge", "Lifespan: 10,000 km"]
  },
  {
    title: "Wiper Blades",
    img: "cworks-wiperblades.png",
    desc: "Durable wiper blades for clear visibility in rain with low streaking.",
    specs: ["Sizes: 14\"–28\"", "Material: Silicone/Rubber", "Warranty: 6 months"]
  },
  {
    title: "Spark Plugs",
    img: "cworks-sparkplugs.png",
    desc: "High-performance spark plugs for improved fuel efficiency and combustion.",
    specs: ["Fitment: Petrol engines", "Type: Iridium/Copper", "Lifespan: 50,000 km"]
  },
  {
    title: "Air Filter",
    img: "cworks-airfilter.png",
    desc: "Premium air filters that improve engine performance by ensuring clean air intake.",
    specs: ["Fitment: Most car models", "Type: Panel/Pleated", "Lifespan: 15,000 km"]
  }
];

export default function SpareParts() {
  return (
    <section id="spareparts" className="py-12 bg-white">
      <div className="max-w-[1100px] mx-auto px-4">
        <h3 className="text-2xl font-bold mb-2 text-gray-900">Spare Parts</h3>
        <p className="text-gray-600 mb-8">
          Common spare parts we stock. Contact us for specific brand availability.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {parts.map((part, idx) => (
            <div key={idx} className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
              <div className="relative h-48 w-full bg-gray-50">
                <Image
                  src={`/assets/${part.img}`}
                  alt={part.title}
                  fill
                  className="object-contain p-4"
                />
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <h4 className="font-bold text-lg mb-2 text-gray-800">{part.title}</h4>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{part.desc}</p>
                
                <div className="space-y-1 mb-6 flex-grow">
                  {part.specs.map((spec, i) => (
                    <p key={i} className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded w-fit">
                      {spec}
                    </p>
                  ))}
                </div>

                <a 
                  href="#contact" 
                  className="block w-full text-center py-2 border border-accent text-accent rounded hover:bg-accent hover:text-white transition-colors text-sm font-semibold"
                >
                  Request Quote
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
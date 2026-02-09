import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

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

export default function SparePartsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Spare Parts</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We stock a wide range of high-quality spare parts for various vehicle makes and models. 
              Contact us for specific brand availability and pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {parts.map((part, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group">
                <div className="relative h-56 w-full bg-gray-50 p-6 group-hover:bg-gray-100 transition-colors">
                  <Image
                    src={`/assets/${part.img}`}
                    alt={part.title}
                    fill
                    className="object-contain"
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="font-bold text-xl mb-3 text-gray-800">{part.title}</h4>
                  <p className="text-gray-600 bg-white mb-4 line-clamp-3">{part.desc}</p>
                  
                  <div className="space-y-2 mb-6 flex-grow">
                    {part.specs.map((spec, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-500">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                        {spec}
                      </div>
                    ))}
                  </div>

                  <a 
                    href="/#contact" 
                    className="block w-full text-center py-3 border border-accent text-accent rounded-lg hover:bg-accent hover:text-white transition-colors font-semibold"
                  >
                    Request Quote
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

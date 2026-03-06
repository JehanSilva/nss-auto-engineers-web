import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SparePartsSearch from "@/components/SparePartsSearch";
import SparePartCard from "@/components/SparePartCard";
import SparePartsList from "@/components/SparePartsList";
import { fetchSpareParts } from "@/services/spareParts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Genuine Auto Spare Parts Ja-Ela | NSS Auto Engineers",
  description: "Find high-quality genuine and OEM spare parts for Toyota, Honda, Suzuki, and more. Browse our catalog of auto parts in Ja-Ela, Sri Lanka. Best car repair shop in Ja-Ela.",
  keywords: [
    "Spare Parts Ja-Ela", 
    "Auto Parts Ja-Ela", 
    "Genuine Spare Parts Sri Lanka", 
    "Car Parts in Ja-Ela", 
    "NSS Auto Engineers", 
    "Car Repair Shop in Ja-Ela",
    "Spare parts shop near me",
    "Auto parts store in Ja-ela",
    "Best vehicle parts dealer",
    "Genuine spare parts",
    "High-quality aftermarket parts",
    "Reconditioned auto parts",
    "Auto parts delivery",
    "Same-day spare parts shipping",
    "Wholesale car parts",
    "Toyota Hiace KDH spare parts",
    "Maruti Suzuki Zen Estilo parts",
    "KDH body parts and engine components",
    "Cworks brake pads",
    "Cworks oil filters",
    "Denso spark plugs",
    "Genuine Toyota parts",
    "Replacement for squeaking brakes",
    "Where to buy KDH air filters",
    "Maruti Suzuki spare parts price list",
    "Best brand for Japanese car oil filters",
    "Auto parts wholesale Sri Lanka",
    "Bulk spare parts for fleet maintenance",
    "Distributor of Cworks parts",
    "Garage supply spare parts"
  ],
  openGraph: {
    title: "Genuine Auto Spare Parts Ja-Ela | NSS Auto Engineers",
    description: "Find high-quality genuine and OEM spare parts for Toyota, Honda, Suzuki, and more. Browse our catalog of auto parts in Ja-Ela, Sri Lanka.",
    url: 'https://www.nssauto.lk/spare-parts',
    siteName: 'NSS Auto Engineers Ja-Ela',
    locale: 'en_US',
    type: 'website',
  },
};

export default async function SparePartsPage({
  searchParams,
}: {
  searchParams: Promise<{ 
    search?: string; 
    brand?: string; 
    part_number?: string; 
    vehicle?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams?.search || "";
  const brand = resolvedSearchParams?.brand || "";
  const partNumber = resolvedSearchParams?.part_number || "";
  const vehicle = resolvedSearchParams?.vehicle || "";
  
  const allParts = await fetchSpareParts();

  // Frontend Filtering Logic
  const parts = allParts.filter(part => {
    // Brand Filter
    if (brand && brand !== 'all') {
      const brandLower = brand.toLowerCase();
      // Check if the part name contains the brand OR if it's compatible with that brand's vehicles
      const matchesBrandName = part.name.toLowerCase().includes(brandLower);
      const matchesVehicleMake = part.compatible_vehicles?.some(v => v.make.toLowerCase() === brandLower);
      
      if (!matchesBrandName && !matchesVehicleMake) return false;
    }

    // Vehicle Filter
    if (vehicle) {
      const vehicleLower = vehicle.toLowerCase();
      const matchesVehicle = part.compatible_vehicles?.some(v => 
        v.model.toLowerCase().includes(vehicleLower) || 
        `${v.make} ${v.model}`.toLowerCase().includes(vehicleLower)
      );
      if (!matchesVehicle) return false;
    }

    // Part Number Filter
    if (partNumber) {
       if (!part.part_number.toLowerCase().includes(partNumber.toLowerCase())) return false;
    }

    // General Search
    if (search) {
      const searchLower = search.toLowerCase();
      const matchesName = part.name.toLowerCase().includes(searchLower);
      const matchesPartNum = part.part_number.toLowerCase().includes(searchLower);
      const matchesVehicle = part.compatible_vehicles?.some(v => 
        `${v.make} ${v.model} ${v.year}`.toLowerCase().includes(searchLower)
      );
      
      if (!matchesName && !matchesPartNum && !matchesVehicle) return false;
    }

    return true;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Genuine Auto Spare Parts in Ja-Ela</h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              We stock a wide range of high-quality genuine and OEM spare parts for various vehicle makes and models in Ja-Ela. 
              Contact us for specific brand availability and pricing for your automobile car repair needs.
            </p>
            <SparePartsSearch />
          </div>

          <SparePartsList parts={parts} />
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

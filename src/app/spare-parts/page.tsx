import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SparePartsSearch from "@/components/SparePartsSearch";
import SparePartCard from "@/components/SparePartCard";
import { fetchSpareParts } from "@/services/spareParts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Genuine Auto Spare Parts | NSS Auto Engineers",
  description: "Find high-quality genuine and OEM spare parts for Toyota, Honda, Suzuki, and more. Browse our catalog of auto parts in Ja-Ela, Sri Lanka.",
  openGraph: {
    title: "Genuine Auto Spare Parts | NSS Auto Engineers",
    description: "Find high-quality genuine and OEM spare parts for Toyota, Honda, Suzuki, and more. Browse our catalog of auto parts in Ja-Ela, Sri Lanka.",
    url: 'https://www.nssauto.lk/spare-parts',
    siteName: 'NSS Auto Engineers',
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
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Spare Parts</h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              We stock a wide range of high-quality spare parts for various vehicle makes and models. 
              Contact us for specific brand availability and pricing.
            </p>
            <SparePartsSearch />
          </div>

          {parts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {parts.map((part) => (
                <SparePartCard key={part.id} part={part} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No spare parts found matching your criteria.</p>
              <a href="/spare-parts" className="text-accent hover:underline mt-2 inline-block">View all parts</a>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

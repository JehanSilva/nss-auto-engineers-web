import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SparePartsSearch from "@/components/SparePartsSearch";
import SparePartCard from "@/components/SparePartCard";
import { fetchSpareParts } from "@/services/spareParts";

export default async function SparePartsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams?.search || "";
  const parts = await fetchSpareParts(search);

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

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SparePartsSearch from "@/components/SparePartsSearch";
import SparePartsList from "@/components/SparePartsList";
import CategoryBrowser, { CategoryChips, type CategoryWithCount } from "@/components/CategoryBrowser";
import { fetchSpareParts, partsInCategory, type SparePart } from "@/services/spareParts";
import {
  brandCategories,
  findCatalogCategory,
  partCategories,
  type CatalogCategory,
} from "@/data/partCatalogCategories";
import type { Metadata } from "next";

type SearchParams = Promise<{
  q?: string;
  search?: string;
  brand?: string;
  part_number?: string;
  vehicle?: string;
  category?: string;
}>;

const baseMetadata: Metadata = {
  title: { absolute: "Genuine Auto Spare Parts Ja-Ela | NSS Auto Engineers" },
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
    "Best brand for Japanese car oil filters"
  ],
  // Search/filter URLs (?q=...) all point Google at the main catalog page
  alternates: { canonical: "/spare-parts" },
  openGraph: {
    title: "Genuine Auto Spare Parts Ja-Ela | NSS Auto Engineers",
    description: "Find high-quality genuine and OEM spare parts for Toyota, Honda, Suzuki, and more. Browse our catalog of auto parts in Ja-Ela, Sri Lanka.",
    url: 'https://www.nssauto.lk/spare-parts',
    siteName: 'NSS Auto Engineers Ja-Ela',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://res.cloudinary.com/dklcexfun/image/upload/v1770638248/sponser-banner-2_jckbpp.png', width: 1366, height: 342, alt: 'NSS Auto Engineers spare parts shop in Ja-Ela' }],
  },
};

function categoryTitle(category: CatalogCategory) {
  return category.vehicleMake ? `${category.name} Spare Parts` : category.name;
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const category = findCatalogCategory((await searchParams).category);
  if (!category) return baseMetadata;

  // Each category gets its own indexable page, e.g. "Brake Pads in Ja-Ela"
  const title = `${categoryTitle(category)} in Ja-Ela | NSS Auto Engineers`;
  const description = `Shop ${categoryTitle(category).toLowerCase()} at NSS Auto Engineers spare parts shop in Ja-Ela. Genuine and OEM parts in stock. Call or WhatsApp +94 71 618 8187 to check availability.`;
  const url = `/spare-parts?category=${category.slug}`;
  return {
    ...baseMetadata,
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { ...baseMetadata.openGraph, title, description, url },
  };
}

function withCounts(categories: CatalogCategory[], parts: SparePart[]): CategoryWithCount[] {
  return categories
    .map((category) => ({ category, count: partsInCategory(parts, category).length }))
    .filter(({ count }) => count > 0);
}

export default async function SparePartsPage({ searchParams }: { searchParams: SearchParams }) {
  const resolvedSearchParams = await searchParams;
  // Support both 'q' (new) and old parameters if they exist
  const q = resolvedSearchParams?.q || resolvedSearchParams?.search || "";
  const brand = resolvedSearchParams?.brand || "";
  const partNumber = resolvedSearchParams?.part_number || "";
  const vehicle = resolvedSearchParams?.vehicle || "";
  
  const category = findCatalogCategory(resolvedSearchParams?.category);

  const catalog = await fetchSpareParts();
  const partCounts = withCounts(partCategories, catalog);
  const brandCounts = withCounts(brandCategories, catalog);
  const allParts = category ? partsInCategory(catalog, category) : catalog;
  const isBrowsing = !category && !q && !brand && !partNumber && !vehicle;

  // Enhanced Frontend Filtering Logic
  const parts = allParts.filter(part => {
    // If we have the new single query parameter
    if (q) {
      const keywords = q.toLowerCase().split(/\s+/).filter(k => k.length > 0);
      
      // Every keyword must match at least one field
      return keywords.every(keyword => {
        const matchesName = part.name.toLowerCase().includes(keyword);
        const matchesPartNum = part.part_number.toLowerCase().includes(keyword);
        const matchesVehicle = part.compatible_vehicles?.some(v => 
          `${v.make} ${v.model} ${v.year}`.toLowerCase().includes(keyword)
        );
        
        return matchesName || matchesPartNum || matchesVehicle;
      });
    }

    // Fallback for legacy specific parameters if they are still in URL
    if (brand && brand !== 'all') {
      const brandLower = brand.toLowerCase();
      const matchesBrandName = part.name.toLowerCase().includes(brandLower);
      const matchesVehicleMake = part.compatible_vehicles?.some(v => v.make.toLowerCase() === brandLower);
      if (!matchesBrandName && !matchesVehicleMake) return false;
    }

    if (vehicle) {
      const vehicleLower = vehicle.toLowerCase();
      const matchesVehicle = part.compatible_vehicles?.some(v => 
        v.model.toLowerCase().includes(vehicleLower) || 
        `${v.make} ${v.model}`.toLowerCase().includes(vehicleLower)
      );
      if (!matchesVehicle) return false;
    }

    if (partNumber) {
       if (!part.part_number.toLowerCase().includes(partNumber.toLowerCase())) return false;
    }

    return true;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {category ? `${categoryTitle(category)} in Ja-Ela` : "Genuine Auto Spare Parts in Ja-Ela"}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              {category
                ? `${parts.length} ${parts.length === 1 ? "item" : "items"} ${q ? `matching "${q}" ` : ""}in ${category.name}. Visit our shop or message us to check availability.`
                : "We stock a wide range of high-quality genuine and OEM spare parts for various vehicle makes and models in Ja-Ela. Contact us for specific brand availability and pricing for your automobile car repair needs."}
            </p>
            <SparePartsSearch />
          </div>

          {category && <CategoryChips items={[...partCounts, ...brandCounts]} activeSlug={category.slug} />}

          {isBrowsing && (
            <>
              <CategoryBrowser partCategories={partCounts} brandCategories={brandCounts} />
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-5">All Parts</h2>
            </>
          )}

          <SparePartsList key={`${category?.slug ?? "all"}-${q}`} parts={parts} />
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

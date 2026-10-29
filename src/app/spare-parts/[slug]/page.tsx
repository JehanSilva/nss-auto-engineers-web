import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight, Phone, Car, MapPin } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SparePartCard from "@/components/SparePartCard";
import SparePartsSearch from "@/components/SparePartsSearch";
import { contact } from "@/data/contact";
import {
  fetchSpareParts,
  fetchSparePartBySlug,
  partSlug,
  relatedParts,
  type SparePart,
} from "@/services/spareParts";

type Props = { params: Promise<{ slug: string }> };

function vehicleNames(part: SparePart): string[] {
  return (part.compatible_vehicles ?? []).map((v) => `${v.make} ${v.model}${v.year ? ` ${v.year}` : ""}`);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const part = await fetchSparePartBySlug(slug);
  if (!part) return { title: "Spare Part Not Found", robots: { index: false } };

  const vehicles = vehicleNames(part);
  const fits = vehicles.length ? ` for ${vehicles.slice(0, 3).join(", ")}` : "";
  const title = `${part.name}${fits} | Spare Parts Ja-Ela`;
  const description = `Buy ${part.name} (Part # ${part.part_number})${fits} at NSS Auto Engineers, Ja-Ela. ${
    part.stock_quantity > 0 ? "In stock now." : "Contact us to check availability."
  } Genuine and OEM spare parts. Call or WhatsApp ${contact.phoneDisplay}.`;
  const url = `/spare-parts/${partSlug(part)}`;

  return {
    // Absolute so the root "%s | NSS Auto Engineers Ja-Ela" template doesn't double up
    title: { absolute: title.length > 70 ? `${part.name} | NSS Auto Engineers Ja-Ela` : title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${part.name} | NSS Auto Engineers`,
      description,
      url,
      siteName: "NSS Auto Engineers Ja-Ela",
      type: "website",
      images: part.image ? [{ url: part.image, alt: part.name }] : undefined,
    },
  };
}

export default async function SparePartPage({ params }: Props) {
  const { slug } = await params;
  const part = await fetchSparePartBySlug(slug);
  if (!part) notFound();

  // Part was renamed: send old links to the current URL
  const canonicalSlug = partSlug(part);
  if (slug !== canonicalSlug) permanentRedirect(`/spare-parts/${canonicalSlug}`);

  const related = relatedParts(part, await fetchSpareParts());
  const vehicles = vehicleNames(part);
  const outOfStock = part.stock_quantity < 1;

  const askUrl = `${contact.whatsappUrl}?text=${encodeURIComponent(
    `Hi NSS Auto Engineers, I'm interested in this part:\n${part.name} (Part #: ${part.part_number})\nIs it available?`
  )}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.nssauto.lk" },
      { "@type": "ListItem", position: 2, name: "Spare Parts", item: "https://www.nssauto.lk/spare-parts" },
      { "@type": "ListItem", position: 3, name: part.name, item: `https://www.nssauto.lk/spare-parts/${canonicalSlug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="pt-28 pb-16 bg-white">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="mb-8">
            <Suspense>
              <SparePartsSearch compact />
            </Suspense>
          </div>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-accent">Home</Link>
            <ChevronRight size={14} />
            <Link href="/spare-parts" className="hover:text-accent">Spare Parts</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium line-clamp-1">{part.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="animate-fade-up relative h-72 md:h-[420px] bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
              {part.image ? (
                <Image
                  src={part.image}
                  alt={part.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 550px"
                  className={`object-contain p-8 ${outOfStock ? "grayscale" : ""}`}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">No Image Available</div>
              )}
            </div>

            <div className="animate-fade-up [animation-delay:100ms]">
              <p className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-2">Spare Part</p>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{part.name}</h1>
              <p className="text-gray-500 mb-5">Part #: {part.part_number}</p>

              <span
                className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full mb-6 ${
                  outOfStock
                    ? "bg-red-50 text-red-600"
                    : part.stock_quantity === 1
                      ? "bg-amber-100 text-amber-800"
                      : "bg-green-100 text-green-700"
                }`}
              >
                {outOfStock ? "Out of stock" : part.stock_quantity === 1 ? "Only 1 left" : "In stock"}
              </span>

              <div className="mb-8">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                  <Car size={18} className="text-accent" />
                  Compatible Vehicles
                </h2>
                {vehicles.length > 0 ? (
                  <ul className="flex flex-wrap gap-2">
                    {vehicles.map((name) => (
                      <li key={name} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">{name}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">Universal fit options may vary. Ask us to confirm it fits your vehicle.</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <a
                  href={askUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25d366] text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
                >
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="" width={18} height={18} />
                  {outOfStock ? "Check Availability" : "Ask on WhatsApp"}
                </a>
                <a
                  href={contact.phoneTel}
                  className="inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-full font-semibold hover:bg-accent-dark transition-colors"
                >
                  <Phone size={18} />
                  Call {contact.phoneDisplay}
                </a>
              </div>

              <p className="flex gap-2 text-sm text-gray-600">
                <MapPin size={18} className="text-accent shrink-0" />
                Available at our parts shop: {contact.address}. {contact.hours}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16">
          <div className="max-w-[1100px] mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">More Parts for These Vehicles</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p) => (
                <SparePartCard key={p.id} part={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

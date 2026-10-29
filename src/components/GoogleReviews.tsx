"use client";
import { useEffect, useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";

const widgetId = process.env.NEXT_PUBLIC_TRUSTINDEX_WIDGET_ID;

export default function GoogleReviews() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = widgetRef.current;
    if (!widgetId || !container) return;

    // Trustindex renders the widget right where its loader script sits,
    // so the script has to be injected inside the container.
    const script = document.createElement("script");
    script.src = `https://cdn.trustindex.io/loader.js?${widgetId}`;
    script.defer = true;
    script.async = true;
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <section id="reviews" className="py-16 bg-gray-50">
      <div className="max-w-[1100px] mx-auto px-4">
        <SectionHeading
          eyebrow="Reviews"
          title="What Our Customers Say"
          subtitle="Real reviews from our customers on Google."
          align="center"
        />

        <div ref={widgetRef} className="min-h-[200px]" />

        <div className="mt-8 text-center">
          <a
            href="https://www.google.com/search?q=NSS+Auto+Engineers+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-2.5 border-2 border-accent text-accent font-semibold rounded-full hover:bg-accent hover:text-white transition-colors"
          >
            See all reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}

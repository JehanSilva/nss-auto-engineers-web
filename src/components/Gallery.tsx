"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const galleryImages = [
  { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638261/cars-in-lineup_t1hs1g.png", alt: "Customer vehicles lined up at the workshop" },
  { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638247/car-repairing_xhfaya.png", alt: "Mechanic repairing a car" },
  { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638261/team_u5qzou.png", alt: "The NSS Auto Engineers team" },
  { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638248/vantage-car_hravgs.png", alt: "Vehicle at the workshop" },
  { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638271/gallery-sample4_opkvzq.jpg", alt: "Workshop project" },
  { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638260/gallery-sample5_cvwzi5.jpg", alt: "Workshop project" },
];

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  const close = useCallback(() => setSelected(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setSelected((i) => (i === null ? i : (i + dir + galleryImages.length) % galleryImages.length)),
    []
  );

  useEffect(() => {
    if (selected === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, close, step]);

  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="max-w-[1100px] mx-auto px-4">
        <SectionHeading eyebrow="Gallery" title="Inside Our Workshop" subtitle="Photos from the workshop and recent projects." />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryImages.map((img, idx) => (
            <Reveal key={img.src} delay={(idx % 3) * 80}>
              <button
                type="button"
                className="relative block h-40 md:h-56 w-full overflow-hidden rounded-xl group"
                onClick={() => setSelected(idx)}
                aria-label={`Open photo: ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="animate-fade-in fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            onClick={close}
            aria-label="Close"
          >
            <X size={36} />
          </button>
          <button
            className="absolute left-2 md:left-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={32} />
          </button>
          <div className="relative w-full max-w-4xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              key={selected}
              src={galleryImages[selected].src}
              alt={galleryImages[selected].alt}
              fill
              sizes="100vw"
              className="animate-fade-in object-contain"
            />
          </div>
          <button
            className="absolute right-2 md:right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label="Next photo"
          >
            <ChevronRight size={32} />
          </button>
          <p className="absolute bottom-4 text-white/70 text-sm">
            {selected + 1} / {galleryImages.length}
          </p>
        </div>
      )}
    </section>
  );
}

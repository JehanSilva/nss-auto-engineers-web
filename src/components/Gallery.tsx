"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

const galleryImages = [
  "https://res.cloudinary.com/dklcexfun/image/upload/v1770638261/cars-in-lineup_t1hs1g.png",
  "https://res.cloudinary.com/dklcexfun/image/upload/v1770638247/car-repairing_xhfaya.png",
  "https://res.cloudinary.com/dklcexfun/image/upload/v1770638261/team_u5qzou.png",
  "https://res.cloudinary.com/dklcexfun/image/upload/v1770638248/vantage-car_hravgs.png",
  "https://res.cloudinary.com/dklcexfun/image/upload/v1770638271/gallery-sample4_opkvzq.jpg",
  "https://res.cloudinary.com/dklcexfun/image/upload/v1770638260/gallery-sample5_cvwzi5.jpg"
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? galleryImages.length - 1 : selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === galleryImages.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setSelectedIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <section ref={sectionRef} id="gallery" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      <div className="relative max-w-[1100px] mx-auto px-4">
        {/* Section Header */}
        <div className={`mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Camera size={20} className="text-primary" />
            </div>
            <span className="text-primary font-medium">Our Workshop</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Workshop <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Take a look inside our state-of-the-art facility and see our team in action
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, idx) => (
            <div 
              key={idx} 
              className={`relative group cursor-pointer overflow-hidden rounded-xl transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${idx === 0 ? "md:col-span-2 md:row-span-2 h-64 md:h-full" : "h-48"}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
              onClick={() => setSelectedIndex(idx)}
            >
              <Image
                src={img}
                alt={`Workshop gallery image ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Hover Content */}
              <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex items-center gap-2 text-foreground">
                  <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Camera size={14} className="text-primary-foreground" />
                  </span>
                  <span className="text-sm font-medium">View Image</span>
                </div>
              </div>
              
              {/* Border Effect */}
              <div className="absolute inset-0 border-2 border-primary rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Overlay */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 backdrop-blur-lg p-4 animate-fade-in"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            onClick={() => setSelectedIndex(null)}
          >
            <X size={24} />
          </button>

          {/* Navigation Buttons */}
          <button 
            className="absolute left-4 md:left-8 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all z-10"
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            className="absolute right-4 md:right-8 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all z-10"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
          >
            <ChevronRight size={24} />
          </button>

          {/* Image Container */}
          <div 
            className="relative w-full max-w-5xl h-[80vh] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[selectedIndex]}
              alt="Enlarged view"
              fill
              className="object-contain"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-card border border-border rounded-full text-sm text-foreground">
            {selectedIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  );
}

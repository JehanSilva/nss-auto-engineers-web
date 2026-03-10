"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%"
        }
      });

      // Gallery items with staggered 3D animation
      const items = gridRef.current?.children;
      if (items) {
        gsap.set(items, {
          opacity: 0,
          scale: 0.8,
          rotateY: -30,
          transformPerspective: 1000,
          transformOrigin: "center center"
        });

        gsap.to(items, {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: {
            amount: 0.5,
            grid: [2, 3],
            from: "start"
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%"
          }
        });

        // Hover effects for each item
        Array.from(items).forEach((item) => {
          const el = item as HTMLElement;
          const image = el.querySelector("img");
          
          el.addEventListener("mouseenter", () => {
            gsap.to(el, {
              scale: 1.02,
              zIndex: 10,
              duration: 0.3,
              ease: "power2.out"
            });
            if (image) {
              gsap.to(image, {
                scale: 1.15,
                duration: 0.5,
                ease: "power2.out"
              });
            }
          });
          
          el.addEventListener("mouseleave", () => {
            gsap.to(el, {
              scale: 1,
              zIndex: 1,
              duration: 0.3,
              ease: "power2.out"
            });
            if (image) {
              gsap.to(image, {
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
              });
            }
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Lightbox animation
  useEffect(() => {
    if (selectedIndex !== null && lightboxRef.current) {
      gsap.fromTo(lightboxRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      
      const imageContainer = lightboxRef.current.querySelector(".lightbox-image");
      if (imageContainer) {
        gsap.fromTo(imageContainer,
          { scale: 0.8, opacity: 0, rotateX: -10 },
          { scale: 1, opacity: 1, rotateX: 0, duration: 0.5, ease: "back.out(1.7)" }
        );
      }
    }
  }, [selectedIndex]);

  const handlePrev = () => {
    if (selectedIndex !== null) {
      const imageContainer = lightboxRef.current?.querySelector(".lightbox-image");
      if (imageContainer) {
        gsap.to(imageContainer, {
          x: 50,
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            setSelectedIndex(selectedIndex === 0 ? galleryImages.length - 1 : selectedIndex - 1);
            gsap.fromTo(imageContainer, 
              { x: -50, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.3 }
            );
          }
        });
      } else {
        setSelectedIndex(selectedIndex === 0 ? galleryImages.length - 1 : selectedIndex - 1);
      }
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      const imageContainer = lightboxRef.current?.querySelector(".lightbox-image");
      if (imageContainer) {
        gsap.to(imageContainer, {
          x: -50,
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            setSelectedIndex(selectedIndex === galleryImages.length - 1 ? 0 : selectedIndex + 1);
            gsap.fromTo(imageContainer, 
              { x: 50, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.3 }
            );
          }
        });
      } else {
        setSelectedIndex(selectedIndex === galleryImages.length - 1 ? 0 : selectedIndex + 1);
      }
    }
  };

  const closeLightbox = () => {
    if (lightboxRef.current) {
      const imageContainer = lightboxRef.current.querySelector(".lightbox-image");
      gsap.to(lightboxRef.current, { 
        opacity: 0, 
        duration: 0.3,
        onComplete: () => setSelectedIndex(null)
      });
      if (imageContainer) {
        gsap.to(imageContainer, { scale: 0.8, duration: 0.3 });
      }
    } else {
      setSelectedIndex(null);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <section ref={sectionRef} id="gallery" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />
      
      <div className="relative max-w-[1100px] mx-auto px-4">
        {/* Section Header */}
        <div ref={headerRef} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Camera size={20} className="text-primary" />
            </div>
            <span className="text-primary font-medium">Our Workshop</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
            Workshop <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg">
            Take a look inside our state-of-the-art facility and see our team in action
          </p>
        </div>

        {/* Gallery Grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-4" style={{ perspective: "1000px" }}>
          {galleryImages.map((img, idx) => (
            <div 
              key={idx} 
              className={`relative group cursor-pointer overflow-hidden rounded-xl ${
                idx === 0 ? "md:col-span-2 md:row-span-2 h-64 md:h-full" : "h-48"
              }`}
              style={{ transformStyle: "preserve-3d" }}
              onClick={() => setSelectedIndex(idx)}
            >
              <Image
                src={img}
                alt={`Workshop gallery image ${idx + 1}`}
                fill
                className="object-cover"
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
          ref={lightboxRef}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 backdrop-blur-lg p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all hover:scale-110"
            onClick={closeLightbox}
          >
            <X size={24} />
          </button>

          {/* Navigation Buttons */}
          <button 
            className="absolute left-4 md:left-8 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all z-10 hover:scale-110"
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            className="absolute right-4 md:right-8 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all z-10 hover:scale-110"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
          >
            <ChevronRight size={24} />
          </button>

          {/* Image Container */}
          <div 
            className="lightbox-image relative w-full max-w-5xl h-[80vh]"
            style={{ transformStyle: "preserve-3d" }}
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

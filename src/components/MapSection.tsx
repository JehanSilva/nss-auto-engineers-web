"use client";
import { useRef, useEffect } from "react";
import { MapPin, Navigation } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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

      // Map container animation
      gsap.from(mapRef.current, {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mapRef.current,
          start: "top 80%"
        }
      });

      // Floating card animation
      gsap.from(cardRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mapRef.current,
          start: "top 80%"
        }
      });

      // Card hover effect
      if (cardRef.current) {
        cardRef.current.addEventListener("mouseenter", () => {
          gsap.to(cardRef.current, {
            y: -5,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        cardRef.current.addEventListener("mouseleave", () => {
          gsap.to(cardRef.current, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="map" className="py-24 relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-4">
        {/* Section Header */}
        <div ref={headerRef} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <MapPin size={20} className="text-primary" />
            </div>
            <span className="text-primary font-medium">Location</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
            Find <span className="text-gradient">Us</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg">
            Visit our workshop on Negombo - Colombo Main Road, Ja-Ela
          </p>
        </div>

        {/* Map Container */}
        <div ref={mapRef} className="relative">
          {/* Map Frame */}
          <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
            {/* Map */}
            <div className="w-full h-[450px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d416.17393734958443!2d79.89015194780976!3d7.086985605361363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2f132136fca39%3A0xb7b2b649b46c9c6e!2sNSS%20Auto%20Engineers!5e0!3m2!1sen!2slk!4v1762264646917!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                className="grayscale-[30%]"
              />
            </div>
            
            {/* Floating Info Card */}
            <div 
              ref={cardRef}
              className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80 bg-card/95 backdrop-blur-lg border border-border rounded-xl p-5 shadow-xl cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">NSS Auto Engineers</h4>
                  <p className="text-sm text-muted-foreground mb-3">Negombo - Colombo Main Rd, Ja-Ela, Sri Lanka</p>
                  <a
                    href="https://goo.gl/maps/YourMapLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    <Navigation size={14} />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

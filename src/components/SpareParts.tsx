"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, ArrowRight } from "lucide-react";
import { brands } from "@/data/brands";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SpareParts() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%"
        }
      });

      // Brand cards animation
      const cards = gridRef.current?.children;
      if (cards) {
        gsap.set(cards, {
          opacity: 0,
          scale: 0.8,
          y: 40
        });

        gsap.to(cards, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: {
            amount: 0.8,
            grid: [2, 4],
            from: "center"
          },
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%"
          }
        });

        // Hover effects
        Array.from(cards).forEach((card) => {
          const el = card as HTMLElement;
          const image = el.querySelector("img");
          
          el.addEventListener("mouseenter", () => {
            gsap.to(el, {
              y: -8,
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out"
            });
            if (image) {
              gsap.to(image, {
                filter: "brightness(1.1)",
                duration: 0.3
              });
            }
          });
          
          el.addEventListener("mouseleave", () => {
            gsap.to(el, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
            if (image) {
              gsap.to(image, {
                filter: "brightness(0.75)",
                duration: 0.3
              });
            }
          });
        });
      }

      // CTA animation
      gsap.from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 90%"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="spareparts" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] -translate-y-1/2" />
      
      <div className="relative max-w-[1100px] mx-auto px-4">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <Package size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Genuine Parts</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Quality <span className="text-gradient">Spare Parts</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We supply high-quality genuine and OEM spare parts for leading vehicle manufacturers
          </p>
        </div>

        {/* Brands Grid */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
          {brands.map((brand, idx) => (
            <div 
              key={idx} 
              className="group bg-card border border-border rounded-xl p-6 flex items-center justify-center h-24 hover:border-primary/50 transition-colors duration-300 cursor-pointer"
            >
              <div className="relative w-full h-full">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  fill
                  className="object-contain filter brightness-75 transition-all duration-300"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center">
          <Link 
            href="/spare-parts" 
            className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300"
          >
            <span>View All Spare Parts</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { Cog, Zap, Monitor, Car, Thermometer, Flame, CircleDot, Package } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { 
    title: "Engine Services", 
    img: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638241/engine-repair_sktvj2.png", 
    desc: "Expert engine tune ups, complete overhauling, and automobile car repair diagnostics.",
    icon: Cog
  },
  { 
    title: "Hybrid & General", 
    img: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638258/hybrid_i2nmsc.png", 
    desc: "Specialized auto repair in Ja-Ela for Hybrid, Gasoline, and Diesel vehicles.",
    icon: Zap
  },
  { 
    title: "Scanning", 
    img: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638255/scanning_lfuoln.png", 
    desc: "Advanced computer diagnostics and ECU programming.",
    icon: Monitor
  },
  { 
    title: "Suspension", 
    img: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638242/suspension_j7cdmq.png", 
    desc: "Shock absorbers, control arms, and full suspension restoration.",
    icon: Car
  },
  { 
    title: "Radiator", 
    img: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638243/radiator_betlye.png", 
    desc: "Radiator repair, flushing, and cooling system maintenance.",
    icon: Thermometer
  },
  { 
    title: "Welding", 
    img: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638248/welding_jbdntj.png", 
    desc: "Professional arc and gas welding for chassis and exhaust.",
    icon: Flame
  },
  { 
    title: "Hydraulic", 
    img: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638243/pressing_o2za9w.png", 
    desc: "Bushing replacement and heavy-duty pressing works.",
    icon: CircleDot
  },
  { 
    title: "Spare Parts", 
    img: "https://res.cloudinary.com/dklcexfun/image/upload/v1770638279/parts-sales_ybhbhh.png", 
    desc: "Retail sales of genuine and OEM spare parts.",
    icon: Package
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      // Cards stagger animation with 3D effect
      const cards = gridRef.current?.children;
      if (cards) {
        gsap.set(cards, {
          opacity: 0,
          y: 100,
          rotateX: -15,
          transformPerspective: 1000
        });

        gsap.to(cards, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: {
            amount: 0.6,
            grid: [2, 4],
            from: "start"
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%"
          }
        });

        // Hover animations for each card
        Array.from(cards).forEach((card) => {
          const el = card as HTMLElement;
          const image = el.querySelector("img");
          const icon = el.querySelector(".icon-badge");
          
          el.addEventListener("mouseenter", () => {
            gsap.to(el, {
              y: -10,
              duration: 0.3,
              ease: "power2.out"
            });
            if (image) {
              gsap.to(image, {
                scale: 1.1,
                duration: 0.5,
                ease: "power2.out"
              });
            }
            if (icon) {
              gsap.to(icon, {
                scale: 1.2,
                rotation: 10,
                duration: 0.3,
                ease: "back.out(1.7)"
              });
            }
          });
          
          el.addEventListener("mouseleave", () => {
            gsap.to(el, {
              y: 0,
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
            if (icon) {
              gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out"
              });
            }
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-24 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-[100px]" />
      
      <div className="max-w-[1100px] mx-auto px-4">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4 border border-primary/20">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Comprehensive automotive solutions with cutting-edge technology and expert craftsmanship
          </p>
        </div>
        
        {/* Services Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div 
                key={idx} 
                className="group relative bg-card border border-border rounded-2xl overflow-hidden cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Image Container */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                  
                  {/* Icon Badge */}
                  <div className="icon-badge absolute top-4 right-4 w-10 h-10 bg-primary/90 rounded-lg flex items-center justify-center shadow-lg">
                    <Icon size={20} className="text-primary-foreground" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                
                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-primary rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

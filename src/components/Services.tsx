"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Cog, Zap, Monitor, Car, Thermometer, Flame, CircleDot, Package } from "lucide-react";

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
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section ref={sectionRef} id="services" className="py-20 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="max-w-[1100px] mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive automotive solutions with cutting-edge technology and expert craftsmanship
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div 
                key={idx} 
                className={`group relative bg-card border border-border rounded-2xl overflow-hidden hover-lift transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-primary/90 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Icon size={20} className="text-primary-foreground" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                
                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-primary rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { Wrench, Settings, Shield, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80 z-10" />
        
        {/* Banner Image */}
        <Image
          src="https://res.cloudinary.com/dklcexfun/image/upload/v1770638248/sponser-banner-2_jckbpp.png"
          alt="NSS Auto Workshop"
          fill
          className="object-cover opacity-30"
          priority
        />
        
        {/* Decorative Gear */}
        <div className="absolute -right-32 -top-32 w-96 h-96 opacity-5">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-gear-spin">
            <path
              fill="currentColor"
              d="M50 10 L55 25 L70 20 L65 35 L80 40 L65 45 L70 60 L55 55 L50 70 L45 55 L30 60 L35 45 L20 40 L35 35 L30 20 L45 25 Z"
            />
            <circle cx="50" cy="40" r="15" fill="var(--color-background)" />
          </svg>
        </div>
        
        {/* Red accent glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-[1100px] mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">Premier Auto Workshop in Ja-Ela</span>
            </div>

            {/* Main Heading */}
            <h1 className="animate-fade-in delay-100 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-foreground">Expert</span>
              <br />
              <span className="text-gradient">Auto Engineering</span>
              <br />
              <span className="text-foreground">Solutions</span>
            </h1>

            {/* Description */}
            <p className="animate-fade-in delay-200 text-lg text-muted-foreground max-w-lg leading-relaxed">
              Your trusted partner for comprehensive automobile repairs, precision engine tune-ups, 
              hybrid services, and professional maintenance with over 15 years of expertise.
            </p>

            {/* Stats */}
            <div className="animate-fade-in delay-300 flex flex-wrap gap-8">
              <div>
                <div className="text-3xl font-bold text-foreground">15+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">5000+</div>
                <div className="text-sm text-muted-foreground">Cars Serviced</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-4">
              <Link
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300"
              >
                <Wrench size={20} />
                <span>Book Service Now</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/spare-parts"
                className="group inline-flex items-center justify-center gap-2 bg-card border border-border text-foreground px-8 py-4 rounded-xl font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                <span>Browse Spare Parts</span>
              </Link>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { icon: Wrench, title: "Engine Repairs", desc: "Complete overhauls & diagnostics", delay: "delay-100" },
              { icon: Settings, title: "Hybrid Service", desc: "Battery & motor specialists", delay: "delay-200" },
              { icon: Shield, title: "Genuine Parts", desc: "OEM & aftermarket quality", delay: "delay-300" },
              { icon: Wrench, title: "Full Service", desc: "Maintenance & inspections", delay: "delay-400" },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`animate-fade-in ${item.delay} group p-6 bg-card/50 border border-border rounded-2xl hover:border-primary/50 hover:bg-card transition-all duration-300 hover-lift`}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Wrench, Settings, Shield, ArrowRight, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CountUp, MagneticButton } from "./GSAPProvider";

gsap.registerPlugin(ScrollTrigger);

const Scene3D = dynamic(() => import("./Scene3D"), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
});

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set([badgeRef.current, headingRef.current, descRef.current, statsRef.current, ctaRef.current], {
        opacity: 0,
        y: 50
      });

      // Main timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // Badge animation
      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      // Heading animation with split text effect
      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.5");

      // Description
      tl.to(descRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6");

      // Stats
      tl.to(statsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5");

      // CTA buttons
      tl.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5");

      // Feature cards stagger
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.set(cards, { opacity: 0, y: 80, rotateX: -15 });
        tl.to(cards, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out"
        }, "-=0.6");
      }

      // Parallax effect on scroll
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80 z-10" />
        
        {/* Banner Image */}
        <Image
          src="https://res.cloudinary.com/dklcexfun/image/upload/v1770638248/sponser-banner-2_jckbpp.png"
          alt="NSS Auto Workshop"
          fill
          className="object-cover opacity-20"
          priority
        />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />
      </div>

      {/* 3D Scene */}
      <div className="absolute inset-0 z-15 hidden lg:block">
        <Scene3D />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-20 max-w-[1100px] mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full backdrop-blur-sm">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">Premier Auto Workshop in Ja-Ela</span>
            </div>

            {/* Main Heading */}
            <h1 ref={headingRef} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-foreground">Expert</span>
              <br />
              <span className="text-gradient bg-clip-text">Auto Engineering</span>
              <br />
              <span className="text-foreground">Solutions</span>
            </h1>

            {/* Description */}
            <p ref={descRef} className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Your trusted partner for comprehensive automobile repairs, precision engine tune-ups, 
              hybrid services, and professional maintenance with over 15 years of expertise.
            </p>

            {/* Stats with CountUp */}
            <div ref={statsRef} className="flex flex-wrap gap-8">
              <div className="group">
                <div className="text-3xl font-bold text-foreground flex items-baseline gap-1">
                  <CountUp end={15} suffix="+" className="tabular-nums" />
                </div>
                <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors">Years Experience</div>
              </div>
              <div className="group">
                <div className="text-3xl font-bold text-foreground flex items-baseline gap-1">
                  <CountUp end={5000} suffix="+" className="tabular-nums" />
                </div>
                <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors">Cars Serviced</div>
              </div>
              <div className="group">
                <div className="text-3xl font-bold text-foreground flex items-baseline gap-1">
                  <CountUp end={100} suffix="%" className="tabular-nums" />
                </div>
                <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors">Satisfaction</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <MagneticButton>
                <Link
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                >
                  <Wrench size={20} />
                  <span>Book Service Now</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/spare-parts"
                  className="group inline-flex items-center justify-center gap-2 bg-card border border-border text-foreground px-8 py-4 rounded-xl font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                >
                  <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                  <span>Browse Spare Parts</span>
                </Link>
              </MagneticButton>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div ref={cardsRef} className="hidden lg:grid grid-cols-2 gap-4 perspective-1000">
            {[
              { icon: Wrench, title: "Engine Repairs", desc: "Complete overhauls & diagnostics", color: "from-red-500/20 to-red-600/10" },
              { icon: Zap, title: "Hybrid Service", desc: "Battery & motor specialists", color: "from-yellow-500/20 to-orange-500/10" },
              { icon: Shield, title: "Genuine Parts", desc: "OEM & aftermarket quality", color: "from-blue-500/20 to-cyan-500/10" },
              { icon: Settings, title: "Full Service", desc: "Maintenance & inspections", color: "from-green-500/20 to-emerald-500/10" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group p-6 bg-card/50 backdrop-blur-sm border border-border rounded-2xl hover:border-primary/50 hover:bg-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2 animate-bounce">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

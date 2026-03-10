"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Mail, Facebook, Instagram, Wrench, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // Columns stagger animation
      const columns = columnsRef.current?.children;
      if (columns) {
        gsap.from(columns, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%"
          }
        });
      }

      // Social icons animation
      const socialIcons = footerRef.current?.querySelectorAll(".social-icon");
      if (socialIcons) {
        socialIcons.forEach((icon) => {
          icon.addEventListener("mouseenter", () => {
            gsap.to(icon, {
              scale: 1.2,
              rotation: 10,
              duration: 0.3,
              ease: "back.out(1.7)"
            });
          });
          icon.addEventListener("mouseleave", () => {
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        });
      }

      // Link hover animations
      const links = footerRef.current?.querySelectorAll(".footer-link");
      if (links) {
        links.forEach((link) => {
          link.addEventListener("mouseenter", () => {
            gsap.to(link, {
              x: 5,
              duration: 0.2,
              ease: "power2.out"
            });
          });
          link.addEventListener("mouseleave", () => {
            gsap.to(link, {
              x: 0,
              duration: 0.2,
              ease: "power2.out"
            });
          });
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-card border-t border-border pt-20 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-[1100px] mx-auto px-4">
        <div ref={columnsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/40 transition-all duration-300" />
                <Image
                  src="/assets/logo.png"
                  alt="NSS Auto Logo"
                  width={48}
                  height={48}
                  className="relative object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground tracking-tight">NSS Auto</span>
                <span className="text-xs text-primary font-medium tracking-wider uppercase">Engineers</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Your trusted partner for expert auto repair and maintenance in Ja-Ela. 
              Specializing in hybrid service, engine diagnostics, and genuine spare parts.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="social-icon w-10 h-10 bg-muted border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-300"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="social-icon w-10 h-10 bg-muted border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-300"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/#about" },
                { name: "Services", href: "/#services" },
                { name: "Gallery", href: "/#gallery" },
                { name: "Contact", href: "/#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="footer-link group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ChevronRight size={14} className="text-primary group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-foreground font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary rounded-full" />
              Services
            </h3>
            <ul className="space-y-3">
              {[
                "Engine Repair",
                "Hybrid Battery Service",
                "Computer Scanning",
                "Spare Parts",
                "Suspension Repair",
              ].map((service) => (
                <li key={service}>
                  <Link 
                    href="/#services" 
                    className="footer-link group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Wrench size={14} className="text-primary" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-foreground font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary rounded-full" />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start group">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <MapPin size={18} className="text-primary" />
                </div>
                <span className="text-sm text-muted-foreground pt-2 group-hover:text-foreground transition-colors">Negombo - Colombo Main Rd, Ja-Ela, Sri Lanka</span>
              </li>
              <li className="flex gap-3 items-start group">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <Phone size={18} className="text-primary" />
                </div>
                <a href="tel:+94716188187" className="text-sm text-muted-foreground hover:text-primary transition-colors pt-2 font-medium">+94 71 618 8187</a>
              </li>
              <li className="flex gap-3 items-start group">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <Mail size={18} className="text-primary" />
                </div>
                <a href="mailto:info@nssauto.lk" className="text-sm text-muted-foreground hover:text-primary transition-colors pt-2 font-medium">info@nssauto.lk</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="border-t border-border bg-muted/50">
        <div className="max-w-[1100px] mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-muted-foreground">
            © {currentYear} <span className="text-foreground font-medium">NSS Auto Engineers</span>. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

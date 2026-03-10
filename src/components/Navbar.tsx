"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Wrench } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Spare Parts", href: "/#spareparts" },
    { name: "Map", href: "/#map" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? "glass border-b border-border/50 py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-4 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/40 transition-all duration-300" />
            <Image
              src="/assets/logo.png"
              alt="NSS Auto Logo"
              width={44}
              height={44}
              className="relative object-contain drop-shadow-lg"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm md:text-base font-bold text-foreground tracking-tight">
              NSS Auto
            </span>
            <span className="text-[10px] md:text-xs text-primary font-medium tracking-wider uppercase">
              Engineers
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link, idx) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative px-4 py-2 font-medium text-muted-foreground hover:text-foreground transition-colors group"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <span className="relative z-10">{link.name}</span>
              <span className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
              <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
          <Link
            href="#contact"
            className="ml-4 px-5 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 flex items-center gap-2"
          >
            <Wrench size={16} />
            Book Now
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 z-50 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-screen w-72 glass border-l border-border shadow-2xl transform transition-transform duration-500 ease-out pt-24 flex flex-col gap-2 px-6 md:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {navLinks.map((link, idx) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-foreground px-4 py-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ 
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? "translateX(0)" : "translateX(20px)",
                transition: `all 0.3s ease ${idx * 0.05}s`
              }}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            className="mt-4 px-4 py-3 bg-primary text-primary-foreground font-semibold rounded-lg text-center hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Wrench size={18} />
            Book Service
          </Link>
        </div>

        {/* Mobile Menu Backdrop */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
}

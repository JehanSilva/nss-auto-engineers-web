"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { contact } from "@/data/contact";

const navLinks = [
  { name: "Services", href: "/#services", id: "services" },
  { name: "Spare Parts", href: "/#spareparts", id: "spareparts" },
  { name: "Gallery", href: "/#gallery", id: "gallery" },
  { name: "Map", href: "/#map", id: "map" },
  { name: "Contact", href: "/#contact", id: "contact" },
  { name: "Browse Spare Parts", href: "/spare-parts", id: "catalog" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sectionInView, setSectionInView] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeId = isHome ? sectionInView : pathname.startsWith("/spare-parts") ? "catalog" : null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight the homepage section currently in view
  useEffect(() => {
    if (!isHome) return;
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setSectionInView(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 shadow-md backdrop-blur-sm py-2" : "bg-white py-4"
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-4 flex items-center justify-between">

        {/* Logo Section */}
        <Link
          href="/"
          onClick={(e) => {
            // Already on the homepage: scroll back up to the hero instead of a no-op navigation
            if (!isHome) return;
            e.preventDefault();
            setIsMobileMenuOpen(false);
            window.history.replaceState(null, "", "/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex flex-col items-center justify-center leading-none hover:opacity-80 transition-opacity"
        >
          <Image
            src="/assets/logo.png"
            alt="NSS Auto Logo"
            width={40}
            height={40}
            className="mb-1 object-contain"
          />
          <span className="text-[10px] md:text-xs font-bold text-accent uppercase tracking-wide text-center">
            NSS Auto Engineers
          </span>
          <span className="text-[9px] md:text-[10px] text-gray-500 font-medium tracking-wide mt-0.5">
            Repairs & Spare Parts
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex gap-6">
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative whitespace-nowrap font-semibold py-1 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:bg-accent after:origin-left after:transition-transform after:duration-300 ${
                    isActive
                      ? "text-accent after:scale-x-100"
                      : "text-gray-800 hover:text-accent after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <a
            href={contact.phoneTel}
            className="inline-flex items-center gap-2 whitespace-nowrap bg-accent text-white px-5 py-2 rounded-full text-sm font-semibold shadow-sm hover:bg-accent-dark transition-colors"
          >
            <Phone size={16} />
            Call Us
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden flex flex-col gap-1.5 z-50 p-2 -mr-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-800 transition-opacity ${isMobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>

        {/* Mobile Menu Backdrop */}
        <div
          className={`fixed inset-0 h-screen bg-black/40 lg:hidden transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-screen w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out pt-24 pb-8 flex flex-col px-6 lg:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-lg font-medium border-b border-gray-100 py-3 transition-colors ${
                  activeId === link.id ? "text-accent" : "text-gray-800"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3">
            <a
              href={contact.phoneTel}
              className="inline-flex items-center justify-center gap-2 bg-accent text-white py-3 rounded-full font-semibold"
            >
              <Phone size={18} />
              Call Us
            </a>
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25d366] text-white py-3 rounded-full font-semibold"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt=""
                width={18}
                height={18}
              />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

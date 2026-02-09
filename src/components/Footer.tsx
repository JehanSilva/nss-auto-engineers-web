import Link from "next/link";
import { Phone, MapPin, Mail, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700 pt-16 border-accent">
      <div className="max-w-[1100px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div>
            <h2 className="text-2xl font-bold text-accent mb-4">NSS Auto Engineers</h2>
            <p className="text-sm leading-relaxed mb-6 text-gray-600">
              Your trusted partner for expert auto repair and maintenance in Ja-Ela. 
              Specializing in hybrid service, engine diagnostics, and genuine spare parts.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all shadow-sm">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all shadow-sm">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6 border-b-2 border-red-100 inline-block pb-1">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-accent transition-colors flex items-center gap-2"><span className="text-accent">›</span> Home</Link></li>
              <li><Link href="/#about" className="hover:text-accent transition-colors flex items-center gap-2"><span className="text-accent">›</span> About Us</Link></li>
              <li><Link href="/#services" className="hover:text-accent transition-colors flex items-center gap-2"><span className="text-accent">›</span> Services</Link></li>
              <li><Link href="/#gallery" className="hover:text-accent transition-colors flex items-center gap-2"><span className="text-accent">›</span> Gallery</Link></li>
              <li><Link href="/#contact" className="hover:text-accent transition-colors flex items-center gap-2"><span className="text-accent">›</span> Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6 border-b-2 border-red-100 inline-block pb-1">Our Services</h3>
            <ul className="space-y-3">
              <li><Link href="/#services" className="hover:text-accent transition-colors flex items-center gap-2"><span className="text-accent">›</span> Engine Repair</Link></li>
              <li><Link href="/#services" className="hover:text-accent transition-colors flex items-center gap-2"><span className="text-accent">›</span> Hybrid Battery Service</Link></li>
              <li><Link href="/#services" className="hover:text-accent transition-colors flex items-center gap-2"><span className="text-accent">›</span> Computer Scanning</Link></li>
              <li><Link href="/spare-parts" className="hover:text-accent transition-colors flex items-center gap-2"><span className="text-accent">›</span> Spare Parts</Link></li>
              <li><Link href="/#services" className="hover:text-accent transition-colors flex items-center gap-2"><span className="text-accent">›</span> Suspension Repair</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6 border-b-2 border-red-100 inline-block pb-1">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded bg-red-50 flex items-center justify-center shrink-0 text-accent">
                   <MapPin size={16} />
                </div>
                <span className="text-sm pt-1">Negombo - Colombo Main Rd, Ja-Ela, Sri Lanka</span>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded bg-red-50 flex items-center justify-center shrink-0 text-accent">
                   <Phone size={16} />
                </div>
                <a href="tel:+94716188187" className="text-sm hover:text-accent transition-colors pt-1 font-medium">+94 71 618 8187</a>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded bg-red-50 flex items-center justify-center shrink-0 text-accent">
                   <Mail size={16} />
                </div>
                <a href="mailto:info@nssauto.lk" className="text-sm hover:text-accent transition-colors pt-1 font-medium">info@nssauto.lk</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="bg-accent text-white py-4">
        <div className="max-w-[1100px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm opacity-90">
          <p>© {new Date().getFullYear()} NSS Auto Engineers. All rights reserved.</p>
          <div className="flex gap-6 mt-2 md:mt-0">
            <Link href="#" className="hover:underline">Privacy Policy</Link>
            <Link href="#" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
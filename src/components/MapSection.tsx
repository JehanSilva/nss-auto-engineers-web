import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { contact } from "@/data/contact";

export default function MapSection() {
  return (
    <section id="map" className="py-16 bg-white">
      <div className="max-w-[1100px] mx-auto px-4">
        <SectionHeading eyebrow="Find Us" title="Visit Our Workshop & Parts Shop" />

        <div className="grid md:grid-cols-[1fr_300px] gap-6">
          <Reveal className="w-full h-[320px] md:h-[400px] rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d416.17393734958443!2d79.89015194780976!3d7.086985605361363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2f132136fca39%3A0xb7b2b649b46c9c6e!2sNSS%20Auto%20Engineers!5e0!3m2!1sen!2slk!4v1762264646917!5m2!1sen!2slk"
              title="NSS Auto Engineers on Google Maps"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </Reveal>

          <Reveal delay={100} className="bg-gray-50 rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col">
            <ul className="space-y-5 text-sm mb-6">
              <li className="flex gap-3">
                <MapPin className="text-accent shrink-0" size={20} />
                <div>
                  <strong className="block text-gray-900">Address</strong>
                  <p className="text-gray-600">{contact.address}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock className="text-accent shrink-0" size={20} />
                <div>
                  <strong className="block text-gray-900">Working Hours</strong>
                  <p className="text-gray-600">{contact.hours}</p>
                  <p className="text-gray-500 text-xs">{contact.closedDays}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Phone className="text-accent shrink-0" size={20} />
                <div>
                  <strong className="block text-gray-900">Phone</strong>
                  <a href={contact.phoneTel} className="text-gray-600 font-semibold hover:text-accent transition-colors">
                    {contact.phoneDisplay}
                  </a>
                </div>
              </li>
            </ul>
            <a
              href={contact.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 bg-accent text-white py-3 rounded-full font-semibold hover:bg-accent-dark transition-colors"
            >
              <Navigation size={18} />
              Get Directions
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

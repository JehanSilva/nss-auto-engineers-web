"use client";
import { useState, FormEvent } from "react";
import { Phone, MapPin, Mail, Clock } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // ... (Use same fetch logic as before) ...
    // Note: Add your fetch logic here
    setIsLoading(false);
  };

  return (
    <section id="contact" className="py-12 bg-white">
      <div className="max-w-[1100px] mx-auto px-4">
        <h3 className="text-2xl font-bold mb-2">Contact Us</h3>
        <p className="text-gray-600 mb-8">Call, email or send us a message below.</p>

        <div className="grid md:grid-cols-[1fr_320px] gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input name="name" type="text" required className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input name="email" type="email" required className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input name="phone" type="tel" className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea name="message" rows={4} required className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"></textarea>
            </div>
            <button type="submit" disabled={isLoading} className="bg-accent text-white py-2.5 px-4 rounded-md font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Info Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-fit">
            <h4 className="font-bold text-lg mb-6">Workshop Info</h4>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="text-accent shrink-0" />
                <div>
                  <strong className="block text-gray-900 text-sm">Location</strong>
                  <p className="text-gray-600 text-sm">Negombo - Colombo Main Rd, Ja-Ela</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Phone className="text-accent shrink-0" />
                <div>
                  <strong className="block text-gray-900 text-sm">Phone</strong>
                  <a href="tel:+94716188187" className="text-gray-600 text-sm hover:text-accent font-semibold">+94 71 618 8187</a>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="text-accent shrink-0" />
                <div>
                  <strong className="block text-gray-900 text-sm">Working Hours</strong>
                  <p className="text-gray-600 text-sm">Mon - Sat: 8:30am — 6:00pm</p>
                  <p className="text-gray-500 text-xs">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Gallery from "@/components/Gallery";
import SpareParts from "@/components/SpareParts";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MapSection from "@/components/MapSection";
import GoogleReviews from "@/components/GoogleReviews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <Hero />

      <TrustStrip />
      
      <Services />

      <SpareParts />

      <Gallery />

      <GoogleReviews />
      
      <MapSection />

      <Contact />
      
      <Footer />
      
      <WhatsAppFloat />
    </main>
  );
}
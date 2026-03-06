import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | NSS Auto Engineers Ja-Ela",
  description: "Terms of Service for NSS Auto Engineers. Read the rules and guidelines for using our auto repair services, website, and purchasing spare parts in Sri Lanka.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 prose prose-slate">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <div className="space-y-6 text-gray-700">
            <p>
              Welcome to NSS Auto Engineers. These Terms of Service ("Terms") govern your access to and use of our website (www.nssauto.lk) and the auto repair, maintenance, and spare parts services we provide at our facility in Ja-Ela, Sri Lanka.
            </p>
            <p>
              By accessing our website or utilizing our services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Services Provided</h2>
            <p>
              NSS Auto Engineers provides professional automotive repair, maintenance, diagnostics, and the sale of genuine and OEM spare parts. While we strive to provide accurate estimates for time and cost, all quotes are estimates based on initial inspections and may change upon further diagnostic or teardown procedures. We will communicate any significant changes to you before proceeding.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Payment Terms</h2>
            <p>
              Payment for services rendered and parts supplied is due in full upon completion of the work and before the vehicle is released, unless prior credit arrangements have been established. We accept cash, major credit/debit cards, and bank transfers. All parts remain the property of NSS Auto Engineers until full payment is received.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Warranties and Guarantees</h2>
            <p>
              We warranty our repair labor for a specified period communicated at the time of service. Parts warranties are subject to the individual manufacturer or supplier's terms. Our warranty does not cover damage resulting from misuse, accidents, negligence, or unauthorized modifications after the vehicle leaves our premises. Wear and tear items (e.g., brake pads, wiper blades) are exempt from long-term guarantees.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Liability</h2>
            <p>
              NSS Auto Engineers takes utmost care of vehicles in our possession. However, we are not liable for loss or damage to vehicles or articles left inside vehicles in case of fire, theft, or any cause beyond our reasonable control. Customers are advised to remove all valuables from their vehicles before leaving them at our facility.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Abandoned Vehicles</h2>
            <p>
              Vehicles left at our facility for more than 14 days after notification of completed repairs, without prior arrangement, may be subject to daily storage fees. Vehicles abandoned for over 60 days will be dealt with according to the applicable laws of Sri Lanka to recover outstanding debts and storage costs.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Intellectual Property</h2>
            <p>
              All content on the NSS Auto Engineers website, including text, graphics, logos, and images, is our property or the property of our licensors and is protected by copyright and intellectual property laws. You may not use, reproduce, or distribute this content without our express permission.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Democratic Socialist Republic of Sri Lanka. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Sri Lanka.
            </p>

             <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Contact Information</h2>
            <p>
              If you have any questions or concerns regarding these Terms, please contact us at:
            </p>
             <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mt-4">
              <p className="font-bold text-gray-900">NSS Auto Engineers</p>
              <p>Phone: +94 71 618 8187</p>
              <p>Email: info@nssauto.lk</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import type { Metadata } from "next";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | NSS Auto Engineers Ja-Ela",
  description: "Terms of Service for NSS Auto Engineers. Read the rules and guidelines for using our auto repair services, website, and purchasing spare parts in Sri Lanka.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-background industrial-grid">
      <Navbar />
      
      <section className="py-24 pt-32">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <FileText size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Legal Information</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          {/* Content */}
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 animate-fade-in delay-100">
            <div className="space-y-8 text-muted-foreground">
              <div>
                <p className="text-lg leading-relaxed mb-4">
                  Welcome to NSS Auto Engineers. These Terms of Service ("Terms") govern your access to and use of our website (www.nssauto.lk) and the auto repair, maintenance, and spare parts services we provide at our facility in Ja-Ela, Sri Lanka.
                </p>
                <p className="text-lg leading-relaxed">
                  By accessing our website or utilizing our services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-primary rounded-full" />
                  1. Services Provided
                </h2>
                <p>
                  NSS Auto Engineers provides professional automotive repair, maintenance, diagnostics, and the sale of genuine and OEM spare parts. While we strive to provide accurate estimates for time and cost, all quotes are estimates based on initial inspections and may change upon further diagnostic or teardown procedures. We will communicate any significant changes to you before proceeding.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-primary rounded-full" />
                  2. Payment Terms
                </h2>
                <p>
                  Payment for services rendered and parts supplied is due in full upon completion of the work and before the vehicle is released, unless prior credit arrangements have been established. We accept cash, major credit/debit cards, and bank transfers. All parts remain the property of NSS Auto Engineers until full payment is received.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-primary rounded-full" />
                  3. Warranties and Guarantees
                </h2>
                <p>
                  We warranty our repair labor for a specified period communicated at the time of service. Parts warranties are subject to the individual manufacturer or supplier's terms. Our warranty does not cover damage resulting from misuse, accidents, negligence, or unauthorized modifications after the vehicle leaves our premises. Wear and tear items (e.g., brake pads, wiper blades) are exempt from long-term guarantees.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-primary rounded-full" />
                  4. Liability
                </h2>
                <p>
                  NSS Auto Engineers takes utmost care of vehicles in our possession. However, we are not liable for loss or damage to vehicles or articles left inside vehicles in case of fire, theft, or any cause beyond our reasonable control. Customers are advised to remove all valuables from their vehicles before leaving them at our facility.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-primary rounded-full" />
                  5. Abandoned Vehicles
                </h2>
                <p>
                  Vehicles left at our facility for more than 14 days after notification of completed repairs, without prior arrangement, may be subject to daily storage fees. Vehicles abandoned for over 60 days will be dealt with according to the applicable laws of Sri Lanka to recover outstanding debts and storage costs.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-primary rounded-full" />
                  6. Intellectual Property
                </h2>
                <p>
                  All content on the NSS Auto Engineers website, including text, graphics, logos, and images, is our property or the property of our licensors and is protected by copyright and intellectual property laws. You may not use, reproduce, or distribute this content without our express permission.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-primary rounded-full" />
                  7. Governing Law
                </h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the Democratic Socialist Republic of Sri Lanka. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Sri Lanka.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-primary rounded-full" />
                  8. Contact Information
                </h2>
                <p className="mb-4">
                  If you have any questions or concerns regarding these Terms, please contact us at:
                </p>
                <div className="bg-muted/50 p-6 rounded-xl border border-border">
                  <p className="font-bold text-foreground">NSS Auto Engineers</p>
                  <p>Phone: <a href="tel:+94716188187" className="text-primary hover:underline">+94 71 618 8187</a></p>
                  <p>Email: <a href="mailto:info@nssauto.lk" className="text-primary hover:underline">info@nssauto.lk</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import type { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | NSS Auto Engineers Ja-Ela",
  description: "Privacy Policy for NSS Auto Engineers. Learn how we collect, use, and protect your personal data when you use our auto repair and spare parts services in Ja-Ela.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background industrial-grid">
      <Navbar />
      
      <section className="py-24 pt-32">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <Shield size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Your Privacy Matters</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          {/* Content */}
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 animate-fade-in delay-100">
            <div className="space-y-8 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                NSS Auto Engineers ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (www.nssauto.lk) or use our auto repair and spare parts services in Ja-Ela, Sri Lanka.
              </p>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-primary rounded-full" />
                  1. Information We Collect
                </h2>
                <p className="mb-4">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-none space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    Contact us via phone, email, or WhatsApp.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    Request a service quote or book an appointment.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    Purchase genuine spare parts or auto repair services.
                  </li>
                </ul>
                <p className="mt-4">
                  The personal information that we collect depends on the context of your interactions with us and may include: names, phone numbers, email addresses, vehicle details (make, model, year, VIN number), and service history.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-primary rounded-full" />
                  2. How We Use Your Information
                </h2>
                <p className="mb-4">
                  We use the information we collect or receive to:
                </p>
                <ul className="list-none space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    Facilitate smooth and professional auto repair and maintenance services.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    Fulfill and manage your orders, payments, and appointments.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    Respond to customer service inquiries and support needs.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    Send you administrative information, such as appointment reminders or service updates.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    Improve our website, services, and marketing efforts.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-primary rounded-full" />
                  3. Sharing Your Information
                </h2>
                <p>
                  We do not sell, trade, or rent your personal identification information to others. We may share your information with trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-primary rounded-full" />
                  4. Data Security
                </h2>
                <p>
                  We implement a variety of security measures to maintain the safety of your personal information. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our services is at your own risk.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-primary rounded-full" />
                  5. Contact Us
                </h2>
                <p className="mb-4">
                  If you have questions or comments about this Privacy Policy, please contact us at:
                </p>
                <div className="bg-muted/50 p-6 rounded-xl border border-border">
                  <p className="font-bold text-foreground">NSS Auto Engineers</p>
                  <p>Negombo - Colombo Main Rd</p>
                  <p>Ja-Ela, Sri Lanka</p>
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

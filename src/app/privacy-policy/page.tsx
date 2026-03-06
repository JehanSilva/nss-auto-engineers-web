import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | NSS Auto Engineers Ja-Ela",
  description: "Privacy Policy for NSS Auto Engineers. Learn how we collect, use, and protect your personal data when you use our auto repair and spare parts services in Ja-Ela.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 prose prose-slate">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <div className="space-y-6 text-gray-700">
            <p>
              NSS Auto Engineers ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (www.nssauto.lk) or use our auto repair and spare parts services in Ja-Ela, Sri Lanka.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
            <p>
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact us via phone, email, or WhatsApp.</li>
              <li>Request a service quote or book an appointment.</li>
              <li>Purchase genuine spare parts or auto repair services.</li>
            </ul>
            <p>
              The personal information that we collect depends on the context of your interactions with us and may include: names, phone numbers, email addresses, vehicle details (make, model, year, VIN number), and service history.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
            <p>
              We use the information we collect or receive to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Facilitate smooth and professional auto repair and maintenance services.</li>
              <li>Fulfill and manage your orders, payments, and appointments.</li>
              <li>Respond to customer service inquiries and support needs.</li>
              <li>Send you administrative information, such as appointment reminders or service updates.</li>
              <li>Improve our website, services, and marketing efforts.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Sharing Your Information</h2>
            <p>
              We do not sell, trade, or rent your personal identification information to others. We may share your information with trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Data Security</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our services is at your own risk.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mt-4">
              <p className="font-bold text-gray-900">NSS Auto Engineers</p>
              <p>Negombo - Colombo Main Rd</p>
              <p>Ja-Ela, Sri Lanka</p>
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

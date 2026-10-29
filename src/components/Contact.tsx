import Image from "next/image";
import { Phone, Mail, MapPin, Clock, ArrowRight, Lightbulb, Briefcase } from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { contact } from "@/data/contact";

const { phoneDisplay: PHONE_DISPLAY, phoneTel: PHONE_TEL, whatsappUrl: WHATSAPP_URL, email: EMAIL } = contact;

const suggestionUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(
  "Hi NSS Auto Engineers, I have a suggestion: "
)}`;

const applyUrl = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Job Application - NSS Auto Engineers"
)}&body=${encodeURIComponent(
  "Hi NSS Auto Engineers,\n\nI would like to apply for the position of: \n\nName: \nPhone: \n\nI have attached my CV and copies of my qualifications.\n\nThank you."
)}`;

const applySteps = [
  "Attach your CV",
  "Include copies of your qualifications or certificates",
  "Mention the position you're interested in and your phone number",
];

export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-[1100px] mx-auto px-4">
        <SectionHeading
          eyebrow="Contact Us"
          title="Get in Touch"
          subtitle="The fastest way to reach us is a call or a WhatsApp message."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Get in touch */}
          <Reveal className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-xl text-gray-900 mb-2">Call or Message Us</h3>
            <p className="text-gray-600 text-sm mb-6">
              Questions about a repair, a quote or a spare part? Call us or send us a message on WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={PHONE_TEL}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-accent text-white py-3 px-5 rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25d366] text-white py-3 px-5 rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt=""
                  width={18}
                  height={18}
                />
                WhatsApp Us
              </a>
            </div>

            <div className="space-y-5">
              <div className="flex gap-4">
                <Phone className="text-accent shrink-0" />
                <div>
                  <strong className="block text-gray-900 text-sm">Phone / WhatsApp</strong>
                  <a href={PHONE_TEL} className="text-gray-600 text-sm hover:text-accent font-semibold">{PHONE_DISPLAY}</a>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="text-accent shrink-0" />
                <div>
                  <strong className="block text-gray-900 text-sm">Email</strong>
                  <a href={`mailto:${EMAIL}`} className="text-gray-600 text-sm hover:text-accent font-semibold">{EMAIL}</a>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="text-accent shrink-0" />
                <div>
                  <strong className="block text-gray-900 text-sm">Location</strong>
                  <p className="text-gray-600 text-sm">{contact.address}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="text-accent shrink-0" />
                <div>
                  <strong className="block text-gray-900 text-sm">Working Hours</strong>
                  <p className="text-gray-600 text-sm">{contact.hours}</p>
                  <p className="text-gray-500 text-xs">{contact.closedDays}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            {/* Send a suggestion */}
            <Reveal delay={100} className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <Lightbulb className="text-accent shrink-0" />
                <h3 className="font-bold text-xl text-gray-900">Send a Suggestion</h3>
              </div>
              <p className="text-gray-600 text-sm mb-5">
                Have an idea on how we can serve you better? We&apos;d love to hear your thoughts.
              </p>
              <a
                href={suggestionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-900 text-white py-2.5 px-5 rounded-full text-sm font-medium hover:bg-accent transition-colors"
              >
                Send a Suggestion
                <ArrowRight className="w-4 h-4" />
              </a>
            </Reveal>

            {/* Join our team */}
            <Reveal delay={200} className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="text-accent shrink-0" />
                <h3 className="font-bold text-xl text-gray-900">Join Our Team</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Looking for a career as a mechanic, technician or in spare parts sales? Email us at{" "}
                <a href={`mailto:${EMAIL}`} className="font-semibold text-gray-900 hover:text-accent">{EMAIL}</a>.
              </p>
              <p className="text-gray-900 text-sm font-semibold mb-2">How to apply</p>
              <ol className="list-decimal list-inside text-gray-600 text-sm space-y-1 mb-5">
                {applySteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <a
                href={applyUrl}
                className="inline-flex items-center gap-2 bg-gray-900 text-white py-2.5 px-5 rounded-full text-sm font-medium hover:bg-accent transition-colors"
              >
                Apply by Email
                <ArrowRight className="w-4 h-4" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

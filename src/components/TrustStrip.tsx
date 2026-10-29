import { Award, BatteryCharging, ShieldCheck, ScanLine } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { contact } from "@/data/contact";

const items = [
  { icon: Award, title: `Since ${contact.foundedYear}`, text: `${new Date().getFullYear() - contact.foundedYear}+ years of experience` },
  { icon: BatteryCharging, title: "Hybrid Specialists", text: "Hybrid battery & system repairs" },
  { icon: ShieldCheck, title: "Genuine & OEM Parts", text: "Quality parts from trusted brands" },
  { icon: ScanLine, title: "Computer Diagnostics", text: "Scanning & ECU programming" },
];

export default function TrustStrip() {
  return (
    <section className="bg-gray-50 border-y border-gray-100 py-8">
      <div className="max-w-[1100px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, title, text }, idx) => (
          <Reveal key={title} delay={idx * 80} className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
              <Icon className="text-accent" size={22} />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">{title}</p>
              <p className="text-gray-500 text-xs">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

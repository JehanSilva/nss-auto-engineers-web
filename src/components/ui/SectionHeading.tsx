import Reveal from "@/components/ui/Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ eyebrow, title, subtitle, align = "left" }: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal className={`mb-10 ${centered ? "text-center" : ""}`}>
      <p className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-2">{eyebrow}</p>
      <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
      {subtitle && (
        <p className={`text-gray-600 max-w-2xl ${centered ? "mx-auto" : ""}`}>{subtitle}</p>
      )}
    </Reveal>
  );
}

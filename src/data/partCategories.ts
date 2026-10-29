import { Cog, Disc, Droplet, Zap, type LucideIcon } from "lucide-react";

export const partCategories: { name: string; icon: LucideIcon; examples: string }[] = [
  { name: "Engine & Filters", icon: Cog, examples: "Engine parts, oil, air & fuel filters, spark plugs, belts" },
  { name: "Brakes & Suspension", icon: Disc, examples: "Brake pads, shoes, discs, shock absorbers, bushings" },
  { name: "Oils & Lubricants", icon: Droplet, examples: "Engine oil, gear oil, coolant, brake fluid" },
  { name: "Electrical & Body", icon: Zap, examples: "Bulbs, batteries, sensors, body parts, lights" },
];

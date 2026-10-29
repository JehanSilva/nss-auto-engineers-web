import {
  Anchor, Car, CircleDashed, CircleDot, CloudRain, Cog, Disc, Droplet, Droplets, Filter, Flame,
  Fuel, Lightbulb, Link, Paperclip, Pipette, RefreshCw, Settings, Shield, Snowflake, SprayCan,
  Square, Syringe, Thermometer, Wind, Zap, ArrowDownUp, MoveVertical, Link2, AirVent, Navigation,
  type LucideIcon,
} from "lucide-react";

/**
 * The parts backend has no category field, so categories are matched on part names
 * (and, for vehicle brands, on compatible vehicle makes). A part can be in several categories.
 */
export interface CatalogCategory {
  slug: string;
  name: string;
  icon: LucideIcon;
  /** Part is in the category if its lowercased name matches any of these */
  match: RegExp[];
  /** ...and none of these */
  exclude?: RegExp[];
  /** Brand categories: also match parts whose compatible vehicles are this make */
  vehicleMake?: string;
}

export const partCategories: CatalogCategory[] = [
  { slug: "engine-oil", name: "Engine Oil", icon: Droplet, match: [/engine oil/, /\b\d{1,2}w-?\d{2}\b/, /motor oil/], exclude: [/filter/] },
  { slug: "oil-filter", name: "Oil Filters", icon: Filter, match: [/oil filter/] },
  { slug: "air-filter", name: "Air Filters", icon: Wind, match: [/air filter/], exclude: [/cabin/] },
  { slug: "cabin-filter", name: "Cabin Filters", icon: AirVent, match: [/cabin/] },
  { slug: "fuel-filter", name: "Fuel Filters", icon: Fuel, match: [/fuel filter/, /fule filter/] },
  { slug: "spark-plugs", name: "Spark Plugs", icon: Flame, match: [/spark plug/], exclude: [/tube|gasket|seal/] },
  { slug: "ignition-coils", name: "Ignition Coils", icon: Zap, match: [/ignition coil/] },
  { slug: "brake-pads", name: "Brake Pads", icon: Disc, match: [/brake pads?\b/, /disc pads?\b/] },
  { slug: "brake-shoes-liners", name: "Brake Shoes & Liners", icon: CircleDot, match: [/liner/, /brake shoes?\b/] },
  { slug: "brake-fluid", name: "Brake Fluid", icon: Droplets, match: [/brake (fluid|oil)/, /\bdot ?[345]\b/] },
  { slug: "brake-calipers-cylinders", name: "Brake Calipers & Cylinders", icon: Settings, match: [/caliper/, /brake cylinder/, /wheel cylinder/, /brake washer/] },
  { slug: "hub-bearings", name: "Hub & Wheel Bearings", icon: Cog, match: [/\bhub\b/, /bearing/] },
  { slug: "arm-bush", name: "Arm Bush & Bushings", icon: Link2, match: [/arm bush/, /bushing/, /suspension bush/], exclude: [/stabili[sz]er/] },
  { slug: "stabilizer-links", name: "Stabilizer Links", icon: Link, match: [/stabili[sz]er link/] },
  { slug: "stabilizer-bush", name: "Stabilizer Bush", icon: Link2, match: [/stabili[sz]er (bar )?bush/] },
  { slug: "shock-mounts", name: "Shock Mounts", icon: ArrowDownUp, match: [/(shock|strut).*mount/, /mount.*(shock|strut)/] },
  { slug: "shock-bumpers-dust-covers", name: "Shock Bumpers & Dust Covers", icon: MoveVertical, match: [/bumper/, /dust cover/], exclude: [/boot/] },
  { slug: "cv-boot", name: "CV Boots", icon: Shield, match: [/\bcv\b.*boot/, /drive ?shaft boot/] },
  { slug: "rack-boot", name: "Rack Boots", icon: Shield, match: [/rack.*boot/] },
  { slug: "shock-boot", name: "Shock Boots", icon: Shield, match: [/shock.*boot/] },
  { slug: "oil-seals", name: "Oil Seals", icon: CircleDashed, match: [/\bseal\b/], exclude: [/gasket/] },
  { slug: "gaskets", name: "Gaskets & Packings", icon: Square, match: [/gasket/, /packing/, /tappet cover/], exclude: [/sealastic|silicon/] },
  { slug: "belts", name: "Belts & Tensioners", icon: RefreshCw, match: [/\bbelt\b/, /tensioner/] },
  { slug: "bulbs", name: "Bulbs & Lights", icon: Lightbulb, match: [/bulb/, /head ?light/, /signal light/, /\bled\b/] },
  { slug: "coolant", name: "Coolant", icon: Snowflake, match: [/coolant/, /antifreeze/] },
  { slug: "radiator-cooling", name: "Radiator & Cooling", icon: Thermometer, match: [/radiator/, /water pump/, /thermostat/], exclude: [/coolant/] },
  { slug: "transmission-fluid", name: "Transmission Fluid", icon: Cog, match: [/\batf\b/, /\bcvtf?\b/, /transmission fluid/, /\bat fluid/, /gear ?box fluid/, /multi ?matic/, /gear oil/], exclude: [/filter/] },
  { slug: "cleaners", name: "Cleaners", icon: SprayCan, match: [/cleaner/] },
  { slug: "wiper-blades", name: "Wiper Blades", icon: CloudRain, match: [/wiper/] },
  { slug: "grease-sealants", name: "Grease & Sealants", icon: Pipette, match: [/grease/, /sealastic/, /silicon/] },
  { slug: "engine-gearbox-mounts", name: "Engine & Gearbox Mounts", icon: Anchor, match: [/\bmount\b/, /engine mounting/], exclude: [/shock|strut|absorber/] },
  { slug: "steering-ball-joints", name: "Steering & Ball Joints", icon: Navigation, match: [/tie rod/, /rod end/, /ball joint/, /rack end/, /st(ee|ea)ring rack/], exclude: [/rack.*boot/] },
  { slug: "injectors-fuel-pump", name: "Injectors & Fuel Pumps", icon: Syringe, match: [/injector/, /fuel pump/], exclude: [/cleaner/] },
  { slug: "clips-fasteners", name: "Clips & Cable Ties", icon: Paperclip, match: [/\bclip\b/, /cable tie/] },
];

export const brandCategories: CatalogCategory[] = [
  { slug: "toyota", name: "Toyota", icon: Car, match: [/toyota/], vehicleMake: "toyota" },
  { slug: "honda", name: "Honda", icon: Car, match: [/honda/], vehicleMake: "honda" },
  { slug: "suzuki", name: "Suzuki", icon: Car, match: [/suzuki/, /maruti/], vehicleMake: "suzuki" },
  { slug: "nissan", name: "Nissan", icon: Car, match: [/nissan/], vehicleMake: "nissan" },
  { slug: "mitsubishi", name: "Mitsubishi", icon: Car, match: [/mitsubishi/], vehicleMake: "mitsubishi" },
  { slug: "mazda", name: "Mazda", icon: Car, match: [/mazda/], vehicleMake: "mazda" },
  { slug: "daihatsu", name: "Daihatsu", icon: Car, match: [/daihatsu/], vehicleMake: "daihatsu" },
  { slug: "perodua", name: "Perodua", icon: Car, match: [/perodua/], vehicleMake: "perodua" },
];

export const allCatalogCategories = [...partCategories, ...brandCategories];

export function findCatalogCategory(slug: string | undefined): CatalogCategory | undefined {
  return slug ? allCatalogCategories.find((c) => c.slug === slug) : undefined;
}

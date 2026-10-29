import type { CatalogCategory } from '@/data/partCatalogCategories';

export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
}

export interface SparePart {
  id: string;
  part_number: string;
  image: string;
  compatible_vehicles: Vehicle[];
  name: string;
  stock_quantity: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function fetchSpareParts(): Promise<SparePart[]> {
  const url = new URL('/api/parts/minimal/', API_BASE_URL);
  
  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) {
        console.error(`Failed to fetch spare parts: ${res.status} ${res.statusText}`);
        return [];
    }

    const data: SparePart[] = await res.json();
    
    if (!Array.isArray(data)) {
        console.error('Expected an array of spare parts, but received:', data);
        return [];
    }
    
    // Prepend base URL to image paths if they are relative and handle nulls
    return data.map(part => {
      // Handle potential field name variations and ensure it's a number
      const raw = part as SparePart & { stock_qty?: number };
      const stock = typeof raw.stock_qty !== 'undefined'
        ? raw.stock_qty
        : part.stock_quantity;
        
      return {
        ...part,
        name: part.name || 'Unnamed Part',
        part_number: part.part_number || 'N/A',
        stock_quantity: Number(stock) || 0,
        image: part.image && part.image.startsWith('http') 
          ? part.image 
          : part.image 
            ? `${API_BASE_URL}${part.image}` 
            : part.image
      };
    });

  } catch (error) {
    console.error('Error fetching spare parts:', error);
    return [];
  }
}

/** URL slug for a part page, e.g. "seiken-brake-washer-11-16-1pcs-fef7c6c6" */
export function partSlug(part: Pick<SparePart, 'id' | 'name'>): string {
  const name = part.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/, '');
  return `${name}-${part.id.slice(0, 8)}`;
}

export async function fetchSparePartBySlug(slug: string): Promise<SparePart | null> {
  const idPrefix = slug.slice(slug.lastIndexOf('-') + 1);
  if (!idPrefix) return null;
  const parts = await fetchSpareParts();
  return parts.find((part) => part.id.startsWith(idPrefix)) ?? null;
}

/** Other parts that fit the same vehicles, to link between part pages */
export function relatedParts(part: SparePart, parts: SparePart[], limit = 4): SparePart[] {
  const models = new Set((part.compatible_vehicles ?? []).map((v) => `${v.make} ${v.model}`.toLowerCase()));
  const makes = new Set((part.compatible_vehicles ?? []).map((v) => v.make.toLowerCase()));
  const score = (other: SparePart) =>
    (other.compatible_vehicles ?? []).some((v) => models.has(`${v.make} ${v.model}`.toLowerCase())) ? 2
    : (other.compatible_vehicles ?? []).some((v) => makes.has(v.make.toLowerCase())) ? 1
    : 0;

  return parts
    .filter((other) => other.id !== part.id && other.stock_quantity > 0)
    .map((other) => ({ other, s: score(other) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ other }) => other);
}

export function isInCategory(part: SparePart, category: CatalogCategory): boolean {
  const name = part.name.toLowerCase();
  const nameMatches = category.match.some((re) => re.test(name)) && !category.exclude?.some((re) => re.test(name));
  if (nameMatches) return true;
  const make = category.vehicleMake;
  return !!make && (part.compatible_vehicles ?? []).some((v) => v.make.toLowerCase() === make);
}

export function partsInCategory(parts: SparePart[], category: CatalogCategory): SparePart[] {
  return parts.filter((part) => isInCategory(part, category));
}

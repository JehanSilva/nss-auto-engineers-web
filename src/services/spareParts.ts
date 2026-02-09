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
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function fetchSpareParts(search?: string): Promise<SparePart[]> {
  const url = new URL('/api/parts/minimal/', API_BASE_URL);
  if (search) {
    url.searchParams.append('search', search);
  }

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) {
        console.error(`Failed to fetch spare parts: ${res.status} ${res.statusText}`);
        return [];
    }

    const data: SparePart[] = await res.json();
    
    // Prepend base URL to image paths if they are relative
    return data.map(part => ({
      ...part,
      image: part.image.startsWith('http') ? part.image : `${API_BASE_URL}${part.image}`
    }));

  } catch (error) {
    console.error('Error fetching spare parts:', error);
    return [];
  }
}

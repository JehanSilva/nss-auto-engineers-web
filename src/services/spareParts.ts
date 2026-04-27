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
      const stock = typeof (part as any).stock_qty !== 'undefined' 
        ? (part as any).stock_qty 
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

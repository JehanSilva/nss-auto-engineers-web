'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search, ChevronDown } from 'lucide-react';
import { brands } from '@/data/brands';

export default function SparePartsSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string, type: 'brand' | 'part_number' | 'search' | 'vehicle') => {
    const params = new URLSearchParams(searchParams);
    
    if (term && term !== 'all') {
      params.set(type, term);
    } else {
      params.delete(type);
    }
    
    const newParams = new URLSearchParams();
    if (params.get('brand')) newParams.set('brand', params.get('brand')!);
    if (params.get('part_number')) newParams.set('part_number', params.get('part_number')!);
    if (params.get('search')) newParams.set('search', params.get('search')!);
    if (params.get('vehicle')) newParams.set('vehicle', params.get('vehicle')!);
    
    replace(`${pathname}?${newParams.toString()}`);
  }, 300);

  const inputClasses = "block w-full rounded-xl border border-border bg-card text-foreground py-3 px-4 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground";

  return (
    <div className="relative max-w-5xl mx-auto mb-12 p-6 bg-card border border-border rounded-2xl">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Brand Selector */}
        <div className="relative w-full md:w-1/4">
          <select
            className={`${inputClasses} appearance-none cursor-pointer`}
            onChange={(e) => handleSearch(e.target.value, 'brand')}
            defaultValue={searchParams.get('brand')?.toString() || 'all'}
          >
            <option value="all">All Brands</option>
            {brands.map((brand) => (
              <option key={brand.name} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
            <ChevronDown size={18} />
          </div>
        </div>

        {/* Vehicle Model Input */}
        <div className="relative w-full md:w-1/4">
          <label htmlFor="vehicle" className="sr-only">Vehicle Model</label>
          <input
            id="vehicle"
            className={inputClasses}
            placeholder="Vehicle Model (e.g. Corolla)"
            onChange={(e) => handleSearch(e.target.value, 'vehicle')}
            defaultValue={searchParams.get('vehicle')?.toString()}
          />
        </div>

        {/* Part Number Input */}
        <div className="relative w-full md:w-1/4">
          <label htmlFor="part-number" className="sr-only">Part Number</label>
          <input
            id="part-number"
            className={inputClasses}
            placeholder="Part Number"
            onChange={(e) => handleSearch(e.target.value, 'part_number')}
            defaultValue={searchParams.get('part_number')?.toString()}
          />
        </div>

        {/* General Search Input */}
        <div className="relative w-full md:w-1/4">
          <label htmlFor="search" className="sr-only">Search</label>
          <input
            id="search"
            className={`${inputClasses} pl-11`}
            placeholder="Keywords..."
            onChange={(e) => handleSearch(e.target.value, 'search')}
            defaultValue={searchParams.get('search')?.toString()}
          />
          <Search className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}

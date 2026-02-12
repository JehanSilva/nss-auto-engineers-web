'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';
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
    
    // Create a new URLSearchParams to clean up empty/all values before pushing
    const newParams = new URLSearchParams();
    if (params.get('brand')) newParams.set('brand', params.get('brand')!);
    if (params.get('part_number')) newParams.set('part_number', params.get('part_number')!);
    if (params.get('search')) newParams.set('search', params.get('search')!);
    if (params.get('vehicle')) newParams.set('vehicle', params.get('vehicle')!);
    
    replace(`${pathname}?${newParams.toString()}`);
  }, 300);

  return (
    <div className="relative max-w-5xl mx-auto mb-12 flex flex-col md:flex-row gap-4 flex-wrap">
      {/* Brand Selector */}
      <div className="relative w-full md:w-[22%]">
        <select
          className="block w-full rounded-md border border-gray-200 py-[9px] px-3 text-base outline-none focus:border-gray-900 appearance-none bg-white"
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
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>

       {/* Vehicle Model Input */}
      <div className="relative w-full md:w-[22%]">
        <label htmlFor="vehicle" className="sr-only">Vehicle Model</label>
        <input
          id="vehicle"
          className="peer block w-full rounded-md border border-gray-200 py-[9px] px-3 text-base outline-2 placeholder:text-gray-500"
          placeholder="Vehicle Model (e.g. Corolla)"
          onChange={(e) => handleSearch(e.target.value, 'vehicle')}
          defaultValue={searchParams.get('vehicle')?.toString()}
        />
      </div>

      {/* Part Number Input */}
      <div className="relative w-full md:w-[22%]">
        <label htmlFor="part-number" className="sr-only">Part Number</label>
        <input
          id="part-number"
          className="peer block w-full rounded-md border border-gray-200 py-[9px] px-3 text-base outline-2 placeholder:text-gray-500"
          placeholder="Part Number"
          onChange={(e) => handleSearch(e.target.value, 'part_number')}
          defaultValue={searchParams.get('part_number')?.toString()}
        />
      </div>

       {/* General Search Input */}
      <div className="relative w-full md:w-[28%]">
        <label htmlFor="search" className="sr-only">Search</label>
        <input
          id="search"
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-base outline-2 placeholder:text-gray-500"
          placeholder="Keywords..."
          onChange={(e) => handleSearch(e.target.value, 'search')}
          defaultValue={searchParams.get('search')?.toString()}
        />
        <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
    </div>
  );
}

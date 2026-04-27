'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';
import { brands } from '@/data/brands';

export default function SparePartsSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    
    // Clean up old parameters if they exist
    params.delete('search');
    params.delete('brand');
    params.delete('part_number');
    params.delete('vehicle');
    
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative max-w-2xl mx-auto mb-12">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="pl-5 text-gray-400">
            <Search className="h-6 w-6" />
          </div>
          <input
            type="text"
            className="flex-1 min-w-0 py-4 px-4 text-lg bg-transparent border-none focus:ring-0 focus:outline-none placeholder:text-gray-400 text-gray-900"
            placeholder="Search by part name, number, or vehicle (e.g., Toyota Brake Pad)"
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchParams.get('q')?.toString()}
          />
          <div className="pr-4 hidden sm:flex items-center flex-shrink-0">
            <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100 uppercase tracking-widest whitespace-nowrap">
              Keyword Search
            </span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-500 text-center">
        Try searching for brands like <span className="font-medium text-accent">Toyota</span>, <span className="font-medium text-accent">Suzuki</span> or specific parts like <span className="font-medium text-accent">Filters</span>.
      </p>
    </div>
  );
}

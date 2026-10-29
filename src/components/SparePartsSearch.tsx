'use client';

import { FormEvent } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';

const CATALOG_PATH = '/spare-parts';

export default function SparePartsSearch({ compact = false }: { compact?: boolean }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();
  // On the catalog the results filter as you type; elsewhere (e.g. a part page) Enter opens the catalog
  const isCatalog = pathname === CATALOG_PATH;

  const searchUrl = (term: string) => {
    const params = new URLSearchParams(isCatalog ? searchParams : undefined);

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

    const query = params.toString();
    return query ? `${CATALOG_PATH}?${query}` : CATALOG_PATH;
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    if (isCatalog) replace(searchUrl(term));
  }, 300);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const term = (new FormData(e.currentTarget).get('q') as string | null)?.trim() ?? '';
    handleSearch.cancel();
    if (isCatalog) replace(searchUrl(term));
    else push(searchUrl(term));
  };

  return (
    <form role="search" onSubmit={handleSubmit} className={`relative max-w-2xl mx-auto ${compact ? '' : 'mb-12'}`}>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="pl-5 text-gray-400">
            <Search className={compact ? 'h-5 w-5' : 'h-6 w-6'} />
          </div>
          <input
            type="search"
            name="q"
            aria-label="Search spare parts"
            className={`flex-1 min-w-0 px-4 bg-transparent border-none focus:ring-0 focus:outline-none placeholder:text-gray-400 text-gray-900 ${
              compact ? 'py-3 text-base' : 'py-4 text-lg'
            }`}
            placeholder="Search by part name, number, or vehicle (e.g., Toyota Brake Pad)"
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={isCatalog ? searchParams.get('q')?.toString() : undefined}
          />
          {isCatalog ? (
            <div className="pr-4 hidden sm:flex items-center flex-shrink-0">
              <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100 uppercase tracking-widest whitespace-nowrap">
                Keyword Search
              </span>
            </div>
          ) : (
            <button
              type="submit"
              className="mr-2 flex-shrink-0 bg-accent text-white px-4 sm:px-5 py-2 rounded-lg text-sm font-semibold hover:bg-accent-dark transition-colors"
            >
              Search
            </button>
          )}
        </div>
      </div>
      {!compact && (
        <p className="mt-3 text-sm text-gray-500 text-center">
          Try searching for brands like <span className="font-medium text-accent">Toyota</span>, <span className="font-medium text-accent">Suzuki</span> or specific parts like <span className="font-medium text-accent">Filters</span>.
        </p>
      )}
    </form>
  );
}

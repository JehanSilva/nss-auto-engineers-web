'use client';

import { useState } from 'react';
import { SparePart } from '@/services/spareParts';
import SparePartCard from '@/components/SparePartCard';
import { Package, ChevronDown } from 'lucide-react';

interface SparePartsListProps {
  parts: SparePart[];
}

const ITEMS_PER_PAGE = 20;

export default function SparePartsList({ parts }: SparePartsListProps) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const visibleParts = parts.slice(0, visibleCount);
  const hasMore = visibleCount < parts.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  if (parts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Package size={32} className="text-muted-foreground" />
        </div>
        <p className="text-xl text-muted-foreground mb-3">No spare parts found matching your criteria.</p>
        <a href="/spare-parts" className="text-primary hover:underline inline-flex items-center gap-2">
          View all parts
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {visibleParts.map((part, idx) => (
          <div 
            key={part.id}
            className="animate-fade-in"
            style={{ animationDelay: `${(idx % ITEMS_PER_PAGE) * 50}ms` }}
          >
            <SparePartCard part={part} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center">
          <button
            onClick={handleShowMore}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300"
          >
            <span>Show More</span>
            <ChevronDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
          <p className="text-sm text-muted-foreground mt-4">
            Showing {visibleParts.length} of {parts.length} parts
          </p>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { SparePart } from '@/services/spareParts';
import SparePartCard from '@/components/SparePartCard';

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
      <div className="text-center py-12">
        <p className="text-xl text-gray-500">No spare parts found matching your criteria.</p>
        <a href="/spare-parts" className="text-accent hover:underline mt-2 inline-block">View all parts</a>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-12">
        {visibleParts.map((part) => (
          <SparePartCard key={part.id} part={part} />
        ))}
      </div>

      {hasMore && (
        <div className="text-center">
          <button
            onClick={handleShowMore}
            className="px-8 py-3 bg-accent text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            Show More
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Showing {visibleParts.length} of {parts.length} parts
          </p>
        </div>
      )}
    </div>
  );
}

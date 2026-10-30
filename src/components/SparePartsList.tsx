import Link from 'next/link';
import { SparePart } from '@/services/spareParts';
import SparePartCard from '@/components/SparePartCard';
import ShowMoreButton from '@/components/ShowMoreButton';

interface SparePartsListProps {
  /** Only the parts to render; the server slices the full result set */
  parts: SparePart[];
  total: number;
  /** URL that loads the next batch, when there are more */
  nextHref?: string;
}

export default function SparePartsList({ parts, total, nextHref }: SparePartsListProps) {
  if (total === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-500">No spare parts found matching your criteria.</p>
        <Link href="/spare-parts" className="text-accent hover:underline mt-2 inline-block">View all parts</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-12">
        {parts.map((part) => (
          <SparePartCard key={part.id} part={part} />
        ))}
      </div>

      {nextHref && (
        <div className="text-center">
          <ShowMoreButton href={nextHref} />
          <p className="text-sm text-gray-500 mt-4">
            Showing {parts.length} of {total} parts
          </p>
        </div>
      )}
    </div>
  );
}

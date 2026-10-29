'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SparePart } from '@/services/spareParts';
import { contact } from '@/data/contact';

export default function SparePartCard({ part }: { part: SparePart }) {
  const [isLoading, setIsLoading] = useState(true);
  const outOfStock = part.stock_quantity < 1;

  const askUrl = `${contact.whatsappUrl}?text=${encodeURIComponent(
    `Hi NSS Auto Engineers, I'm interested in this part:\n${part.name} (Part #: ${part.part_number})\nIs it available?`
  )}`;

  return (
    <div className="animate-fade-up bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group h-full">
      <div className="relative h-36 sm:h-56 w-full bg-gray-50 p-4 sm:p-6 group-hover:bg-gray-100 transition-colors">
        {outOfStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-md z-10">
            Out of Stock
          </div>
        )}
        {part.stock_quantity === 1 && (
          <div className="absolute top-2 right-2 bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded shadow-sm z-10">
            Only 1 left
          </div>
        )}

        {/* Loading Skeleton */}
        {isLoading && part.image && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse z-0" />
        )}

        {part.image ? (
          <Image
            src={part.image}
            alt={part.name || part.part_number}
            fill
            sizes="(max-width: 1024px) 50vw, 33vw"
            className={`object-contain p-2 transition-all duration-500 group-hover:scale-105 ${
              isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            } ${outOfStock ? 'grayscale' : ''}`}
            onLoad={() => setIsLoading(false)}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No Image Available
          </div>
        )}
      </div>

      <div className="p-3 sm:p-6 flex flex-col flex-grow">
        <h3 className="font-bold text-sm sm:text-lg mb-1 text-gray-800 group-hover:text-accent transition-colors">{part.name}</h3>
        <p className="text-xs sm:text-sm text-gray-500 mb-3">Part #: {part.part_number}</p>

        <div className="space-y-2 mb-4 sm:mb-6 flex-grow">
          {part.compatible_vehicles && part.compatible_vehicles.length > 0 ? (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Compatible Vehicles:</p>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                {part.compatible_vehicles.map((vehicle) => (
                  <li key={vehicle.id} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2 flex-shrink-0"></span>
                    <span>
                      {vehicle.make} {vehicle.model}
                      {vehicle.year ? ` ${vehicle.year}` : ''}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
             <p className="text-xs sm:text-sm text-gray-500 italic">Universal fit options may vary.</p>
          )}
        </div>

        <a
          href={askUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
            outOfStock
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-[#25d366] text-white hover:opacity-90'
          }`}
        >
          {outOfStock ? 'Check Availability' : 'Ask on WhatsApp'}
        </a>
      </div>
    </div>
  );
}

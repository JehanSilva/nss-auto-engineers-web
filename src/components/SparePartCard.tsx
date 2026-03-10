'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SparePart } from '@/services/spareParts';
import { Package, AlertCircle } from 'lucide-react';

export default function SparePartCard({ part }: { part: SparePart }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="group bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col h-full hover-lift">
      <div className="relative h-56 w-full bg-muted p-6">
        {part.stock_quantity < 1 && (
          <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10 flex items-center gap-1">
            <AlertCircle size={12} />
            Out of Stock
          </div>
        )}
        
        {/* Loading Skeleton */}
        {isLoading && part.image && (
          <div className="absolute inset-0 bg-muted animate-shimmer z-0" />
        )}

        {part.image ? (
          <Image
            src={part.image}
            alt={part.name || part.part_number}
            fill
            className={`object-contain transition-all duration-500 ${
              isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            } ${part.stock_quantity < 1 ? 'grayscale opacity-50' : ''}`}
            onLoad={() => setIsLoading(false)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Package size={40} className="mb-2 opacity-50" />
            <span className="text-sm">No Image Available</span>
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h4 className="font-bold text-lg mb-1 text-foreground group-hover:text-primary transition-colors">{part.name}</h4>
        <p className="text-sm text-muted-foreground mb-4 font-mono">Part #: {part.part_number}</p>
        
        <div className="space-y-2 flex-grow">
          {part.compatible_vehicles && part.compatible_vehicles.length > 0 ? (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Compatible Vehicles:</p>
              <ul className="text-sm text-foreground/80 space-y-1.5">
                {part.compatible_vehicles.map((vehicle) => (
                  <li key={vehicle.id} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></span>
                    <span>
                      {vehicle.make} {vehicle.model}
                      {vehicle.year ? ` ${vehicle.year}` : ''}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">Universal fit options may vary.</p>
          )}
        </div>

        {part.stock_quantity < 1 && (
          <div className="block w-full text-center py-3 bg-muted text-muted-foreground rounded-xl font-semibold mt-4 cursor-not-allowed border border-border">
            Out of Stock
          </div>
        )}
      </div>
      
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}

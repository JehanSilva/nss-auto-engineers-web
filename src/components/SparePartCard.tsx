import Image from 'next/image';
import { SparePart } from '@/services/spareParts';

export default function SparePartCard({ part }: { part: SparePart }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group h-full">
      <div className="relative h-56 w-full bg-gray-50 p-6 group-hover:bg-gray-100 transition-colors">
        {part.image ? (
          <Image
            src={part.image}
            alt={part.name || part.part_number}
            fill
            className="object-contain"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image Available
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h4 className="font-bold text-xl mb-1 text-gray-800">{part.name}</h4>
        <p className="text-sm text-gray-500 mb-3">Part #: {part.part_number}</p>
        
        <div className="space-y-2 mb-6 flex-grow">
          {part.compatible_vehicles && part.compatible_vehicles.length > 0 ? (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Compatible Vehicles:</p>
              <ul className="text-sm text-gray-600 space-y-1">
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
             <p className="text-sm text-gray-500 italic">Universal fit options may vary.</p>
          )}
        </div>

        <a 
          href="/#contact" 
          className="block w-full text-center py-3 border border-accent text-accent rounded-lg hover:bg-accent hover:text-white transition-colors font-semibold mt-auto"
        >
          Request Quote
        </a>
      </div>
    </div>
  );
}


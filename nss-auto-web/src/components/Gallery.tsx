"use client";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react"; // npm install lucide-react

const galleryImages = [
  "cars-in-lineup.png",
  "car-repairing.png",
  "team.PNG",
  "vantage-car.png",
  "gallery-sample4.JPG", // Make sure these file names match your assets folder exactly
  "gallery-sample5.JPG"
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-12 bg-gray-50">
      <div className="max-w-[1100px] mx-auto px-4">
        <h3 className="text-2xl font-bold mb-2 text-gray-900">Gallery</h3>
        <p className="text-gray-600 mb-8">Photos from the workshop and recent projects.</p>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, idx) => (
            <div 
              key={idx} 
              className="relative h-48 w-full cursor-pointer overflow-hidden rounded-lg group"
              onClick={() => setSelectedImage(`/assets/${img}`)}
            >
              <Image
                src={`/assets/${img}`}
                alt={`Gallery image ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Lightbox Overlay */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors">
              <X size={40} />
            </button>
            <div 
              className="relative w-full max-w-4xl h-[80vh]"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            >
              <Image
                src={selectedImage}
                alt="Enlarged view"
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
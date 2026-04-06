"use client";

import { useState } from "react";

export default function AllMedia() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Replace these literal paths with actual images from your /public folder.
  const mediaItems = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1683009427666-340595e57e43?w=800&q=80",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1707343843437-caacff5cfa74?w=800&q=80",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1707343843437-caacff5cfa74?w=800&q=80",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1682687218147-9806132dc697?w=800&q=80",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1683009427666-340595e57e43?w=800&q=80",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1707345512638-997d31a10eaa?w=800&q=80",
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col items-center text-center">
        <h2 className="text-3xl font-light tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl">
          Gallery
        </h2>
        <p className="mt-4 max-w-2xl text-base text-neutral-500 dark:text-neutral-400">
          A beautifully minimal collection of moments. Hover to focus.
        </p>
      </div>

      {/* Masonry-style CSS grid alternative (columns) */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {mediaItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item.src)}
            className="group relative overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800 break-inside-avoid cursor-pointer"
          >
            <img
              src={item.src}
              alt={`Gallery item ${item.id}`}
              className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            {/* Subtle darkened overlay on hover */}
            <div className="absolute inset-0 bg-transparent transition-colors duration-500 group-hover:bg-black/10" />
            
            {/* Click to expand indicator */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                View
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Full screen modal preview */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 z-[60] p-2 text-white/70 hover:text-white transition-colors bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>

          {/* Expanded Image */}
          <img 
            src={selectedImage} 
            alt="Expanded view" 
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl ring-1 ring-white/10 select-none animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </section>
  );
}

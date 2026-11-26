"use client";

import React, { useState } from "react";

export interface LightboxItem {
  id: string;
  src: string;
  title: string;
}

interface ImageLightboxGridProps {
  items: LightboxItem[];
  variant?: "masonry" | "grid-3";
  aspectClass?: string;
  emptyMessage?: string;
}

export function ImageLightboxGrid({
  items,
  variant = "masonry",
  aspectClass = "h-auto",
  emptyMessage = "No items published yet.",
}: ImageLightboxGridProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-md shadow-sm border border-slate-200 p-12 text-center text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <>
      <div
        className={
          variant === "grid-3"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        }
      >
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item.src)}
            className="break-inside-avoid rounded-md overflow-hidden bg-white border border-slate-200 cursor-pointer group shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
          >
            <div className="relative overflow-hidden bg-slate-100">
              <img
                src={item.src}
                alt={item.title}
                className={`w-full ${aspectClass} object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out`}
                loading="lazy"
              />
              {item.title && (
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-bold tracking-wide text-lg drop-shadow-md">
                    {item.title}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="absolute inset-0 z-0" onClick={() => setSelectedImage(null)} />

          <button
            onClick={() => setSelectedImage(null)}
            aria-label="Close image"
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors p-3 bg-white/10 hover:bg-white/20 rounded-full z-50 backdrop-blur-md cursor-pointer"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative z-10 max-w-6xl w-full max-h-full flex flex-col items-center animate-in zoom-in-95 duration-300">
            <img
              src={selectedImage}
              alt="Zoomed preview"
              className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import type { AlbumPhoto } from "@/lib/types/school";

interface PhotoGalleryClientProps {
  schoolName: string;
  photos: AlbumPhoto[];
}

export function PhotoGalleryClient({ schoolName, photos }: PhotoGalleryClientProps) {
  const [activeYear, setActiveYear] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState<AlbumPhoto | null>(null);

  const years = useMemo(() => {
    const unique = Array.from(new Set(photos.map((p) => p.year).filter(Boolean))).sort((a, b) =>
      b.localeCompare(a)
    );
    return ["All", ...unique];
  }, [photos]);

  const filteredPhotos =
    activeYear === "All" ? photos : photos.filter((photo) => photo.year === activeYear);

  return (
    <>
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-10 bg-dark-surface text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=2000&auto=format&fit=crop"
            alt="Gallery background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-sm font-medium tracking-wide text-slate-300 uppercase">
              Memories &amp; Moments
            </span>
          </div>

          <h1 className="py-2 text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-linear-to-b from-white to-slate-400">
            Photo Gallery
          </h1>

          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-slate-300 font-medium tracking-tight">
            A visual journey through the vibrant life, events, and milestones at {schoolName}.
          </p>
        </div>
      </section>

      {years.length > 1 && (
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-2 md:gap-4 flex-wrap">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                  activeYear === year
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {filteredPhotos.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className={`relative group rounded-md overflow-hidden cursor-pointer bg-slate-200 break-inside-avoid shadow-sm hover:shadow-2xl transition-all duration-500 ${
                  photo.heightClass || "h-80"
                }`}
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8">
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-3 w-max backdrop-blur-md">
                    {photo.year}
                  </span>
                  <h3 className="text-white font-bold text-xl md:text-2xl drop-shadow-md translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {photo.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-md border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-400">
              {photos.length === 0
                ? `Photos for ${schoolName} will be added soon.`
                : `No photos found for ${activeYear}`}
            </h2>
          </div>
        )}
      </section>

      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-200">
          <button
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close photo"
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors p-3 bg-white/10 hover:bg-white/20 rounded-full z-50 backdrop-blur-md cursor-pointer"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative max-w-5xl w-full max-h-full flex flex-col items-center animate-in zoom-in-95 duration-300">
            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.title}
              className="max-w-full max-h-[80vh] object-contain rounded-md shadow-2xl"
            />
            <div className="mt-6 text-center">
              <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-sm font-bold rounded-full mb-3">
                {selectedPhoto.year}
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-white">{selectedPhoto.title}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

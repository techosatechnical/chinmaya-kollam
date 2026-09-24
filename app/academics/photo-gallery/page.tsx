"use client";

import React, { useState } from 'react';
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const photos = [
  { id: 1, url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop', year: '2026', title: 'Annual Sports Meet', height: 'h-80' },
  { id: 2, url: 'https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=800&auto=format&fit=crop', year: '2027', title: 'Cultural Fest', height: 'h-96' },
  { id: 3, url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop', year: '2025', title: 'Science Exhibition', height: 'h-64' },
  { id: 4, url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop', year: '2022', title: 'Graduation Ceremony', height: 'h-72' },
  { id: 5, url: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=800&auto=format&fit=crop', year: '2021', title: 'Republic Day Parade', height: 'h-80' },
  { id: 6, url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop', year: '2024', title: 'Classroom Activities', height: 'h-96' },
  { id: 7, url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop', year: '2023', title: 'Library Inauguration', height: 'h-64' },
  { id: 8, url: 'https://images.unsplash.com/photo-1511949860663-92c5c57d48a7?q=80&w=800&auto=format&fit=crop', year: '2022', title: 'Art & Craft Workshop', height: 'h-72' },
  { id: 9, url: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?q=80&w=800&auto=format&fit=crop', year: '2021', title: 'Teacher\'s Day Celebration', height: 'h-80' },
  { id: 10, url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop', year: '2025', title: 'Inter-school Debate', height: 'h-96' },
  { id: 11, url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop', year: '2024', title: 'Reading Month', height: 'h-64' },
  { id: 12, url: 'https://images.unsplash.com/photo-1473649085228-583485e6e4d7?q=80&w=800&auto=format&fit=crop', year: '2023', title: 'Annual Day', height: 'h-80' },
];

const years = ['All', '2027', '2026', '2025', '2024', '2023', '2022', '2021'];

export default function PhotoGalleryPage() {
  const [activeYear, setActiveYear] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);

  const filteredPhotos = activeYear === 'All'
    ? photos
    : photos.filter(photo => photo.year === activeYear);

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-slate-900 selection:text-white">
      <TopBar />
      <Navbar />

      {/* Header */}
      <section className="relative py-28 bg-[#0B1121] text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        {/* Unsplash Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=2000&auto=format&fit=crop"
            alt="Gallery background"
            className="w-full h-full object-cover"
          />

        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
            <span className="text-sm font-medium tracking-wide text-slate-300 uppercase">Memories & Moments</span>
          </div>

          <h1 className="py-2 text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-linear-to-b from-white to-slate-400">
            Photo Gallery
          </h1>

          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-slate-300 font-medium tracking-tight">
            A visual journey through the vibrant life, events, and milestones at Chinmaya Vidyalaya.
          </p>
        </div>
      </section>

      {/* Filter Tags (Sticky) */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-2 md:gap-4 flex-wrap">
          {years.map(year => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${activeYear === year
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className={`relative group rounded-3xl overflow-hidden cursor-pointer bg-slate-200 break-inside-avoid shadow-sm hover:shadow-2xl transition-all duration-500 ${photo.height}`}
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
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

        {filteredPhotos.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-slate-400">No photos found for {activeYear}</h2>
          </div>
        )}
      </section>

      {/* Lightbox / Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-200">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors p-3 bg-white/10 hover:bg-white/20 rounded-full z-50 backdrop-blur-md"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative max-w-5xl w-full max-h-full flex flex-col items-center animate-in zoom-in-95 duration-300">
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-6 text-center">
              <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-sm font-bold rounded-full mb-3">
                {selectedPhoto.year}
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-white">
                {selectedPhoto.title}
              </h2>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}

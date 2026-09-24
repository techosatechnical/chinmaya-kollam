"use client";

import React, { useState } from 'react';
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const nepItems = [
  { id: 1, category: 'NEP', src: '/image/NEP1.jpeg', alt: 'NEP Activity 1' },
  { id: 2, category: 'NEP', src: '/image/NEP2.jpeg', alt: 'NEP Activity 2' },
  { id: 3, category: 'NEP', src: '/image/NEP3.jpeg', alt: 'NEP Activity 3' },
];

export default function NEPPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-slate-900 selection:text-white">
      <TopBar />
      <Navbar />

      {/* Header */}
      <section className="relative py-28 bg-[#0B1121] text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/image/NEP1.jpeg"
            alt="NEP background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="py-2 text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            National Education Policy
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight drop-shadow-md">
            Innovating the future of education with modern teaching practices.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {nepItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item.src)}
              className="break-inside-avoid rounded-2xl overflow-hidden bg-slate-200 cursor-pointer group shadow-md hover:shadow-xl transition-all duration-500"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full aspect-[4/3] object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox / Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-200">
          {/* Background click to close */}
          <div className="absolute inset-0 z-0" onClick={() => setSelectedImage(null)}></div>

          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors p-3 bg-white/10 hover:bg-white/20 rounded-full z-50 backdrop-blur-md"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative z-10 max-w-6xl w-full max-h-full flex flex-col items-center animate-in zoom-in-95 duration-300">
            <img
              src={selectedImage}
              alt="Zoomed NEP Image"
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}

"use client";

import React, { useState } from 'react';
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const results = [
  { id: 1, src: "/image/acdemic result 1.jpeg", alt: "Academic Result 1" },
  { id: 2, src: "/image/acdemic result 2.png", alt: "Academic Result 2" },
  { id: 3, src: "/image/acdemic result 3.jpeg", alt: "Academic Result 3" }
];

export default function AcademicResultsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-slate-900 selection:text-white">
      <TopBar />
      <Navbar />

      {/* Header */}
      <section className="relative py-28 bg-[#0B1121] text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="py-2 text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            Academic Results
          </h1>

          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight drop-shadow-md">
            Celebrating the outstanding performance and hard work of our brilliant students.
          </p>
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {results.map((result) => (
            <div
              key={result.id}
              onClick={() => setSelectedImage(result.src)}
              className="w-full bg-white p-4 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 hover:-translate-y-2 cursor-pointer transition-all duration-500 flex flex-col justify-center"
            >
              <img
                src={result.src}
                alt={result.alt}
                className="w-full h-auto max-h-150 rounded-2xl object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox / Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-200">
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

          <div className="relative z-10 max-w-5xl w-full max-h-full flex flex-col items-center animate-in zoom-in-95 duration-300">
            <img
              src={selectedImage}
              alt="Zoomed Result"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}

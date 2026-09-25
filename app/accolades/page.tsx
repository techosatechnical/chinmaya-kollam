"use client";

import React, { useState } from 'react';
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const accolades = [
  {
    id: 1,
    title: "Class X and XII 2024-25",
    src: "/accolades/Class X and XII 2024-25.jpeg"
  },
  {
    id: 2,
    title: "Class XII Winners 2020-21",
    src: "/accolades/Class XII winners 2020-21.jpg"
  },
  {
    id: 3,
    title: "Class X 2020-21",
    src: "/accolades/class x 2020-21.jpg"
  },
  {
    id: 4,
    title: "JEE Main Achievers",
    src: "/accolades/jee main.jpeg"
  },
  {
    id: 5,
    title: "Sports Ever-Rolling Trophy",
    src: "/accolades/sports everrolling trophy.jpeg"
  }
];

export default function AccoladesPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-slate-900 selection:text-white">
      <TopBar />
      <Navbar />

      <section className="relative py-28 bg-[#0B1121] text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/accolades/sports everrolling trophy.jpeg"
            alt="Accolades background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

          <h1 className="py-2 text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            Accolades
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight drop-shadow-md">
            Celebrating the extraordinary achievements and milestones of our students.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {accolades.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item.src)}
              className="break-inside-avoid rounded-2xl overflow-hidden bg-white border border-slate-200 cursor-pointer group shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
            >
              <div className="relative overflow-hidden bg-slate-100">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-bold tracking-wide text-lg drop-shadow-md">{item.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox / Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-200">
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
              alt="Zoomed Accolade"
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}

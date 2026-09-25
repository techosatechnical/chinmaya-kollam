"use client";

import React, { useState } from 'react';
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const teacherImages = [
  { id: 1, src: "/image/ai trained teachers.jpeg", title: "AI Trained Teachers Workshop" },
  { id: 2, src: "/image/ai trained teachers2.webp", title: "Educator Training" },
  { id: 3, src: "/image/ai trained teachers3.webp", title: "Interactive AI Sessions" },
];

export default function AiTeachersPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-slate-900 selection:text-white">
      <TopBar />
      <Navbar />

      <section className="relative py-10 bg-[#0B1121] text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/image/ai trained teachers.jpeg"
            alt="AI Trained Teachers background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-slate-700 bg-slate-900/50 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-medium tracking-wide text-white uppercase">Innovation Hub</span>
          </div>

          <h1 className="py-2 text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            AI Trained Teachers
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight drop-shadow-md">
            Our educators are equipped with the latest AI tools to deliver a transformative learning experience.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="bg-white rounded-md shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12 mb-10 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Empowering Educators</h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            We believe that to raise future-ready students, we must first empower our educators. 
            Our teachers undergo rigorous training in AI integration, enabling them to personalize learning, 
            automate administrative tasks, and bring innovative, tech-driven methodologies into the classroom.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teacherImages.map((img) => (
            <div 
              key={img.id} 
              onClick={() => setSelectedImage(img.src)}
              className="rounded-md overflow-hidden bg-white border border-slate-200 cursor-pointer group shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
            >
              <div className="relative overflow-hidden bg-slate-100">
                <img 
                  src={img.src} 
                  alt={img.title}
                  className="w-full aspect-4/3 object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-bold tracking-wide text-lg drop-shadow-md">{img.title}</span>
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
              alt="Zoomed"
              className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}




import React from 'react';
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ChinmayaBlossomsFacilityPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-slate-900 selection:text-white">
      <TopBar />
      <Navbar />

      <section className="relative py-28 bg-[#0B1121] text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/facilities/pre kg.jpg"
            alt="Chinmaya Blossoms background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="py-2 text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            Chinmaya Blossoms (Pre-KG)
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight drop-shadow-md">
            Initiating tiny buds to an atmosphere of fun filled learning.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Joyful Beginnings</h2>
              <p>
                <strong>Chinmaya Blossom…</strong> The play school of the Vidyalaya initiates tiny buds to an atmosphere of fun filled learning.
              </p>
              <p>
                The Kindergarten provides a strong foundation for kids to move further and develop their innate talents and skills. It features specialized play areas and interactive teaching methodologies tailored to early childhood development.
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/facilities/pre kg.jpg" 
                alt="Pre-KG Facility" 
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700" 
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

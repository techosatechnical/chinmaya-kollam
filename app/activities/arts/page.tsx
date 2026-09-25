import React from 'react';
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ArtsCulturePage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-slate-900 selection:text-white">
      <TopBar />
      <Navbar />

      <section className="relative pt-32 pb-10 md:pt-40 md:pb-10 bg-[#0B1121] text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2000&auto=format&fit=crop"
            alt="Arts background"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="py-2 text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            Arts & Culture
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight drop-shadow-md">
            Celebrating creativity, expression, and our rich cultural heritage.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-10">
        <div className="bg-white rounded-md shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">A Canvas of Expression</h2>
              <p>
                The Arts & Culture programs at Chinmaya Vidyalaya provide a vibrant platform for students to express their creativity through painting, classical dance, music, and theatre.
              </p>
              <p>
                By engaging with various art forms, students not only preserve and celebrate traditional heritage but also develop a profound sense of aesthetics, emotional intelligence, and cultural awareness.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop" 
                alt="Dance" 
                className="w-full h-64 object-cover rounded-md shadow-lg hover:scale-105 transition-transform duration-500" 
              />
              <img 
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop" 
                alt="Painting" 
                className="w-full h-64 object-cover rounded-md shadow-lg hover:scale-105 transition-transform duration-500 mt-8" 
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}





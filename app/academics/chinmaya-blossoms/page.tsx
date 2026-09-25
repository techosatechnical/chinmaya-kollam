import React from 'react';
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Image from "next/image";

export default function ChinmayaBlossomsPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-slate-900 selection:text-white">
      <TopBar />
      <Navbar />

      {/* Header */}
      <section className="relative py-10 bg-[#0B1121] text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/image/chinmaya blossom.jpeg"
            alt="Chinmaya Blossoms background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="py-2 text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            Chinmaya Blossoms
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-5xl mx-auto px-6 lg:px-8 py-10">
        <div className="bg-white rounded-md shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12 overflow-hidden">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Initiating Tiny Buds
              </h2>
              <p>
                <strong>Chinmaya Blossom…</strong> The play school of the Vidyalaya initiates tiny buds to an atmosphere of fun-filled learning.
              </p>
              <p>
                The Kindergarten provides a strong foundation for kids to move further and develop their innate talents and skills, preparing them for a bright and successful future.
              </p>
            </div>

            <div className="relative group rounded-md overflow-hidden shadow-2xl">
              <img
                src="/image/chinmaya blossom1.jpeg"
                alt="Chinmaya Blossom Kids"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}




import React from 'react';
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ScoutsGuidesPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-slate-900 selection:text-white">
      <TopBar />
      <Navbar />

      <section className="relative py-28 bg-[#0B1121] text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="https://twss.edu.in/wp-content/uploads/2024/11/Scout-Guides-1.webp"
            alt="Scouts background"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="py-2 text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            Scouts & Guides
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight drop-shadow-md">
            Building character, leadership, and a sense of service to the nation.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1000&auto=format&fit=crop"
                alt="Camping"
                className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500 mb-8"
              />
              <img
                src="https://jsspshsr.com/wp-content/uploads/2022/03/DSCN0059-scaled.jpg"
                alt="Scout activities"
                className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500 mt-8"
              />
            </div>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Be Prepared</h2>
              <p>
                The Scout and Guide unit of the Vidyalaya functions in an exuberant way under the guidance of Smt. Salila and Smt. Shermila.
              </p>
              <p>
                The Rashtrapathy Puraskar winners of the unit are an inspiration for the Vidyalaya students, showcasing the pinnacle of discipline and dedication.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

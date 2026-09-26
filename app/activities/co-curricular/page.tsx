import React from 'react';
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CoCurricularPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-slate-900 selection:text-white">
      <TopBar />
      <Navbar />

      <section className="relative pt-32 pb-10 md:pt-40 md:pb-10 bg-[#0B1121] text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.theasianschool.net/blog/wp-content/uploads/2019/06/Importance-of-Co-Curricular-Activities-in-School.jpg"
            alt="Co-curricular background"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="py-2 text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            Co-curricular Activities
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight drop-shadow-md">
            Fostering creativity, critical thinking, and holistic development.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-10">
        <div className="bg-white rounded-md shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Beyond the Classroom</h2>
              <p>
                At Chinmaya Vidyalaya, we strongly believe that education extends beyond the four walls of a classroom. Our wide array of co-curricular activities ensures that every child discovers their unique talents.
              </p>
              <p>
                From literary clubs and debates to science exhibitions and environmental clubs, we provide platforms for students to explore their interests, build confidence, and develop essential life skills in a supportive environment.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop"
                alt="Debate"
                className="w-full h-64 object-cover rounded-md shadow-lg hover:scale-105 transition-transform duration-500"
              />
              <img
                src="https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=1000&auto=format&fit=crop"
                alt="Science Project"
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





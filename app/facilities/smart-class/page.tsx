import React from 'react';
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function SmartClassPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-slate-900 selection:text-white">
      <TopBar />
      <Navbar />

      <section className="relative pt-32 pb-10 md:pt-40 md:pb-10 bg-[#0B1121] text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/facilities/smart class.jpg"
            alt="Smart Class background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="py-2 text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            Smart Class
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight drop-shadow-md">
            Pioneering digital education for visually appealing and effective learning.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-18">
        <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-md overflow-hidden shadow-2xl">
              <img
                src="/facilities/smart class.jpg"
                alt="Smart Class"
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Interactive Learning</h2>
              <p>
                Smart class - a digital initiative pioneered by Tata Class Edge makes learning visually appealing to the students and thereby enhances their academic performance.
              </p>
              <p>
                Smart class room facilities have been introduced as part of an innovative method of teaching. The programme which enables the use of digital resources in addition to the chalk and talk method of teaching has succeeded in capturing the interest & enthusiasm of students.
              </p>
              <p>
                This multi-sensory learning experience will definitely improve the academic performance of the students and will make learning an enjoyable experience. The Vidyalaya has 7 smart class rooms to enable the students to experience the digital world.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}





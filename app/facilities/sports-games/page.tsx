import React from 'react';
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function SportsGamesPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-slate-900 selection:text-white">
      <TopBar />
      <Navbar />

      <section className="relative pt-32 pb-10 md:pt-40 md:pb-10 bg-[#0B1121] text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/facilities/sportsday.jpg"
            alt="Sports and Games background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="py-2 text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            Sports & Games
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight drop-shadow-md">
            Cultivating physical fitness, teamwork, and competitive spirit.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-10">
        <div className="bg-white rounded-md shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Excellence on the Field</h2>
              <p>
                Our Vidyalaya is dedicated to moulding excellent sports persons. We believe that physical education is a vital part of a student's holistic development, teaching the value of discipline, resilience, and teamwork.
              </p>
              <p>
                With top-tier sports facilities, the Vidyalaya boasts strong football and cricket teams that have marked their presence in inter-school matches. Our expansive grounds and dedicated coaches ensure that every student has the opportunity to shine in their chosen sport.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="/facilities/sports.jfif" 
                alt="Sports activities" 
                className="w-full h-64 object-cover rounded-md shadow-lg hover:scale-105 transition-transform duration-500" 
              />
              <img 
                src="/facilities/sports.jpeg" 
                alt="Games on the field" 
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





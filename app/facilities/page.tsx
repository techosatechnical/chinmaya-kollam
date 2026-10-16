import React from 'react';
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from 'next/link';
import { Library, MonitorPlay, FlaskConical, Baby, Trophy, Sparkles, ArrowRight } from 'lucide-react';

const facilities = [
  {
    title: "Library",
    href: "/facilities/library",
    icon: Library,
    color: "from-blue-500/20 to-cyan-500/5",
    iconColor: "text-blue-500",
    description: "A sanctuary of knowledge updated every academic year to cultivate a lifelong love for reading."
  },
  {
    title: "Smart Class",
    href: "/facilities/smart-class",
    icon: MonitorPlay,
    color: "from-purple-500/20 to-fuchsia-500/5",
    iconColor: "text-purple-500",
    description: "Visually appealing digital classrooms that make learning a multi-sensory and enjoyable experience."
  },
  {
    title: "Labs",
    href: "/facilities/labs",
    icon: FlaskConical,
    color: "from-emerald-500/20 to-teal-500/5",
    iconColor: "text-emerald-500",
    description: "Scientifically advanced laboratories for Physics, Chemistry, Biology, Mathematics, and Computer Science."
  },
  {
    title: "Kindergarten",
    href: "/facilities/kindergarten",
    icon: Baby,
    color: "from-orange-500/20 to-amber-500/5",
    iconColor: "text-orange-500",
    description: "Providing a strong, fun-filled foundation for kids to discover their innate talents and skills."
  },
  {
    title: "Sports & Games",
    href: "/facilities/sports-games",
    icon: Trophy,
    color: "from-red-500/20 to-rose-500/5",
    iconColor: "text-red-500",
    description: "Top-tier facilities and grounds dedicated to physical fitness, teamwork, and competitive sports."
  },
  {
    title: "Chinmaya Blossoms (Pre-KG)",
    href: "/facilities/chinmaya-blossoms",
    icon: Sparkles,
    color: "from-pink-500/20 to-rose-500/5",
    iconColor: "text-pink-500",
    description: "Initiating tiny buds into an atmosphere of joyous learning and early childhood development."
  }
];

export default function FacilitiesLandingPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-slate-900 selection:text-white">
      <TopBar />
      <Navbar />

      <section className="relative pt-32 pb-10 md:pt-40 md:pb-10 bg-[#0B1121] text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/facilities/library.jpg"
            alt="Facilities background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="py-2 text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            Facilities
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight drop-shadow-md">
            World-class infrastructure designed to foster excellence in every student.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <Link key={index} href={facility.href} className="group h-full">
                <div className="bg-white rounded-md p-8 h-full shadow-lg shadow-slate-200/50 border border-slate-200 hover:border-blue-500/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden">
                  <div className={`absolute inset-0 bg-linear-to-br ${facility.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className={`w-16 h-16 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm ${facility.iconColor}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-900 transition-colors">
                      {facility.title}
                    </h3>
                    
                    <p className="text-slate-600 leading-relaxed flex-1">
                      {facility.description}
                    </p>
                    
                    <div className="mt-6 flex items-center text-sm font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                      Explore 
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}





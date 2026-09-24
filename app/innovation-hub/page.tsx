import React from 'react';
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from 'next/link';
import { Microchip, GraduationCap, Lightbulb, ArrowRight, Bot } from 'lucide-react';

const innovationHubItems = [
  {
    title: "CSRS",
    href: "/innovation-hub/csrs",
    icon: Lightbulb,
    color: "from-blue-500/20 to-cyan-500/5",
    iconColor: "text-blue-500",
    description: "Chinmaya Social Responsibility Scheme initiatives and programs.",
    bgImage: "/image/NEP1.jpeg" // generic background placeholder
  },
  {
    title: "AI And Robotics Classes",
    href: "/innovation-hub/ai-robotics",
    icon: Bot,
    color: "from-purple-500/20 to-fuchsia-500/5",
    iconColor: "text-purple-500",
    description: "Empowering students with cutting-edge skills in Artificial Intelligence and Robotics.",
    bgImage: "/image/AI and robotics.jpeg"
  },
  {
    title: "AI Trained Teachers",
    href: "/innovation-hub/ai-teachers",
    icon: GraduationCap,
    color: "from-emerald-500/20 to-teal-500/5",
    iconColor: "text-emerald-500",
    description: "Educators equipped with the latest AI tools for a transformative learning experience.",
    bgImage: "/image/ai trained teachers.jpeg"
  }
];

export default function InnovationHubLandingPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-slate-900 selection:text-white">
      <TopBar />
      <Navbar />

      <section className="relative py-28 bg-[#0B1121] text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/image/AI and robotics.jpeg"
            alt="Innovation Hub background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="py-2 text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            Innovation Hub
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight drop-shadow-md">
            Pioneering the future of education with modern technology and socially responsible initiatives.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {innovationHubItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link key={index} href={item.href} className="group h-full">
                <div className="bg-white rounded-3xl p-8 h-full shadow-lg shadow-slate-200/50 border border-slate-200 hover:border-blue-500/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className={`w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm ${item.iconColor}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-900 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-slate-600 leading-relaxed flex-1">
                      {item.description}
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

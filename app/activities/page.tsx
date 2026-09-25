import React from 'react';
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from 'next/link';
import { Trophy, Map, Sparkles, Target, Palette, ArrowRight } from 'lucide-react';

const activities = [
  {
    title: "Sports Team",
    href: "/activities/sports",
    icon: Trophy,
    color: "from-orange-500/20 to-amber-500/5",
    iconColor: "text-orange-500",
    description: "Moulding excellent sportspersons through dedication and teamwork in football, cricket, and athletics."
  },
  {
    title: "Scouts & Guides",
    href: "/activities/scouts",
    icon: Map,
    color: "from-emerald-500/20 to-teal-500/5",
    iconColor: "text-emerald-500",
    description: "Building character, leadership, and a sense of service to the nation through our vibrant Scout and Guide unit."
  },
  {
    title: "Co-curricular Activities",
    href: "/activities/co-curricular",
    icon: Sparkles,
    color: "from-blue-500/20 to-cyan-500/5",
    iconColor: "text-blue-500",
    description: "Fostering creativity, critical thinking, and holistic development beyond the four walls of a classroom."
  },
  {
    title: "Karate & Chess",
    href: "/activities/karate-chess",
    icon: Target,
    color: "from-red-500/20 to-rose-500/5",
    iconColor: "text-red-500",
    description: "Mastering the mind and the body through focus, discipline, and strategic thinking."
  },
  {
    title: "Arts & Culture",
    href: "/activities/arts",
    icon: Palette,
    color: "from-purple-500/20 to-fuchsia-500/5",
    iconColor: "text-purple-500",
    description: "Celebrating creativity, expression, and our rich cultural heritage through painting, dance, and music."
  }
];

export default function ActivitiesLandingPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-slate-900 selection:text-white">
      <TopBar />
      <Navbar />

      <section className="relative pt-32 pb-10 md:pt-40 md:pb-10 bg-[#0B1121] text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=2000&auto=format&fit=crop"
            alt="Activities background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="py-2 text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            Activities
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight drop-shadow-md">
            Discover a world of opportunities beyond academics.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <Link key={index} href={activity.href} className="group h-full">
                <div className="bg-white rounded-md p-8 h-full shadow-lg shadow-slate-200/50 border border-slate-200 hover:border-blue-500/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className={`w-16 h-16 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm ${activity.iconColor}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-900 transition-colors">
                      {activity.title}
                    </h3>
                    
                    <p className="text-slate-600 leading-relaxed flex-1">
                      {activity.description}
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





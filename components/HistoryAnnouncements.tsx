"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bell, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import WarpText from "./WarpText";

const announcements = [
  {
    id: 1,
    title: "ENVIRONMENT DAY",
    date: "June 5, 2026",
    color: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-50 text-emerald-600"
  },
  {
    id: 2,
    title: "Class XII Result 2026",
    date: "May 23, 2026",
    color: "from-blue-400 to-indigo-500",
    bg: "bg-blue-50 text-blue-600"
  },
  {
    id: 3,
    title: "Class X Result 2026",
    date: "April 16, 2026",
    color: "from-purple-400 to-fuchsia-500",
    bg: "bg-purple-50 text-purple-600"
  },
  {
    id: 4,
    title: "Annual Sports Meet",
    date: "March 10, 2026",
    color: "from-orange-400 to-rose-500",
    bg: "bg-orange-50 text-orange-600"
  }
];

export function HistoryAnnouncements() {
  return (
    <section className="py-12 bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-linear-to-br from-blue-200/20 to-purple-200/20 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-linear-to-tr from-emerald-200/20 to-teal-200/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">

          {/* Left Side: History */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
                variants={{
                  hidden: { opacity: 1 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
                }}
                className="text-4xl md:text-5xl font-extrabold text-slate-900 flex flex-wrap items-center gap-x-2 tracking-tight mb-6"
              >
                <motion.span variants={{ hidden: { opacity: 0, filter: "blur(12px)", y: 15 }, visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.4, ease: "easeOut" } } }}>
                  Origin
                </motion.span>
                <motion.span variants={{ hidden: { opacity: 0, filter: "blur(12px)", y: 15 }, visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.4, ease: "easeOut" } } }}>
                  &
                </motion.span>
                <motion.span
                  variants={{ hidden: { opacity: 0, filter: "blur(12px)", y: 15 }, visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.4, ease: "easeOut" } } }}
                  className="text-[#385EEC] relative inline-block"
                >
                  History
                  <svg className="absolute w-full h-auto -bottom-2 left-0 text-[#385EEC]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 7" fill="none"><path d="M2 3.5 Q30 1 60 3.8 T120 3.2 T180 4 T240 3.3 T300 4.2 T348 3.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>
                </motion.span>
              </motion.h2>
              <div className="w-20 h-1.5 bg-linear-to-r from-[#385EEC] to-blue-400 rounded-full mb-8" />

              <div className="relative w-full h-64 sm:h-80 mb-10 rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src="/image/school.jpeg"
                  alt="Chinmaya Vidyalaya School Campus"
                  fill
                  className="object-cover scale-[1.6] group-hover:scale-[1.65] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              </div>

              <div className="prose prose-lg prose-slate text-slate-600 space-y-6 leading-relaxed">
                <p>
                  <strong className="text-slate-800 font-bold">CHINMAYA VIDYALAYA, CHANDANATHOPE, KOLLAM</strong> the temple of learning, located in the serene lap of nature, golden sunrises and crimson sunsets welcome flock of birds to the Vidyalaya campus to add mesmerizing sights and sounds. It is greenery all around, creating a conducive learning atmosphere.
                </p>
                <p>
                  The education imparted in the Vidyalaya fulfills Pujya Gurudev Swami Chinmayananda's Vision of Education. It enables all Chinmaya kids to bloom with bright hues and spread the fragrance. The presence of Chinmaya Mission Acharya and the Ashram give the Vidyalaya a spiritual ambience. The holy shrine of the Lord Ganesha gives the Vidyalaya a peaceful environment. Chinmaya Blossom, the play school is a feather in the cap of the Vidyalaya. The school is affiliated upto classes XII.
                </p>
              </div>

              <div className="mt-10">
                <Link
                  href="/about/beginning"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#004B87] text-white font-bold text-sm uppercase tracking-wide hover:bg-[#003666] transition-all duration-300 shadow-lg shadow-[#004B87]/30 group"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Announcements */}
          <div className="lg:col-span-5 h-120 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-full flex flex-col"
            >
              <div className="flex items-center justify-between mb-8 px-2">
                <h3 className="text-3xl md:text-4xl font-black flex items-center gap-4 tracking-tight drop-shadow-sm pb-1 uppercase w-full">
                  <span className="relative flex h-4 w-4 shrink-0 mt-0.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6A00] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[#FF6A00]"></span>
                  </span>
                  <div className="flex-1 h-15 relative -mt-1">
                    <WarpText
                      text="ANNOUNCEMENTS"
                      color="#004B87"
                      warpStrength={0.08}
                      warpScale={1.7}
                      speed={0.55}
                      pointerInfluence={0.42}
                      pointerStrength={0.38}
                      refraction={0.018}
                      ripple
                      fontSize="2.25rem"
                      fontWeight={900}
                      style={{ height: '100%', width: '100%' }}
                    />
                  </div>
                </h3>
              </div>

              {/* Glassmorphic Container */}
              <div className="flex-1 relative overflow-hidden rounded-4xl bg-slate-200/30 backdrop-blur-xl border border-white p-4 shadow-xl shadow-slate-200/50">
                {/* Top/Bottom Fading Gradients */}
                <div className="absolute top-0 left-0 w-full h-12 bg-linear-to-b from-slate-100/90 to-transparent z-10 pointer-events-none rounded-t-4xl" />
                <div className="absolute bottom-0 left-0 w-full h-16 bg-linear-to-t from-slate-100/90 to-transparent z-10 pointer-events-none rounded-b-4xl" />

                {/* Scroll track */}
                <div className="flex flex-col animate-[scrollUp_25s_linear_infinite] hover:[animation-play-state:paused] pt-4">
                  {[...announcements, ...announcements].map((announcement, index) => {
                    // Extract month and day from "June 5, 2026"
                    const parts = announcement.date.split(" ");
                    const month = parts[0]?.substring(0, 3);
                    const day = parts[1]?.replace(",", "");

                    return (
                      <Link
                        href="/announcements"
                        key={`${announcement.id}-${index}`}
                        className="group flex items-center gap-5 p-5 mb-4 bg-white/90 backdrop-blur-sm rounded-2xl border border-white shadow-[0_4px_15px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_25px_rgb(56,94,236,0.12)] hover:-translate-y-1 hover:border-blue-100 transition-all duration-300"
                      >
                        {/* Date Badge */}
                        <div className="flex flex-col items-center justify-center min-w-16.25 h-16.25 rounded-2xl bg-blue-50 text-[#004B87] group-hover:bg-[#004B87] group-hover:text-white transition-colors shrink-0 shadow-inner">
                          <span className="text-[11px] font-bold uppercase tracking-widest">{month}</span>
                          <span className="text-2xl font-black leading-none mt-0.5">{day}</span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 pr-2">
                          <h4 className="text-[15px] font-bold text-slate-800 group-hover:text-[#385EEC] transition-colors leading-snug line-clamp-2">
                            {announcement.title}
                          </h4>
                          <span className="text-[11px] font-bold text-slate-400 group-hover:text-[#FF6A00] uppercase tracking-wider flex items-center gap-1 mt-2.5 transition-colors">
                            Read More <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Internal styling for keyframes */}
              <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scrollUp {
                  0% { transform: translateY(0); }
                  100% { transform: translateY(-50%); }
                }
                @keyframes gradient {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
              `}} />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { CalendarDays, Award, Users, Activity, Megaphone, Compass, Trophy, Music } from "lucide-react";
import Link from "next/link";
import CursorGrid from "./CursorGrid";

const categories = [
  { icon: CalendarDays, title: "Academic Planner", href: "/academics/academic-planner" },
  { icon: Award, title: "Academic Results", href: "/academics/academic-results" },
  { icon: Users, title: "Mentors", href: "/academics/mentors" },
  { icon: Activity, title: "Co Curricular Activities", href: "/activities/co-curricular" },
  { icon: Megaphone, title: "Student Council", href: "/academics/student-council" },
  { icon: Compass, title: "Scouts & Guides", href: "/activities/scouts" },
  { icon: Trophy, title: "Sports", href: "/activities/sports" },
  { icon: Music, title: "Arts & Culture", href: "/activities/arts" },
];

export function Categories() {
  return (
    <section className="py-8 bg-white relative overflow-hidden">
      {/* Background Cursor Grid */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-auto">
        <CursorGrid
          cellSize={70}
          color="#385EEC"
          radius={140}
          falloff="smooth"
          holdTime={400}
          fadeDuration={800}
          lineWidth={1.2}
          maxOpacity={0.4}
          fillOpacity={0.1}
          gridOpacity={0}
          cellRadius={0}
          clickPulse
          pulseSpeed={600}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pointer-events-none">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          variants={{
            hidden: { opacity: 1 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
          }}
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, filter: "blur(10px)", y: 15 },
              visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.4, ease: "easeOut" } }
            }}
            className="text-primary font-semibold tracking-wider uppercase mb-2 block"
          >
            New List
          </motion.span>
          <motion.h2
            variants={{
              hidden: { opacity: 1 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
            }}
            className="text-3xl md:text-4xl font-bold text-black flex flex-wrap justify-center items-center gap-x-2"
          >
            <motion.span variants={{ hidden: { opacity: 0, filter: "blur(12px)", y: 15 }, visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.4, ease: "easeOut" } } }}>
              Academic
            </motion.span>
            <motion.span variants={{ hidden: { opacity: 0, filter: "blur(12px)", y: 15 }, visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.4, ease: "easeOut" } } }}>
              Overview
            </motion.span>
            <motion.span variants={{ hidden: { opacity: 0, filter: "blur(12px)", y: 15 }, visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.4, ease: "easeOut" } } }}>
              &
            </motion.span>
            <motion.span
              variants={{ hidden: { opacity: 0, filter: "blur(12px)", y: 15 }, visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.4, ease: "easeOut" } } }}
              className="text-secondary relative inline-block"
            >
              Activities
              <svg className="absolute w-full h-auto -bottom-2 left-0 text-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 7" fill="none"><path d="M2 3.5 Q30 1 60 3.8 T120 3.2 T180 4 T240 3.3 T300 4.2 T348 3.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>
            </motion.span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 pointer-events-none">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="pointer-events-auto"
            >
              <div className="relative group overflow-hidden rounded-md p-[1.5px] transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-1 bg-slate-100 hover:bg-transparent">
                {/* Animated Border (visible on hover) */}
                <div className="absolute inset-[-150%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_120deg,#FF6A00_180deg,transparent_180deg_300deg,#385EEC_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Inner Card Content */}
                <Link href={category.href} className="relative z-10 flex items-center p-6 bg-linear-to-br from-white to-slate-50/90 rounded-md h-full w-full">
                  <div className="w-14 h-14 shrink-0 bg-linear-to-br from-blue-50 to-indigo-50/80 rounded-md flex items-center justify-center text-primary group-hover:bg-linear-to-br group-hover:from-[#004B87] group-hover:to-[#385EEC] group-hover:text-white group-hover:shadow-md transition-all duration-300 mr-5">
                    <category.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-slate-800 group-hover:text-[#004B87] transition-colors">{category.title}</h3>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}




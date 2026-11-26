"use client";

import { motion } from "framer-motion";
import { Shield, Star } from "lucide-react";
import WarpText from "@/components/WarpText";
import Image from "next/image";
import type { PersonItem } from "@/lib/types/school";

const featuredColors = [
  "from-accent to-orange-400",
  "from-navy-surface to-primary",
];

const accentColors = [
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-purple-500 to-violet-500",
  "from-rose-500 to-pink-500",
  "from-amber-500 to-yellow-400",
  "from-indigo-500 to-blue-500",
  "from-teal-500 to-emerald-400",
  "from-fuchsia-500 to-purple-500",
  "from-orange-500 to-red-400",
];

interface ManagementClientProps {
  schoolName: string;
  campusLabel: string;
  navyColor: string;
  featured: PersonItem[];
  members: PersonItem[];
}

export function ManagementClient({
  schoolName,
  campusLabel,
  navyColor,
  featured,
  members,
}: ManagementClientProps) {
  return (
    <>
      <section className="relative bg-slate-50 pt-32 lg:pt-40 pb-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse at 50% 0%, black 40%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, black 40%, transparent 80%)",
          }}
        />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-2 text-center"
          >
            {campusLabel}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative h-28 md:h-44"
          >
            <WarpText
              text="MANAGEMENT"
              color={navyColor}
              warpStrength={0.05}
              warpScale={1.4}
              speed={0.35}
              fontSize="clamp(2.8rem, 10vw, 7.5rem)"
              fontWeight={900}
              align="center"
              className="w-full h-full"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-slate-500 text-lg font-light text-center max-w-xl mx-auto pb-10"
          >
            The dedicated team guiding {schoolName} with vision, wisdom, and purpose.
          </motion.p>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="bg-white py-10 relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <div className="flex flex-col gap-10 md:gap-12">
              {featured.map((person, i) => {
                const isEven = i % 2 === 0;
                const Icon = i === 0 ? Shield : Star;
                const colorClass = featuredColors[i % featuredColors.length]!;
                return (
                  <motion.div
                    key={person.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="group flex flex-col md:flex-row bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/40 border border-slate-100 hover:shadow-orange-100/50 transition-shadow duration-500"
                  >
                    <div className={`relative h-72 md:h-auto md:w-5/12 overflow-hidden ${isEven ? "order-1" : "order-1 md:order-2"}`}>
                      {person.image ? (
                        <Image
                          src={person.image}
                          alt={person.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 42vw"
                          className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      ) : (
                        <div className={`absolute inset-0 bg-linear-to-br ${colorClass} flex items-center justify-center`}>
                          <span className="text-white font-black text-6xl opacity-50">
                            {person.initials || person.name.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                    </div>

                    <div className={`p-8 md:p-10 flex flex-col justify-center md:w-7/12 relative ${isEven ? "order-2" : "order-2 md:order-1"}`}>
                      <Icon className="absolute right-6 bottom-6 w-32 h-32 opacity-[0.02] -rotate-12 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />

                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r ${colorClass} text-white text-[10px] font-black uppercase tracking-[0.25em] mb-4 shadow-md w-fit`}>
                        <Icon className="w-3.5 h-3.5" />
                        {person.role}
                      </div>

                      <h3 className="text-2xl md:text-4xl font-black text-slate-800 leading-tight mb-4">
                        {person.name}
                      </h3>

                      {person.bio && (
                        <p className="text-slate-500 leading-relaxed text-base max-w-lg">
                          {person.bio}
                        </p>
                      )}

                      <div className={`mt-8 w-12 h-1.5 rounded-full bg-linear-to-r ${colorClass}`} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {members.length > 0 && (
        <section className="bg-slate-50 py-10 pb-12 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse at center, black 40%, transparent 90%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 90%)",
            }}
          />

          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-px flex-1 bg-linear-to-r from-transparent to-slate-300" />
              <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em]">
                Board Members
              </p>
              <div className="h-px flex-1 bg-linear-to-l from-transparent to-slate-300" />
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {members.map((member, i) => {
                const gradient = accentColors[i % accentColors.length]!;
                return (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.55, delay: i * 0.07 }}
                    className="group bg-white rounded-md p-6 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-lg transition-all duration-400 hover:-translate-y-0.5 flex items-center gap-5 overflow-hidden relative"
                  >
                    <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-linear-to-b ${gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

                    <div className={`shrink-0 w-16 h-16 rounded-full bg-linear-to-br ${gradient} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 overflow-hidden relative border border-slate-100`}>
                      {member.image ? (
                        <Image src={member.image} alt={member.name} fill sizes="64px" className="object-cover" />
                      ) : (
                        <span className="text-white font-black text-base">
                          {member.initials || member.name.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className={`text-[10px] font-black uppercase tracking-widest mb-1 bg-linear-to-r ${gradient} bg-clip-text text-transparent`}>
                        {member.role}
                      </p>
                      <h4 className="font-bold text-slate-800 leading-snug text-sm">{member.name}</h4>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

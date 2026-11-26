"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import {
  BookOpen,
  GraduationCap,
  Library,
  Shapes,
  Layers,
  BookMarked,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import WarpText from "@/components/WarpText";

const ICON_MAP: Record<string, LucideIcon> = {
  Shapes,
  Library,
  Layers,
  BookMarked,
  GraduationCap,
};

export interface AcademicStage {
  id: string;
  name: string;
  age: string;
  desc: string;
  iconName: string;
  color: string;
  bg: string;
  border: string;
}

export interface AcademicsData {
  curriculumTitle?: string;
  curriculumBody?: string;
  affiliationRegNo?: string;
  curriculumImage?: string;
  stagesSubtitle?: string;
  stages?: AcademicStage[];
  fillerImage?: string;
  fillerText?: string;
}

interface AcademicsClientProps {
  schoolName: string;
  heroImage: string;
  data: AcademicsData;
}

export function AcademicsClient({ schoolName, heroImage, data }: AcademicsClientProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const op = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const stages = data.stages ?? [];

  return (
    <>
      <section ref={ref} className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-navy-surface">
        <motion.div className="absolute inset-0" style={{ y: imgY }}>
          <Image src={heroImage} alt={`${schoolName} Academics`} fill sizes="100vw" priority className="object-cover" />
        </motion.div>
        <motion.div style={{ y: textY, opacity: op }} className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="relative h-32 md:h-48 mb-4"
          >
            <WarpText
              text="ACADEMICS"
              color="#ffffff"
              warpStrength={0.05}
              warpScale={1.4}
              speed={0.35}
              fontSize="clamp(3rem, 11vw, 8.5rem)"
              fontWeight={900}
              align="center"
              className="w-full h-full drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </section>

      <section className="bg-slate-50 py-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-100 blur-[100px] opacity-40 translate-x-1/2 -translate-y-1/2" />

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-black uppercase tracking-[0.2em] mb-6">
                  <BookOpen className="w-4 h-4" />
                  The Curriculum
                </div>
                <h2 className="text-2xl md:text-4xl font-black text-slate-800 leading-tight mb-5">
                  {data.curriculumTitle || "Central Board of Secondary Education"}
                </h2>
                <p className="text-slate-500 text-base leading-relaxed mb-6">
                  {data.curriculumBody ||
                    `Academic programmes at ${schoolName} emphasize both academic rigor and holistic evaluation.`}
                </p>

                {data.affiliationRegNo && (
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-md border border-slate-200 w-fit">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                        Affiliation
                      </p>
                      <p className="text-slate-800 font-bold text-lg">{data.affiliationRegNo}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {data.curriculumImage && (
              <div className="md:w-1/2 w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="relative h-64 md:h-72 w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/20"
                >
                  <Image
                    src={data.curriculumImage}
                    alt="Academics"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </section>

      {stages.length > 0 && (
        <section className="bg-white py-8 pb-32 relative overflow-hidden border-t border-slate-100">
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage: "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage: "radial-gradient(ellipse at top, black 30%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse at top, black 30%, transparent 80%)",
            }}
          />

          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
                Educational Stages
              </h2>
              {data.stagesSubtitle && (
                <p className="text-slate-500 text-lg max-w-2xl mx-auto">{data.stagesSubtitle}</p>
              )}
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stages.map((section, i) => {
                const Icon = ICON_MAP[section.iconName] ?? BookOpen;
                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className={`group relative bg-white rounded-md p-8 border ${section.border} shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden`}
                  >
                    <div
                      className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${section.color} opacity-0 group-hover:opacity-5 blur-2xl transition-opacity duration-500 rounded-full translate-x-1/2 -translate-y-1/2`}
                    />

                    <div
                      className={`w-14 h-14 rounded-md ${section.bg} border ${section.border} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500`}
                    >
                      <Icon className="w-7 h-7 text-slate-700" />
                    </div>

                    <div className="mb-2">
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest bg-linear-to-r ${section.color} bg-clip-text text-transparent`}
                      >
                        {section.age}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-slate-800 mb-3">{section.name}</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">{section.desc}</p>
                  </motion.div>
                );
              })}

              {data.fillerImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="hidden lg:flex rounded-md bg-slate-900 overflow-hidden relative"
                >
                  <Image
                    src={data.fillerImage}
                    alt="Classroom"
                    fill
                    sizes="(max-width: 1200px) 33vw, 384px"
                    className="object-cover transition-opacity duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-1">
                      Our Promise
                    </p>
                    <p className="text-white font-bold text-lg leading-tight">
                      {data.fillerText || "Excellence in every step of the journey."}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

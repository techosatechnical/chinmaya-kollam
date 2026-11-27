"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import WarpText from "./WarpText";
import type { AnnouncementItem, SchoolConfig } from "@/lib/types/school";

interface HistoryAnnouncementsProps {
  history: SchoolConfig["historySummary"];
  announcements: AnnouncementItem[];
  brandBlueColor?: string;
}

export function HistoryAnnouncements({
  history,
  announcements,
  brandBlueColor = "#004B87",
}: HistoryAnnouncementsProps) {
  const boardItems = announcements.filter((a) => a.kind === "board");

  if (!history.enabled && boardItems.length === 0) return null;

  return (
    <section className="py-12 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-linear-to-br from-blue-200/20 to-purple-200/20 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-linear-to-tr from-emerald-200/20 to-teal-200/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          {/* Left Side: History */}
          {history.enabled && (
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
                    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                  }}
                  className="text-4xl md:text-5xl font-extrabold text-slate-900 flex flex-wrap items-center gap-x-2 tracking-tight mb-6"
                >
                  <motion.span variants={{ hidden: { opacity: 0, filter: "blur(12px)", y: 15 }, visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.4, ease: "easeOut" } } }}>
                    Origin
                  </motion.span>
                  <motion.span variants={{ hidden: { opacity: 0, filter: "blur(12px)", y: 15 }, visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.4, ease: "easeOut" } } }}>
                    &amp;
                  </motion.span>
                  <motion.span
                    variants={{ hidden: { opacity: 0, filter: "blur(12px)", y: 15 }, visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.4, ease: "easeOut" } } }}
                    className="text-accent-alt relative inline-block"
                  >
                    History
                    <svg className="absolute w-full h-auto -bottom-2 left-0 text-accent-alt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 7" fill="none">
                      <path d="M2 3.5 Q30 1 60 3.8 T120 3.2 T180 4 T240 3.3 T300 4.2 T348 3.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </motion.span>
                </motion.h2>
                <div className="w-20 h-1.5 bg-linear-to-r from-accent-alt to-blue-400 rounded-full mb-8" />

                <div className="relative w-full h-64 sm:h-80 mb-10 rounded-md overflow-hidden shadow-2xl group">
                  <Image
                    src={history.image}
                    alt={history.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover scale-[1.6] group-hover:scale-[1.65] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                </div>

                <div className="prose prose-lg prose-slate text-slate-600 space-y-6 leading-relaxed">
                  {history.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                <div className="mt-10">
                  <Link
                    href={history.ctaHref}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-blue text-white font-bold text-sm uppercase tracking-wide hover:bg-primary transition-all duration-300 shadow-lg shadow-brand-blue/30 group"
                  >
                    {history.ctaText}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>
          )}

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
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-accent"></span>
                  </span>
                  <div className="flex-1 h-15 relative -mt-1">
                    <WarpText
                      text="ANNOUNCEMENTS"
                      color={brandBlueColor}
                      warpStrength={0.08}
                      warpScale={1.7}
                      speed={0.55}
                      pointerInfluence={0.42}
                      pointerStrength={0.38}
                      refraction={0.018}
                      ripple
                      fontSize="2.25rem"
                      fontWeight={900}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
                </h3>
              </div>

              <div className="flex-1 relative overflow-hidden rounded-4xl bg-slate-200/30 backdrop-blur-xl border border-white p-4 shadow-xl shadow-slate-200/50">
                <div className="absolute top-0 left-0 w-full h-12 bg-linear-to-b from-slate-100/90 to-transparent z-10 pointer-events-none rounded-t-4xl" />
                <div className="absolute bottom-0 left-0 w-full h-16 bg-linear-to-t from-slate-100/90 to-transparent z-10 pointer-events-none rounded-b-4xl" />

                {boardItems.length > 0 ? (
                  <div
                    className={`flex flex-col pt-4 ${
                      boardItems.length >= 4
                        ? "animate-[scrollUp_25s_linear_infinite] hover:[animation-play-state:paused]"
                        : ""
                    }`}
                  >
                    {(boardItems.length >= 4 ? [...boardItems, ...boardItems] : boardItems).map(
                      (announcement, index) => {
                        const parts = (announcement.dateLabel || "").split(" ");
                        const month = parts[0]?.substring(0, 3) || "NEW";
                        const day = parts[1]?.replace(",", "") || "•";

                        return (
                          <div
                            key={`${announcement.id}-${index}`}
                            className="group flex items-center gap-5 p-5 mb-4 bg-white/90 backdrop-blur-sm rounded-md border border-white shadow-[0_4px_15px_rgb(0,0,0,0.02)] transition-all duration-300"
                          >
                            <div className="flex flex-col items-center justify-center min-w-16.25 h-16.25 rounded-md bg-blue-50 text-brand-blue shrink-0 shadow-inner">
                              <span className="text-[11px] font-bold uppercase tracking-widest">
                                {month}
                              </span>
                              <span className="text-2xl font-black leading-none mt-0.5">{day}</span>
                            </div>

                            <div className="flex-1 pr-2">
                              <h4 className="text-[15px] font-bold text-slate-800 leading-snug line-clamp-2">
                                {announcement.title}
                              </h4>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-500 text-sm font-medium">
                    No announcements at this time.
                  </div>
                )}
              </div>

              <style
                dangerouslySetInnerHTML={{
                  __html: `
                @keyframes scrollUp {
                  0% { transform: translateY(0); }
                  100% { transform: translateY(-50%); }
                }
              `,
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MapPin, Trophy, GraduationCap, Church, TreePine, Flame } from "lucide-react";
import WarpText from "@/components/WarpText";

/* ─── DATA ─────────────────────────────────────────────────── */
const chapters = [
  {
    year: "1985",
    label: "The Founding",
    date: "23 October · Vijayadesami Day",
    headline: "A Dream Takes Root",
    body: "The 23rd of October 1985 marked the fulfillment of a long-cherished dream of the people of Kollam. The Chinmaya Mission began a Nursery School in space graciously offered by the Mahila Samajam — the seed of something extraordinary.",
    accent: "#FF6A00",
    milestone: true,
  },
  {
    year: "1988",
    label: "Expansion",
    date: "Three Years Later",
    headline: "Growing Beyond Walls",
    body: "The school outgrew its first home and moved to a larger building in Manayilkulangara. Classes expanded up to Std VII — a sign of the community's growing faith.",
    accent: "#3B82F6",
    milestone: false,
  },
  {
    year: "1996",
    label: "A New Home",
    date: "The Permanent Address",
    headline: "3 Acres at Chandanathope",
    body: "The Regional Trust purchased 3 acres of land at Kuzhiyam South, Chandanathope. A shed was built and classes began — laying the foundation of the Vidyalaya's eternal home.",
    accent: "#10B981",
    milestone: false,
  },
  {
    year: "2000",
    label: "Consolidation",
    date: "United at Last",
    headline: "One School, One Mission",
    body: "Two streams — one from the Mahila Samajam building and one from Chandanathope — merged into a single, unified institution. The Vidyalaya was whole.",
    accent: "#8B5CF6",
    milestone: false,
  },
  {
    year: "2001",
    label: "Milestone Year",
    date: "A Year of Firsts",
    headline: "Permanent Home & Flying Colors",
    body: "Sri K. Ravindranathan Nair led the construction of the permanent building. The inaugural SSLC batch excelled brilliantly. The school won 1st prize for 'Best Bharat Nata' and 2nd for 'Best School' (UP Section) in Republic Day Celebrations.",
    accent: "#FF6A00",
    milestone: true,
  },
];


function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const op = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className="relative h-[45vh] flex items-center justify-center overflow-hidden bg-[#02133a]">

      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <Image src="/image/about2.webp" alt="Campus" fill sizes="100vw" priority className="object-cover opacity-70" />
      </motion.div>


      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

    </section>
  );
}


function OriginHeading() {
  return (
    <section className="bg-white pt-14 pb-2">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative h-28 md:h-44"
        >
          <WarpText
            text="ORIGIN"
            color="#02133a"
            warpStrength={0.055}
            warpScale={1.5}
            speed={0.35}
            fontSize="clamp(3.5rem, 12vw, 9rem)"
            fontWeight={900}
            align="center"
            className="w-full h-full"
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-slate-500 text-lg md:text-xl font-light max-w-2xl leading-relaxed mt-2 pb-10"
        >
          From a single borrowed classroom in 1985 to a full CBSE campus —
          four decades of faith, community, and transformation.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── INTRO QUOTE ────────────────────────────────────────────── */
function QuoteIntro() {
  return (
    <section className="bg-white py-8 relative overflow-hidden border-y border-slate-100">
      {/* Giant decorative year */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[22rem] font-black text-slate-100 leading-none select-none pointer-events-none pr-8 hidden lg:block">
        1985
      </div>

      {/* Subtle gradient blob */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-orange-50 blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-md bg-[#FF6A00] flex items-center justify-center shadow-lg shadow-orange-200">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-[#FF6A00]/40 to-transparent" />
            <span className="text-[#FF6A00] text-xs font-black uppercase tracking-[0.3em]">23 Oct 1985</span>
          </div>

          <blockquote className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-800 leading-tight mb-10">
            "The fulfillment of a long-cherished dream of the people of{" "}
            <span className="text-[#FF6A00]">Kollam.</span>"
          </blockquote>

          <p className="text-slate-500 text-lg leading-relaxed max-w-2xl">
            On Vijayadesami Day, the Chinmaya Mission planted its first seed — a
            small nursery school in borrowed space at the Mahila Samajam. What
            began as a single class would grow into one of Kollam's most beloved
            institutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── TIMELINE ───────────────────────────────────────────────── */
function Timeline() {
  return (
    <section className="bg-slate-50 py-8 lg:py-36 relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 50%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 50%, transparent 90%)",
        }}
      />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 flex items-end justify-between"
        >
          <div>
            <p className="text-[#FF6A00] text-xs font-black uppercase tracking-[0.3em] mb-2">The Journey</p>
            <h2 className="text-4xl md:text-6xl font-black text-slate-800 leading-none">
              Four Decades.<br />
              <span className="text-slate-300">One Mission.</span>
            </h2>
          </div>
          <div className="hidden md:flex flex-col items-end gap-1">
            <div className="w-24 h-px bg-slate-300" />
            <div className="w-16 h-px bg-slate-200" />
          </div>
        </motion.div>

        {/* Timeline entries */}
        <div className="space-y-6">
          {chapters.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group relative"
            >
              {/* Giant ghost year */}
              <div
                className="absolute -left-4 top-1/2 -translate-y-1/2 text-[8rem] lg:text-[11rem] font-black leading-none select-none pointer-events-none transition-opacity duration-500 opacity-[0.07] group-hover:opacity-[0.14]"
                style={{ color: c.accent }}
              >
                {c.year}
              </div>

              {/* Card */}
              <div className={`relative ml-0 md:ml-32 lg:ml-48 rounded-md border transition-all duration-500 overflow-hidden bg-white
                ${c.milestone
                  ? "border-orange-200 shadow-lg shadow-orange-100"
                  : "border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300"
                }`}
              >
                {/* Top accent bar */}
                <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${c.accent}, transparent)` }} />

                <div className="p-7 md:p-9">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Left meta */}
                    <div className="md:w-48 shrink-0">
                      <div className="inline-flex items-center gap-2 mb-3">
                        {c.milestone && (
                          <span
                            className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-sm"
                            style={{ background: c.accent }}
                          >
                            Milestone
                          </span>
                        )}
                      </div>
                      <p className="text-4xl md:text-5xl font-black leading-none mb-2" style={{ color: c.accent }}>
                        {c.year}
                      </p>
                      <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{c.date}</p>
                      <div className="mt-4 w-8 h-0.5 rounded-full" style={{ background: c.accent }} />
                    </div>

                    {/* Right content */}
                    <div className="flex-1">
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.25em] mb-2">{c.label}</p>
                      <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-3 leading-snug">{c.headline}</h3>
                      <p className="text-slate-500 leading-relaxed">{c.body}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── BENTO CAMPUS GRID ──────────────────────────────────────── */
function BentoGrid() {
  return (
    <section className="bg-white py-8 lg:py-32 relative overflow-hidden border-t border-slate-100">
      {/* Subtle blob */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-orange-50 blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-[#FF6A00] text-xs font-black uppercase tracking-[0.3em] mb-2">Present Day</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800">The Campus Today</h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-[auto] gap-4">

          {/* Large image tile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="col-span-2 row-span-2 relative rounded-md overflow-hidden min-h-[320px] group shadow-xl shadow-slate-200"
          >
            <Image src="/image/about3.webp" alt="School Building" fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02133a]/70 via-[#02133a]/10 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-white/60 text-[10px] uppercase tracking-widest mb-1">Our Home</p>
              <p className="text-white font-black text-lg leading-tight">Kuzhiyam South<br />Chandanathope, Kollam</p>
            </div>
          </motion.div>

          {/* Stat tile 1 — orange */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="col-span-1 rounded-md bg-[#FF6A00] p-7 flex flex-col justify-between min-h-[155px] shadow-lg shadow-orange-200"
          >
            <MapPin className="w-7 h-7 text-white/70" />
            <div>
              <p className="text-5xl font-black text-white leading-none">3</p>
              <p className="text-white/70 text-sm font-bold uppercase tracking-wider mt-1">Acres Campus</p>
            </div>
          </motion.div>

          {/* Stat tile 2 — navy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-1 rounded-md bg-[#02133a] p-7 flex flex-col justify-between min-h-[155px] shadow-lg shadow-slate-200"
          >
            <GraduationCap className="w-7 h-7 text-blue-300" />
            <div>
              <p className="text-5xl font-black text-white leading-none">XII</p>
              <p className="text-blue-200/60 text-sm font-bold uppercase tracking-wider mt-1">CBSE Classes</p>
            </div>
          </motion.div>

          {/* Spiritual tile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="col-span-2 rounded-md bg-purple-50 border border-purple-100 p-7 flex items-center gap-6 shadow-sm"
          >
            <div className="w-14 h-14 rounded-md bg-purple-100 flex items-center justify-center shrink-0">
              <Church className="w-7 h-7 text-purple-600" />
            </div>
            <div>
              <p className="text-slate-800 font-black text-lg mb-1">Spiritual Ambience</p>
              <p className="text-slate-500 leading-relaxed text-sm">
                An Ashram for the Acharyas and a Vinayakam temple within the campus — filling every corner with peace and spiritual energy.
              </p>
            </div>
          </motion.div>

          {/* Nature tile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="col-span-2 rounded-md bg-emerald-50 border border-emerald-100 p-7 flex items-center gap-6 shadow-sm"
          >
            <div className="w-14 h-14 rounded-md bg-emerald-100 flex items-center justify-center shrink-0">
              <TreePine className="w-7 h-7 text-emerald-600" />
            </div>
            <div>
              <p className="text-slate-800 font-black text-lg mb-1">Temple of Learning</p>
              <p className="text-slate-500 leading-relaxed text-sm">
                Fully enclosed by a compound wall, the Vidyalaya stands amidst lush greenery — a campus designed for holistic growth of mind, body, and spirit.
              </p>
            </div>
          </motion.div>

          {/* Achievement tile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="col-span-2 md:col-span-4 rounded-md overflow-hidden relative min-h-[180px] shadow-xl shadow-slate-200"
          >
            <Image src="/image/about4.jpg" alt="Campus Life" fill sizes="100vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#02133a]/85 via-[#02133a]/60 to-transparent" />
            <div className="absolute inset-0 flex items-center px-10">
              <div>
                <Trophy className="w-8 h-8 text-[#FF6A00] mb-3" />
                <p className="text-white font-black text-xl md:text-2xl leading-tight max-w-md">
                  1st Prize — 'Best Bharat Nata' &amp; 2nd Prize — 'Best School' (UP Section)
                </p>
                <p className="text-white/50 text-sm mt-2 uppercase tracking-widest">Republic Day · 2001–2002</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── GALLERY ────────────────────────────────────────────────── */
function Gallery() {
  const images = [
    { src: "/image/about1.avif", cls: "col-span-2 row-span-2" },
    { src: "/image/about3.webp", cls: "col-span-1 row-span-1" },
    { src: "/image/about4.jpg", cls: "col-span-1 row-span-1" },
    { src: "/image/about2.webp", cls: "col-span-2 row-span-1" },
  ];

  return (
    <section className="bg-slate-50 py-8 relative overflow-hidden border-t border-slate-100">
      {/* Subtle blob */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-50 blur-3xl opacity-60 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <p className="text-[#FF6A00] text-xs font-black uppercase tracking-[0.3em] mb-2">Photo Gallery</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800">
              Life at the Vidyalaya
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-3">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative rounded-md overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-500 ${img.cls}`}
            >
              <Image
                src={img.src}
                alt="Campus"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors duration-500" />
              {/* Corner accent */}
              <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-[#FF6A00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PAGE ROOT ──────────────────────────────────────────────── */
export default function BeginningPage() {
  return (
    <main className="min-h-screen bg-slate-50 selection:bg-[#FF6A00]/20 selection:text-[#FF6A00]">
      <TopBar />
      <Navbar />
      <Hero />
      <OriginHeading />
      <QuoteIntro />
      <Timeline />
      <BentoGrid />
      <Gallery />
      <Footer />
    </main>
  );
}




"use client";

import { useState, useEffect, useRef } from "react";
import { Lightbulb, Megaphone, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const quotes = [
  "What you have is all His Gift to you. What you do with what you have is your Gift to Him ...",
  "The mind is like a mirror, whatever comes in front of it is reflected in it."
];

export function VisionMission() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const blobRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: -1000, right: 0, top: -500, bottom: 1000 });

  useEffect(() => {
    // Calculate exact constraints so the blob can't leave the horizontal bounds of the screen
    if (blobRef.current) {
      const rect = blobRef.current.getBoundingClientRect();
      setConstraints({
        left: -rect.left + 10, // 10px padding from left screen edge
        right: window.innerWidth - rect.right - 10, // 10px padding from right screen edge
        top: -400,
        bottom: 600
      });
    }

    // Optional: Update constraints on window resize
    const handleResize = () => {
      if (blobRef.current) {
        const rect = blobRef.current.getBoundingClientRect();
        setConstraints({
          left: -rect.left + 10,
          right: window.innerWidth - rect.right - 10,
          top: -400,
          bottom: 600
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextQuote = () => setCurrentQuote((prev) => (prev + 1) % quotes.length);
  const prevQuote = () => setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);

  useEffect(() => {
    const timer = setInterval(nextQuote, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative z-20 px-4 lg:px-8 -mt-24 md:-mt-32 mb-10 max-w-6xl mx-auto">
      <div className=" shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col md:flex-row rounded-md overflow-hidden">

        {/* Left Side: Vision & Mission */}
        <div className="w-full md:w-[60%] p-5 lg:p-7 bg-white relative">

          {/* Vision */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="shrink-0 w-12 h-12 bg-[#FF6A00]/10 flex items-center justify-center text-[#FF6A00] rounded-md">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-1.5">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed text-[13px] text-justify">
                We are a forward-thinking school aiming to prepare our children and students for a rapidly changing world by equipping them with critical thinking skills, global perspective, and respect for core values of honesty, loyalty, and compassion, leading to personal, physical, moral and spiritual development. Developing these skills is the corner stone of the education we offer following the Chinmaya Culture. Students will have success for today and be prepared for tomorrow. In the next two years the school will improve reading habits of each individual from Primary classes onwards and activities related to reading will also be included.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="shrink-0 w-12 h-12 bg-[#FF6A00]/10 flex items-center justify-center text-[#FF6A00] rounded-md">
              <Megaphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-1.5">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed text-[13px] text-justify">
                We at Chinmaya Vidyalaya, Kollam, commit to educate the whole child and honor the diversity of each individual intellectually, emotionally, socially, physically and spiritually by developing in each member of the student community the ability and passion to work wisely, creatively, and effectively for the betterment of humankind and implement the Chinmaya Vision Programme in its entirety.
              </p>
            </div>
          </div>

        </div>

        {/* Right Side: Quotes Slider */}
        <div 
          className="w-full md:w-[40%] px-5 lg:px-7 pt-52 md:pt-60 pb-0 text-white flex flex-col items-center justify-end relative bg-cover bg-[center_35%]"
          style={{ backgroundImage: 'linear-gradient(to bottom, rgba(253, 135, 51, 0.1), rgba(253, 135, 51, 0.95)), url("/image/gurudev2.jfif")' }}
        >

          {/* Slider Controls */}
          <button
            onClick={prevQuote}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/20 transition-colors z-10 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextQuote}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/20 transition-colors z-10 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <h3 className="text-white text-lg font-bold mt-6 mb-1 relative z-10">Quotes from Gurudev</h3>

          <div className="h-24 flex items-center justify-center relative w-full overflow-hidden mb-2 px-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentQuote}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-[15px] italic font-serif text-center leading-relaxed absolute w-full"
              >
                "{quotes[currentQuote]}"
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Slider Dots */}
          <div className="flex gap-1.5 mt-2">
            {quotes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuote(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentQuote ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
                  }`}
                aria-label={`Go to quote ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>

      {/* Floating Blob Ad (Right Side) - Draggable */}
      <motion.div
        ref={blobRef}
        drag
        dragConstraints={constraints}
        dragElastic={0.1}
        whileDrag={{ scale: 1.1, cursor: "grabbing" }}
        className="absolute -top-12 -right-4 sm:-right-8 md:top-1/2 md:-translate-y-1/2 md:-right-16 xl:-right-24 z-50 cursor-grab select-none"
      >
        <motion.div
          animate={{
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 70% 70% 30% / 30% 30% 70% 70%",
              "60% 40% 30% 70% / 60% 30% 70% 40%"
            ],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="relative w-36 h-36 sm:w-44 sm:h-44 xl:w-52 xl:h-52 flex items-center justify-center bg-linear-to-br from-white via-orange-50 to-orange-200 overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.8),transparent_60%)]"
        >
          {/* Text Content */}
          <div className="relative z-10 flex flex-col items-center justify-center p-3 sm:p-4 w-full">

            {/* Header Row: Robot + AI & Robotics */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1 justify-center w-full">

              {/* Custom Image-Matched Cute Robot (Orange Theme) */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-12 h-12 sm:w-14 sm:h-14 pointer-events-none shrink-0 drop-shadow-sm"
              >
                <svg viewBox="0 0 100 100" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">

                  {/* Left Arm */}
                  <motion.g
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: "25px 65px" }}
                  >
                    <rect x="12" y="54" width="16" height="38" rx="8" fill="white" transform="rotate(20, 20, 73)" />
                  </motion.g>

                  {/* Right Arm */}
                  <motion.g
                    animate={{ rotate: [5, -5, 5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: "75px 65px" }}
                  >
                    <rect x="72" y="54" width="16" height="38" rx="8" fill="white" transform="rotate(-20, 80, 73)" />
                  </motion.g>

                  {/* Body */}
                  <path d="M 35 52 C 10 65 20 95 50 98 C 80 95 90 65 65 52 Z" fill="white" />

                  {/* Collar/Neck */}
                  <path d="M 38 52 C 38 60 62 60 62 52 Z" fill="white" />

                  {/* Chest Detail (Orange Theme) */}
                  <path d="M 26 76 L 42 80 L 42 84 L 58 84 L 58 80 L 74 76" fill="none" stroke="#f97316" strokeWidth="2.5" />

                  {/* Ears */}
                  <path d="M 18 25 C 6 25 6 45 18 45 Z" fill="white" />
                  <path d="M 82 25 C 94 25 94 45 82 45 Z" fill="white" />

                  {/* Head */}
                  <rect x="18" y="8" width="64" height="48" rx="22" fill="white" />

                  {/* Visor */}
                  <rect x="24" y="15" width="52" height="34" rx="12" fill="#1e293b" stroke="none" />

                  {/* Eyes (Happy Orange) */}
                  <motion.path
                    animate={{ scaleY: [1, 0.1, 1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 1] }}
                    style={{ transformOrigin: "36px 30px" }}
                    d="M 30 30 A 6 6 0 0 1 42 30 Z" fill="#f97316" stroke="none"
                  />
                  <motion.path
                    animate={{ scaleY: [1, 0.1, 1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 1] }}
                    style={{ transformOrigin: "64px 30px" }}
                    d="M 58 30 A 6 6 0 0 1 70 30 Z" fill="#f97316" stroke="none"
                  />

                  {/* Mouth (Happy Smile) */}
                  <motion.path
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: "50px 38px" }}
                    d="M 45 38 A 5 5 0 0 0 55 38 Z" fill="#f97316" stroke="none"
                  />

                  {/* Visor Highlight */}
                  <path d="M 28 22 C 34 18 42 18 48 20" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeLinecap="round" />

                  {/* Head Highlight */}
                  <path d="M 24 16 A 12 12 0 0 1 36 12" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
                </svg>

                {/* AI Sparkles */}
                <motion.div
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5], rotate: [0, 90] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2"
                >
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
                </motion.div>
              </motion.div>

              {/* Text AI & Robotics */}
              <div className="flex flex-col text-left leading-none">
                <span className="text-slate-800 font-black text-[15px] sm:text-[17px] xl:text-[20px] tracking-tighter drop-shadow-sm pointer-events-none">AI &</span>
                <span className="text-slate-800 font-black text-[15px] sm:text-[17px] xl:text-[20px] tracking-tighter drop-shadow-sm pointer-events-none mt-[1px]">Robotics</span>
              </div>
            </div>

            <span className="text-orange-700 font-bold text-[7px] sm:text-[8px] xl:text-[9px] leading-tight mt-1 uppercase tracking-wider border-t border-orange-300/60 pt-1 sm:pt-1.5 pointer-events-none text-center">
              Chinmaya Science<br />Research
            </span>

            <Link
              href="/innovation-hub/ai-robotics"
              draggable={false}
              onPointerDown={(e) => e.stopPropagation()}
              className="mt-1.5 sm:mt-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 bg-white/70 backdrop-blur-md rounded-full text-orange-700 font-bold text-[7.5px] sm:text-[9px] xl:text-[10px] uppercase tracking-widest border border-orange-200 hover:bg-white hover:text-orange-600 transition-colors shadow-sm flex items-center gap-1 cursor-pointer pointer-events-auto"
            >
              Explore <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 -mr-0.5 sm:-mr-1" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}


"use client";

import { useState, useEffect, useRef } from "react";
import { Lightbulb, Megaphone, ChevronLeft, ChevronRight } from "lucide-react";
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
        <div className="w-full md:w-[40%] bg-[#fd8733] p-5 lg:p-7 text-white flex flex-col items-center justify-center relative">

          {/* Slider Controls */}
          <button
            onClick={prevQuote}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/20 transition-colors z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextQuote}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/20 transition-colors z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <img
            src="/image/chinmayananda.jpg"
            alt="Gurudev"
            className="w-16 h-16 rounded-full border-2 border-white/20 object-cover mb-3 shadow-xl"
          />
          <h3 className="text-lg font-bold mb-3">Quotes from Gurudev</h3>

          <div className="h-24 flex items-center justify-center relative w-full overflow-hidden mb-6 px-6">
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
          className="relative w-36 h-36 sm:w-44 sm:h-44 xl:w-52 xl:h-52 flex items-center justify-center bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] transition-shadow duration-300 overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.4),transparent_50%)]"
        >
          {/* Text Content */}
          <div className="relative z-10 text-center flex flex-col items-center justify-center p-3 sm:p-4">
            <span className="text-white font-black text-lg sm:text-xl xl:text-2xl leading-tight tracking-tighter drop-shadow-md pointer-events-none">AI &</span>
            <span className="text-white font-black text-lg sm:text-xl xl:text-2xl leading-tight tracking-tighter drop-shadow-md -mt-1 sm:-mt-1 pointer-events-none">Robotics</span>
            
            <span className="text-pink-100 font-bold text-[7px] sm:text-[8px] xl:text-[9px] leading-tight mt-1.5 sm:mt-2 uppercase tracking-wider drop-shadow-sm border-t border-white/20 pt-1 sm:pt-1.5 pointer-events-none">
              Chinmaya Science<br/>Research
            </span>
            
            <Link 
              href="/innovation-hub/ai-robotics" 
              draggable={false}
              onPointerDown={(e) => e.stopPropagation()}
              className="mt-2 sm:mt-3 px-2.5 py-1 sm:px-3.5 sm:py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white font-bold text-[7.5px] sm:text-[9px] xl:text-[10px] uppercase tracking-widest border border-white/30 hover:bg-white/40 transition-colors shadow-inner flex items-center gap-1 cursor-pointer pointer-events-auto"
            >
              Explore <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 -mr-0.5 sm:-mr-1" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}


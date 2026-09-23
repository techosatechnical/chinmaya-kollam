"use client";

import { useState, useEffect } from "react";
import { Lightbulb, Megaphone, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  "What you have is all His Gift to you. What you do with what you have is your Gift to Him ...",
  "The mind is like a mirror, whatever comes in front of it is reflected in it."
];

export function VisionMission() {
  const [currentQuote, setCurrentQuote] = useState(0);

  const nextQuote = () => setCurrentQuote((prev) => (prev + 1) % quotes.length);
  const prevQuote = () => setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);

  useEffect(() => {
    const timer = setInterval(nextQuote, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative z-20 px-4 lg:px-8 -mt-24 md:-mt-32 mb-10 max-w-6xl mx-auto">
      <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col md:flex-row">

        {/* Left Side: Vision & Mission */}
        <div className="w-full md:w-[60%] p-5 lg:p-7 bg-white">

          {/* Vision */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="shrink-0 w-12 h-12 bg-[#FF6A00]/10 flex items-center justify-center text-[#FF6A00]">
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
            <div className="shrink-0 w-12 h-12 bg-[#FF6A00]/10 flex items-center justify-center text-[#FF6A00]">
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
        <div className="w-full md:w-[40%] bg-[#FF6A00] p-5 lg:p-7 text-white flex flex-col items-center justify-center relative">

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
    </section>
  );
}

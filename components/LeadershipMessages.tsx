"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

const messages = [
  {
    id: "principal",
    title: "MESSAGE FROM THE PRINCIPAL",
    name: "Mrs Nisha S S",
    role: "Principal",
    image: "/mentors/principal.jpeg",
    message: (
      <>
        <p className="mb-4 font-bold text-slate-800">Hari Om!</p>
        <p className="mb-4">
          As we begin the journey in this new academic year, remember that everyday is a chance to learn something new, improve ourselves and move one step closer to our goals. Our Vidyalaya remains committed to nurturing students talents, inspiring aspirations and guiding them towards excellence.
        </p>
        <p>
          We empower our students to embrace challenges with confidence, learn from their own mistakes and never stop believing in their potential. Wishing you a year filled with discovery, innovation, success and endless learning opportunities. May Gurudev's blessings shower on each one of us!.
        </p>
      </>
    )
  },
  {
    id: "vice-principal",
    title: "MESSAGE FROM THE VICE PRINCIPAL",
    name: "Mrs Sumutha S",
    role: "Vice Principal",
    image: "/mentors/vice principal.jpeg",
    message: (
      <>
        <p className="mb-4 font-bold text-slate-800">Hari Om!</p>
        <p className="mb-4">
          Chinmaya Vidyalaya Kollam welcomes everyone to step into the world of success and excellence. As our school reopens, we are excited to continue nurturing young minds through quality education and modern technology.
        </p>
        <p>
          Smart classrooms, digital learning tools and innovative teaching methods help students learn more effectively and creatively. Let us work together to make this academic year productive and inspiring for every student.
        </p>
      </>
    )
  }
];

export function LeadershipMessages() {
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  return (
    <section className="py-8 bg-[#F5F5F5]">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {messages.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center"
            >
              {/* Title */}
              <h3 className="text-[#004B87] font-bold text-sm md:text-base tracking-wider uppercase mb-6 text-center">
                {item.title}
              </h3>

              {/* Card */}
              <div className="w-full flex flex-col sm:flex-row h-auto sm:h-[320px] shadow-xl rounded-md overflow-hidden group cursor-pointer" onClick={() => setActiveMessage(item.id)}>
                {/* Left Blue Box */}
                <div className="w-full sm:w-1/2 bg-[#1A457B] p-8 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Button */}
                  <div className="border border-white/70 px-6 py-2 flex items-center gap-2 group-hover:border-white transition-colors duration-300 relative z-10">
                    <span className="text-white text-xs font-bold tracking-[0.2em] whitespace-nowrap">READ MESSAGE</span>
                    <span className="text-white text-xs font-bold transition-transform duration-300 group-hover:translate-x-1">&gt;</span>
                  </div>
                </div>

                {/* Right Image Box */}
                <div className="w-full sm:w-1/2 relative h-64 sm:h-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className={`object-cover ${item.id === 'principal' ? 'object-[center_20%]' : 'object-top'} group-hover:scale-105 transition-transform duration-700 ease-out`}
                  />
                  {/* Subtle gradient overlay to make image look premium */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for Messages */}
      <AnimatePresence>
        {activeMessage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setActiveMessage(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-md shadow-2xl flex flex-col md:flex-row z-10"
            >
              {(() => {
                const data = messages.find((m) => m.id === activeMessage)!;
                return (
                  <>
                    {/* Modal Image */}
                    <div className="w-full md:w-2/5 h-64 md:h-auto relative hidden md:block">
                      <Image
                        src={data.image}
                        alt={data.name}
                        fill
                        className="object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex flex-col justify-end p-6">
                        <h4 className="text-white font-bold text-xl">{data.name}</h4>
                        <p className="text-blue-200 font-medium text-sm">{data.role}</p>
                      </div>
                    </div>

                    {/* Modal Content */}
                    <div className="w-full md:w-3/5 p-6 sm:p-8 md:p-10 relative">
                      <button
                        onClick={() => setActiveMessage(null)}
                        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      <div className="md:hidden mb-6 flex items-center gap-4">
                        <div className="w-16 h-16 relative rounded-full overflow-hidden shrink-0 border-2 border-[#1A457B]">
                          <Image src={data.image} alt={data.name} fill className="object-cover object-top" />
                        </div>
                        <div>
                          <h4 className="text-slate-900 font-bold text-lg leading-tight">{data.name}</h4>
                          <p className="text-[#1A457B] font-medium text-sm">{data.role}</p>
                        </div>
                      </div>

                      <h3 className="text-[#1A457B] font-bold text-xs tracking-widest uppercase mb-6 pb-4 border-b border-slate-100">
                        {data.title}
                      </h3>

                      <div className="prose prose-slate text-slate-600 leading-relaxed text-[15px]">
                        {data.message}
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}




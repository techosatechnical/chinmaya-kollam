"use client";

import React from 'react';
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function LabsPage() {
  const labs = [
    {
      title: "Physics Lab",
      image: "/facilities/phy lab.jpg",
      description: "The Vidyalaya has a Physics Lab with all the necessary instruments required for both the Secondary and Senior Secondary sections. Our lab can be utilized by more than 30 students at a time. The Lab provides for all equipments as required under the affiliation rules."
    },
    {
      title: "Chemistry Lab",
      image: "/facilities/chem lab.jpeg",
      description: "The Chemistry laboratory is a scientifically advanced lab which has the capacity to accommodate more than 40 students at a time. It meets the challenges of modern day infrastructure and safety requirements. The students can perform experiments with precision in this spacious lab, where ample stock of reagents and chemicals are made available."
    },
    {
      title: "Biology Lab",
      image: "/facilities/bio lab.jpg",
      description: "The Biology lab can also accommodate more than 40 students at a time. A variety of models, charts, specimens and CDs are available."
    },
    {
      title: "Computer Lab",
      image: "/facilities/computer lab.jpeg",
      description: "The Vidyalaya has a modern computer lab. Our students have unlimited access to computers and the professional software tools that go with them. The Vidyalaya is connected to the Internet, which facilitates a highly effective communication link across the globe. Our teaching laboratories are equipped with high-end machines. The lab has over 40 computers connected in a Local Area Network, and an Efficient UPS system for uninterrupted power supply. The Lab also enables more than 40 students to carry out practicals at a time."
    },
    {
      title: "Mathematics Lab",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1000&auto=format&fit=crop",
      description: "The vidyalaya has a well equipped Mathematics lab serving the purpose of making “Learning of Mathematics through practical experiments” possible. There are around 20 laminated charts on various topics. Number patterns, Experiments and Puzzles."
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-slate-900 selection:text-white">
      <TopBar />
      <Navbar />

      <section className="relative pt-32 pb-10 md:pt-40 md:pb-10 bg-[#0B1121] text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/facilities/chem lab.jpeg"
            alt="Laboratories background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="py-2 text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            Laboratories
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight drop-shadow-md">
            Hands-on learning with scientifically advanced infrastructure.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10 overflow-x-hidden">
        <div className="space-y-16">
          {labs.map((lab, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group bg-white  shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/30 transition-all"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">{lab.title}</h2>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {lab.description}
                  </p>
                </div>
                <div className={`relative  overflow-hidden shadow-2xl ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <img
                    src={lab.image}
                    alt={lab.title}
                    className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}



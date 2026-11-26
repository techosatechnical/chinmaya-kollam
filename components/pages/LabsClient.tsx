"use client";

import React from "react";
import { motion } from "framer-motion";

export interface LabItem {
  title: string;
  image: string;
  description: string;
}

interface LabsClientProps {
  schoolName: string;
  heroImage: string;
  labs: LabItem[];
}

export function LabsClient({ schoolName, heroImage, labs }: LabsClientProps) {
  return (
    <>
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-10 bg-dark-surface text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Laboratories background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="py-2 text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            Laboratories
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight drop-shadow-md">
            Hands-on learning with scientifically advanced infrastructure at {schoolName}.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10 overflow-x-hidden">
        {labs.length === 0 ? (
          <div className="bg-white rounded-md shadow-sm border border-slate-200 p-12 text-center text-slate-500">
            Laboratory details for {schoolName} will be published soon.
          </div>
        ) : (
          <div className="space-y-16">
            {labs.map((lab, index) => (
              <motion.div
                key={lab.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="group bg-white shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/30 transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={index % 2 !== 0 ? "lg:order-2" : ""}>
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">{lab.title}</h2>
                    <p className="text-slate-600 text-lg leading-relaxed">{lab.description}</p>
                  </div>
                  <div className={`relative overflow-hidden shadow-2xl ${index % 2 !== 0 ? "lg:order-1" : ""}`}>
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
        )}
      </section>
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SchoolConfig } from "@/lib/types/school";

interface FacilitiesProps {
  section: SchoolConfig["facilitiesSection"];
}

export function Facilities({ section }: FacilitiesProps) {
  if (!section.enabled || section.items.length === 0) return null;

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 bg-primary text-white font-medium text-sm rounded-md mb-6 shadow-sm"
          >
            {section.badge}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-4"
          >
            Our <span className="text-secondary">Facilities</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto text-lg"
          >
            {section.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {section.items.map((facility, index) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={facility.href} className="block h-full group">
                <div className="bg-slate-50 border border-slate-100 rounded-md overflow-hidden h-full flex flex-col items-start transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10">
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-1 w-full bg-white">
                    <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                      {facility.title}
                    </h3>
                    <p className="text-slate-600 mb-6 flex-1 line-clamp-3">
                      {facility.desc}
                    </p>
                    <div className="flex items-center text-primary font-semibold text-sm group-hover:text-accent transition-colors mt-auto">
                      Explore Facility
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

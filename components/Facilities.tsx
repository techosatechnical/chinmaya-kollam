"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const facilities = [
  { 
    title: "Library", 
    href: "/facilities/library", 
    image: "/facilities/library.jpg",
    desc: "A vast collection of books, journals, and digital resources to inspire a love for reading."
  },
  { 
    title: "Smart Class", 
    href: "/facilities/smart-class", 
    image: "/facilities/smart class.jpg",
    desc: "Interactive digital boards and multimedia content for an engaging learning experience."
  },
  { 
    title: "Labs", 
    href: "/facilities/labs", 
    image: "/facilities/chem lab.jpeg",
    desc: "Well-equipped science and computer labs for practical, hands-on experiments."
  },
  { 
    title: "KinderGarten", 
    href: "/facilities/kindergarten", 
    image: "/facilities/kindergarden.jpg",
    desc: "A nurturing and playful environment specifically designed for our youngest learners."
  },
  { 
    title: "Sports & Games", 
    href: "/facilities/sports-games", 
    image: "/facilities/sportsday.jpg",
    desc: "Extensive sports facilities encouraging physical fitness, teamwork, and healthy competition."
  },
  { 
    title: "Chinmaya Blossoms", 
    href: "/facilities/chinmaya-blossoms", 
    image: "/facilities/pre kg.jpg",
    desc: "A specialized Pre-KG program focusing on early childhood development and care."
  }
];

export function Facilities() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 bg-[#0F284A] text-white font-medium text-sm rounded-md mb-6 shadow-sm"
          >
            Campus Infrastructure
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-[#0F284A] tracking-tight mb-4"
          >
            Our <span className="text-[#FF9924]">Facilities</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto text-lg"
          >
            We provide state-of-the-art facilities to ensure a comprehensive and holistic educational environment for all our students.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => {
            return (
              <motion.div
                key={facility.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={facility.href} className="block h-full group">
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden h-full flex flex-col items-start transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0F284A]/10">
                    <div className="w-full h-48 overflow-hidden">
                      <img 
                        src={facility.image} 
                        alt={facility.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-8 flex flex-col flex-1 w-full bg-white">
                      <h3 className="text-xl font-bold text-[#0F284A] mb-3 group-hover:text-[#FF6A00] transition-colors">
                        {facility.title}
                      </h3>
                      <p className="text-slate-600 mb-6 flex-1 line-clamp-3">
                        {facility.desc}
                      </p>
                      <div className="flex items-center text-[#0F284A] font-semibold text-sm group-hover:text-[#FF6A00] transition-colors mt-auto">
                        Explore Facility
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

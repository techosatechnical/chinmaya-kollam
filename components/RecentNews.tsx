"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

const newsList = [
  {
    image: "/news/infini.jpeg",
    badge: "Event",
    date: "Coming Soon",
    title: "INFNI",
    excerpt: "Experience innovation and excellence at INFNI, our premier technology and cultural symposium.",
    link: "#"
  },
  {
    image: "/news/tedx-cva.png",
    badge: "Special Event",
    date: "Recent",
    title: "TED-X Chinmaya Vidyalaya",
    excerpt: "An inspiring day of 'ideas worth spreading', featuring visionary speakers and thought-provoking discussions.",
    link: "#"
  },
  {
    image: "/news/arts fest.jpeg",
    badge: "Culture",
    date: "Recent",
    title: "Arts Fest",
    excerpt: "A grand celebration of creativity, talent, and artistic expression by the vibrant students of our Vidyalaya.",
    link: "#"
  },
  {
    image: "/news/environment day.jpeg",
    badge: "Campus",
    date: "Recent",
    title: "Environment Day",
    excerpt: "Taking steps towards a greener future. Students participated in tree plantation drives and eco-awareness campaigns.",
    link: "#"
  }
];

export function RecentNews() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div 
          className="mb-12 text-center max-w-2xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          variants={{
            hidden: { opacity: 1 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
          }}
        >
          <motion.span 
            variants={{
              hidden: { opacity: 0, filter: "blur(10px)", y: 15 },
              visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.4, ease: "easeOut" } }
            }}
            className="text-primary font-semibold tracking-wider uppercase mb-2 block"
          >
            Highlights
          </motion.span>
          <motion.h2 
            variants={{
              hidden: { opacity: 1 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
            }}
            className="text-3xl md:text-4xl font-bold text-black flex flex-wrap justify-center items-center gap-x-2"
          >
            <motion.span variants={{ hidden: { opacity: 0, filter: "blur(12px)", y: 15 }, visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.4, ease: "easeOut" } } }}>
              Recent
            </motion.span>
            <motion.span 
              variants={{ hidden: { opacity: 0, filter: "blur(12px)", y: 15 }, visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.4, ease: "easeOut" } } }}
              className="text-secondary relative inline-block mx-1"
            >
              News
              <svg className="absolute w-full h-auto -bottom-2 left-0 text-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 7" fill="none"><path d="M2 3.5 Q30 1 60 3.8 T120 3.2 T180 4 T240 3.3 T300 4.2 T348 3.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>
            </motion.span>
            <motion.span variants={{ hidden: { opacity: 0, filter: "blur(12px)", y: 15 }, visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.4, ease: "easeOut" } } }}>
              & Updates
            </motion.span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {newsList.map((news, index) => (
            <motion.div
              key={news.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 border border-slate-100 flex flex-col"
            >
              <div className="relative overflow-hidden h-48 shrink-0">
                <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/95 backdrop-blur-sm text-[#004B87] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    {news.badge}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-3">
                  <Calendar className="w-4 h-4 text-[#FF6A00]" />
                  <span>{news.date}</span>
                </div>
                
                <h3 className="text-[19px] font-bold text-slate-900 mb-3 group-hover:text-[#385EEC] transition-colors leading-snug">
                  <Link href={news.link}>{news.title}</Link>
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                  {news.excerpt}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100">
                  <Link href={news.link} className="inline-flex items-center text-sm font-bold text-[#FF6A00] hover:text-[#385EEC] transition-colors group/link">
                    Read More 
                    <ArrowRight className="w-4 h-4 ml-1.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Link href="/academics/news" className="inline-flex items-center justify-center px-8 py-3.5 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-full hover:bg-slate-50 hover:border-[#385EEC] hover:text-[#385EEC] transition-all duration-300 group shadow-sm hover:shadow-md">
            View All News 
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

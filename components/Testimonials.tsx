"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const testimonials = [
  {
    image: "https://eteach-html.vercel.app/assets/img/client/client-1.jpg",
    name: "Ruhul Amin",
    role: "Alumni",
    quote: '"My journey at Chinmaya Vidyalaya laid a strong foundation for my career. The teachers were incredibly supportive and the values I learned here are still with me today."',
    linkText: "Read Full Review",
    linkUrl: "#"
  },
  {
    image: "https://eteach-html.vercel.app/assets/img/client/client-2.jpg",
    name: "Abul Hasem",
    role: "Parent",
    quote: '"The academic standard is excellent! The co-curricular activities and the personalized attention given to each student helped my child master topics quickly. Highly recommended."',
    linkText: "Read Full Review",
    linkUrl: "#"
  },
  {
    image: "https://eteach-html.vercel.app/assets/img/client/client-3.jpg",
    name: "Abdul Hamid",
    role: "Student",
    quote: '"A fantastic platform for holistic learning. The discussion forums, arts fest, and peer interactions are very helpful. I love the vibrant campus environment."',
    linkText: "Read Full Review",
    linkUrl: "#"
  }
];

export function Testimonials() {
  return (
    <section className="py-8 bg-[#F0F4F8]">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-5 py-2 bg-[#0F284A] text-white font-medium text-sm rounded-md mb-6 shadow-sm"
            >
              Our Testimonial
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-black tracking-tight"
            >
              What Our{" "}
              <span className="text-[#FF9924] relative inline-block mx-1">
                Students
                <svg className="absolute w-full h-auto -bottom-3 left-0 text-[#FF9924]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 7" fill="none">
                  <path d="M2 3.5 Q30 1 60 3.8 T120 3.2 T180 4 T240 3.3 T300 4.2 T348 3.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>{" "}
              Say
            </motion.h2>
          </div>
          
          <div className="hidden md:flex items-center gap-4 pb-2">
            <button className="w-12 h-12 rounded-full bg-[#0F284A] text-white flex items-center justify-center hover:bg-[#091a33] transition-colors shadow-md group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button className="w-12 h-12 rounded-full bg-white text-slate-400 border border-slate-200 flex items-center justify-center hover:text-[#0F284A] hover:border-[#0F284A] transition-all shadow-sm group">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Desktop Cards */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 lg:p-10 rounded-md shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-white/50 flex flex-col"
            >
              <div className="flex items-center gap-5 mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-16 h-16 rounded-full object-cover border-[3px] border-[#F0F4F8]"
                />
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{testimonial.name}</h3>
                  <p className="text-sm text-slate-500 font-medium">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-slate-500 italic leading-relaxed mb-8 flex-1">
                {testimonial.quote}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile Scrolling Cards */}
        <div className="block md:hidden overflow-hidden py-4 relative -mx-4 px-4">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F0F4F8] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F0F4F8] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          >
            {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="w-[280px] shrink-0 bg-white p-6 rounded-md shadow-sm border border-white/50 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover border-[3px] border-[#F0F4F8]"
                  />
                  <div>
                    <h3 className="font-bold text-[15px] text-slate-900 leading-tight">{testimonial.name}</h3>
                    <p className="text-[12px] text-slate-500 font-medium">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-500 italic text-sm leading-relaxed flex-1">
                  {testimonial.quote}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}




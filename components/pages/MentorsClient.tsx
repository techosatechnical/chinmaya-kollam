"use client";

import { motion } from "framer-motion";
import { BookOpen, Award } from "lucide-react";
import type { PersonItem } from "@/lib/types/school";

interface MentorsClientProps {
  schoolName: string;
  leadership: PersonItem[];
  teachers: PersonItem[];
}

export function MentorsClient({ schoolName, leadership, teachers }: MentorsClientProps) {
  return (
    <>
      <div className="bg-primary pt-32 pb-10 md:pt-40 md:pb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
          >
            Our <span className="text-secondary">Mentors</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-blue-100 max-w-2xl mx-auto text-lg"
          >
            Meet our highly qualified and dedicated teaching staff at {schoolName}.
          </motion.p>
        </div>
      </div>

      {leadership.length > 0 && (
        <section className="py-10 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary mb-4">Our Leadership</h2>
              <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 max-w-4xl mx-auto">
              {leadership.map((leader, index) => (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-slate-50 rounded-md overflow-hidden shadow-md hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-slate-100 group flex-1"
                >
                  <div className="aspect-4/3 w-full relative overflow-hidden flex items-center justify-center bg-slate-200">
                    <img
                      src={
                        leader.image ||
                        `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(leader.name)}&backgroundColor=0F284A,FF9924&textColor=ffffff`
                      }
                      alt={leader.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <div className="p-6 md:p-8 text-center bg-white">
                    <h3 className="font-bold text-primary text-2xl mb-2">{leader.name}</h3>
                    <div className="flex items-center justify-center gap-2 text-accent font-semibold text-base mb-4">
                      <BookOpen className="w-4 h-4" />
                      <span>{leader.role}</span>
                    </div>
                    {leader.qualification && (
                      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-slate-50 rounded-full text-sm text-slate-600 font-medium border border-slate-100">
                        <Award className="w-4 h-4 shrink-0 text-primary" />
                        <span>{leader.qualification}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-10 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary mb-4">Teaching Faculty</h2>
            <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
          </div>

          {teachers.length === 0 ? (
            <div className="bg-white rounded-md border border-slate-200 p-10 text-center text-slate-500">
              Faculty directory for {schoolName} will be published soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {teachers.map((mentor, index) => (
                <motion.div
                  key={mentor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
                  className="bg-white rounded-md overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-slate-100 group flex flex-col"
                >
                  <div className="bg-linear-to-br from-slate-100 to-slate-200 aspect-square w-full relative overflow-hidden flex items-center justify-center">
                    <img
                      src={
                        mentor.image ||
                        `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(mentor.name)}&backgroundColor=0F284A,FF9924&textColor=ffffff`
                      }
                      alt={mentor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col text-center">
                    <h3 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                      {mentor.name}
                    </h3>

                    <div className="flex items-center justify-center gap-1.5 text-accent font-medium text-sm mb-3">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{mentor.role}</span>
                    </div>

                    {mentor.qualification && (
                      <div className="mt-auto pt-3 border-t border-slate-100">
                        <div className="flex items-start justify-center gap-1.5 text-xs text-slate-500 font-medium">
                          <Award className="w-3.5 h-3.5 shrink-0 text-primary" />
                          <span className="line-clamp-2">{mentor.qualification}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

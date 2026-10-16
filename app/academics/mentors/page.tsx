"use client";

import { motion } from "framer-motion";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookOpen, Award, UserCircle } from "lucide-react";

const mentors = [
  { name: "Nisha S S", role: "Principal", qualification: "MA, B.Ed, SET", image: "/mentors/principal.jpeg" },
  { name: "Sumutha S", role: "Vice Principal", qualification: "MA, B.Ed", image: "/mentors/vice principal.jpeg" },
  { name: "Leeja Kumari S", role: "English", qualification: "MA, B.Ed SET, CTET" },
  { name: "Manju A", role: "English", qualification: "MA, B.Ed" },
  { name: "Mahitha G", role: "English", qualification: "MA, B.Ed" },
  { name: "Sangeetha K", role: "English", qualification: "MA, B.Ed" },
  { name: "Resmi V T (HOD)", role: "English", qualification: "MA, B.Ed, K.TET" },
  { name: "Sunimol R (HOD)", role: "Mathematics", qualification: "M.Sc, B.Ed" },
  { name: "Maheswari T", role: "Mathematics", qualification: "M.Sc, B.Ed" },
  { name: "Priya P", role: "Mathematics", qualification: "M.Sc, B.Ed" },
  { name: "Vijaya Lekshmi L P", role: "Mathematics", qualification: "MSc, BEd, KTET" },
  { name: "Rakhi Ramachandran Pillai", role: "Chemistry", qualification: "M.Sc, B.Ed" },
  { name: "Midhina Krishna", role: "Chemistry", qualification: "M.Sc, B.Ed" },
  { name: "Rejitha P", role: "Physics", qualification: "M.Sc, B.Ed, SET" },
  { name: "Indu Lekshmi", role: "Physics", qualification: "MSC, B.Ed, CTET" },
  { name: "Jayasree T P (HOD)", role: "Biology", qualification: "M.Sc, B.Ed, SET" },
  { name: "Anju S", role: "Biology", qualification: "M.Sc, B.Ed, SET, MPhil" },
  { name: "Swapna K (HOD)", role: "Computer Science", qualification: "MCA" },
  { name: "Preethi S", role: "Computer Science", qualification: "MSc" },
  { name: "Renju S", role: "Computer Science", qualification: "MCA" },
  { name: "Reshmy L (HOD)", role: "Social Science", qualification: "M.A, B.Ed" },
  { name: "Deepa S", role: "Social Science", qualification: "M.A, B.Ed, SET" },
  { name: "Bindhu", role: "Social Science", qualification: "M.A, B.Ed" },
  { "name": "Resmi R", "role": "Commerce", "qualification": "MCom, BEd, SET" },
  { name: "Seema V (HOD)", role: "Malayalam", qualification: "M.A, B.Ed, SET" },
  { name: "Abhirami Lal", role: "Malayalam", qualification: "MA, BEd, KTET" },
  { name: "Gayathri Devi M R", role: "Hindi", qualification: "M.A, B.Ed" },
  { name: "Sumitha G S (HOD)", role: "Hindi", qualification: "M.A, B.Ed" },
  { name: "Jainey Agney", role: "Hindi", qualification: "M.A, MPhil, B.Ed" },
  { name: "Neethu S N", role: "Sanskrit", qualification: "M.A, B.Ed" },
  { name: "Salila S", role: "Nursery Teacher", qualification: "P.P.T.T.C" },
  { name: "Viswakala V L (HOD)", role: "Nursery Teacher", qualification: "P.P.T.T.C" },
  { name: "Deepthi R", role: "Nursery Teacher", qualification: "DIP, PPTTC" },
  { name: "Maneesha", role: "Nursery Teacher", qualification: "DIP, PPTTC" },
  { name: "Smitha A", role: "Librarian", qualification: "B.Lisc" },
  { name: "Sheeja K S", role: "Music Teacher", qualification: "BA Music" },
  { name: "Maya Rajendran", role: "Dance Teacher", qualification: "Diploma in Dance" },
  { name: "R S Rejin", role: "Physical Trainer", qualification: "BPEd, NIS" },
  { name: "Vishnu Chandran", role: "Art & Craft Teacher", qualification: "BFA" }
];
const leadership = mentors.slice(0, 2);
const teachers = mentors.slice(2);

export default function MentorsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <TopBar />
      <Navbar />

      {/* Page Header */}
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
            Meet our highly qualified and dedicated teaching staff who shape the future of our students.
          </motion.p>
        </div>
      </div>

      {/* Leadership Section */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Leadership</h2>
            <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 max-w-4xl mx-auto">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-slate-50 rounded-md overflow-hidden shadow-md hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-slate-100 group flex-1"
              >
                <div className="aspect-4/3 w-full relative overflow-hidden flex items-center justify-center bg-slate-200">
                  {leader.image ? (
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                    />
                  ) : (
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${leader.name}&backgroundColor=0F284A,FF9924&textColor=ffffff`}
                      alt={leader.name}
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                    />
                  )}
                </div>
                <div className="p-6 md:p-8 text-center bg-white">
                  <h3 className="font-bold text-primary text-2xl mb-2">{leader.name}</h3>
                  <div className="flex items-center justify-center gap-2 text-[#FF6A00] font-semibold text-base mb-4">
                    <BookOpen className="w-4 h-4" />
                    <span>{leader.role}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-slate-50 rounded-full text-sm text-slate-600 font-medium border border-slate-100">
                    <Award className="w-4 h-4 shrink-0 text-primary" />
                    <span>{leader.qualification}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="py-10 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary mb-4">Teaching Faculty</h2>
            <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {teachers.map((mentor, index) => (
              <motion.div
                key={mentor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
                className="bg-white rounded-md overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-slate-100 group flex flex-col"
              >
                <div className="bg-linear-to-br from-slate-100 to-slate-200 aspect-square w-full relative overflow-hidden flex items-center justify-center">
                  {mentor.image ? (
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    />
                  ) : (
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${mentor.name}&backgroundColor=0F284A,FF9924&textColor=ffffff`}
                      alt={mentor.name}
                      className="w-full h-full object-cover opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500"
                    />
                  )}
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col text-center">
                  <h3 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                    {mentor.name}
                  </h3>

                  <div className="flex items-center justify-center gap-1.5 text-[#FF6A00] font-medium text-sm mb-3">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{mentor.role}</span>
                  </div>

                  <div className="mt-auto pt-3 border-t border-slate-100">
                    <div className="flex items-start justify-center gap-1.5 text-xs text-slate-500 font-medium">
                      <Award className="w-3.5 h-3.5 shrink-0 text-primary" />
                      <span className="line-clamp-2">{mentor.qualification}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}




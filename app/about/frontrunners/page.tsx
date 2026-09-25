"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function FrontrunnersPage() {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const testimonials = [
    {
      id: 1,
      quote: "Proud to be a student of Chinmaya Vidhalaya Kollam for 14 years of my academic life from KG to class 12. Those days were the most valuable days in my life which moulded the human in me in every aspects.",
      author: "Dr. Siji Nath S",
      designation: "BAMS, CCMC, Marma Specialist",
      organization: "Ramaiah Indic Speciality Ayurveda, Banjara Hills, Hyderabad",
      image: "/frontrunner/Dr Siji Nath S.jpg"
    },
    {
      id: 2,
      quote: "Hari Om! If I have to speak something about the school which I have studied for more than a decade, I’ll start it with our beloved MathaJi.. She is the one person I misses a lot after completing my entire schooling.. It would be because she had taught us the basic value education from such a small age. If at all I posses any moral qualities now, she is the main reason for all that. Sliding pages of Mata Ji, there comes my special teachers, Principal and other administrative staffs equally. There’s no hierarchy in priority for those people as everyone had played an important role in making me/ moulding me like who I’m now! Like everyone says, schooling is the most important period for youths to develop or restrain themselves and the one great message our Chinmayananda has taught me is ‘One should live a life with exemplary simplicity personified!’ and I ought to follow that in my life too.. I chose my career as a doctor to serve people with love which i have got plenty from all my people out there! Once again I thank all my teachers, staffs and my much loved students for the truly outstanding support you all have showered us!",
      author: "Dr. Kavya K S",
      designation: "Doctor",
      organization: "",
      image: "/frontrunner/Dr. Kavya K S.jpg"
    },
    {
      id: 3,
      quote: "My life at Chinmaya changed who I am and has given me the most valuable skills for an academic growth. I look back at my prestigious institute with respect and love. Thank you",
      author: "Dr. Anusree M.R",
      designation: "Assistant professor, Department of Statistics",
      organization: "St.Thomas college, Thrissur",
      image: "/frontrunner/Anusree.jpg"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-slate-900 selection:text-white">
      <TopBar />
      <Navbar />

      {/* Header */}
      <section className="relative py-10 bg-slate-950 text-white overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950"></div>
        <div className="absolute top-0 w-full h-px bg-linear-to-r from-transparent via-slate-400 to-transparent opacity-20"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

          <h1 className="py-6 text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-linear-to-b from-white to-slate-400">
            Our Frontrunners
          </h1>

          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-slate-400 font-medium tracking-tight">
            Hear from our proud alumni who carry the light of Chinmaya Vidyalaya into the world.
          </p>
        </div>
      </section>

      {/* Testimonials Grid (Grid Layout with Equal Heights) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="relative bg-white p-8 md:p-10 rounded-md shadow-xl shadow-slate-200/50 border border-slate-200 hover:border-blue-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Decorative Quote Mark */}
              <div className="absolute top-6 right-8 text-slate-100 font-serif text-8xl leading-none select-none pointer-events-none">
                "
              </div>

              <div className="relative z-10 grow">
                <p className={`text-slate-700 text-lg md:text-xl font-medium leading-relaxed italic mb-4 ${item.quote.length > 200 ? 'line-clamp-4' : ''}`}>
                  "{item.quote}"
                </p>
                {item.quote.length > 200 && (
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="text-orange-500 font-bold hover:text-orange-600 transition-colors text-sm uppercase tracking-wider mb-8 flex items-center gap-1"
                  >
                    Read more
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="relative z-10 pt-6 border-t border-slate-100 mt-auto flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-orange-100">
                  <Image
                    src={item.image}
                    alt={item.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-0.5">{item.author}</h3>
                  <p className="text-xs font-bold text-orange-500 uppercase tracking-wide mb-1">
                    {item.designation}
                  </p>
                  {item.organization && (
                    <p className="text-sm text-slate-500 font-medium">
                      {item.organization}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative bg-white rounded-md shadow-2xl max-w-3xl w-full p-8 md:p-12 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors p-2 bg-slate-100 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center gap-6 mb-8 border-b border-slate-100 pb-8">
              <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 border-4 border-orange-100 shadow-lg">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-1">{selectedItem.author}</h3>
                <p className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-1">
                  {selectedItem.designation}
                </p>
                {selectedItem.organization && (
                  <p className="text-base text-slate-500 font-medium">
                    {selectedItem.organization}
                  </p>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 text-slate-100 font-serif text-8xl leading-none select-none pointer-events-none z-0">
                "
              </div>
              <p className="relative z-10 text-slate-700 text-lg md:text-xl font-medium leading-relaxed italic">
                "{selectedItem.quote}"
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}




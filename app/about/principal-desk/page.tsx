import React from "react";
import Image from "next/image";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Principal's Desk | Chinmaya Vidyalaya",
  description: "Messages from the Principal and Vice Principal of Chinmaya Vidyalaya, Kollam.",
};

export default function PrincipalDeskPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-slate-900 selection:text-white">
      <TopBar />
      <Navbar />
      {/* Modern Out-of-the-Box Header */}
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-10 bg-slate-950 text-white overflow-hidden flex flex-col items-center justify-center">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950"></div>
        <div className="absolute top-0 w-full h-px bg-linear-to-r from-transparent via-slate-400 to-transparent opacity-20"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span className="text-sm font-medium tracking-wide text-slate-300 uppercase">Leadership</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-linear-to-b from-white to-slate-400">
            From the Principal's Desk
          </h1>

          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-slate-400 font-medium tracking-tight">
            Guiding lights of Chinmaya Vidyalaya, nurturing young minds with wisdom, compassion, and holistic education.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-8 space-y-12">

        {/* Principal Section */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0 relative">
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-end z-20">
            <div className="relative w-72 h-104 overflow-hidden shadow-2xl ring-8 ring-slate-50 transform transition-all hover:scale-105 hover:shadow-3xl duration-500 lg:-mr-8">
              <Image
                src="/mentors/principal.jpeg"
                alt="Principal NISHA S S"
                fill
                className="object-cover object-top transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 border border-white/20  pointer-events-none"></div>
            </div>
          </div>
          <div className="w-full lg:w-7/12 z-10">
            <div className="relative bg-[#1A457B] p-6 md:p-8 lg:pl-16 shadow-2xl shadow-blue-900/20 border border-blue-800  group hover:border-blue-700 transition-colors duration-300">

              <div className="relative z-10">
                <h2 className="text-3xl font-extrabold tracking-tight text-orange-400 mb-1">NISHA S S</h2>
                <h3 className="text-xs font-bold text-blue-300 mb-6 uppercase tracking-widest">Principal</h3>

                <div className="prose prose-base text-slate-100 font-medium leading-relaxed space-y-4">
                  <p className="font-bold text-white text-xl tracking-tight">Hari Om!</p>
                  <p>
                    Chinmaya Vidyalaya 'A School with a difference' set in the back drop of calm and serene atmosphere is highly conducive for the overall development of students. The cool breeze, twittering birds, blooming buds and the greenery brings amazing unfoldment in the tender hearts. This enchanting environment makes the children comfortable and focused.
                  </p>
                  <p>
                    We enhance the students holistic, mental and physical development with the latest technologies which is the need of the hour.
                  </p>
                  <p className="font-semibold text-white border-l-4 border-orange-400 pl-4 py-1">
                    May Gurudev's blessings shower on each one of us. Wishing all the students a novel and peaceful academic year.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 py-4">
          <div className="w-16 h-px bg-slate-200"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
          <div className="w-16 h-px bg-slate-200"></div>
        </div>

        {/* Vice Principal Section */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-0 relative">
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-start z-20">
            <div className="relative w-72 h-104 overflow-hidden shadow-2xl ring-8 ring-slate-50 transform transition-all hover:scale-105 hover:shadow-3xl duration-500 lg:-ml-8">
              <Image
                src="/mentors/vice principal.jpeg"
                alt="Vice Principal SUMUTHA S"
                fill
                className="object-cover object-top transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 border border-white/20 rounded-md pointer-events-none"></div>
            </div>
          </div>
          <div className="w-full lg:w-7/12 z-10">
            <div className="relative bg-[#1A457B] p-6 md:p-8 lg:pr-16 shadow-2xl shadow-blue-900/20 border border-blue-800  group hover:border-blue-700 transition-colors duration-300">

              <div className="relative z-10">
                <h2 className="text-3xl font-extrabold tracking-tight text-orange-400 mb-1">SUMUTHA S</h2>
                <h3 className="text-xs font-bold text-blue-300 mb-6 uppercase tracking-widest">Vice Principal</h3>

                <div className="prose prose-base text-slate-100 font-medium leading-relaxed space-y-4">
                  <p className="font-bold text-white text-xl tracking-tight">Hari Om!</p>
                  <p>
                    Chinmaya Vidyalaya, Kollam welcomes all the students, staff, parents and well wishers to the new academic session 2024-25. This session will be a mesmerizing one in which all the students can attain their inner unfoldment.
                  </p>
                  <p>
                    We focus on providing holistic education which enables children to climb up to their goal and snatch away their victory. Technological advancement in teaching learning process open an ocean of opportunities for the students. The Vidyalaya would continue to provide an inspiring ambience to its students and teacher to come up with their best.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      <Footer />
    </main>
  );
}





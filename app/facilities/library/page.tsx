import React from "react";
import { TenantPageShell } from "@/components/TenantPageShell";
import { requireActiveSchool } from "@/lib/data/get-active-school";

export default async function LibraryPage() {
  const school = await requireActiveSchool();

  return (
    <TenantPageShell school={school}>
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-10 bg-dark-surface text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/facilities/library.jpg"
            alt="Library background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="py-2 text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            Library
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight drop-shadow-md">
            &ldquo;Reading Maketh a Man full.&rdquo;
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-10">
        <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">A World of Knowledge</h2>
              <p>
                The Vidyalaya library at {school.name} fulfills this adage, serving as a hub of curiosity and learning.
              </p>
              <p>
                The library is updated every academic year and leads all the children to the path of reading. It serves as a quiet sanctuary for students to explore diverse genres, broaden their horizons, and cultivate a lifelong love for literature.
              </p>
            </div>
            <div className="relative rounded-md overflow-hidden shadow-2xl">
              <img
                src="/facilities/library.jpg"
                alt="Vidyalaya Library"
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>
    </TenantPageShell>
  );
}

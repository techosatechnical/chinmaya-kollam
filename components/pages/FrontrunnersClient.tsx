"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { PersonItem } from "@/lib/types/school";

interface FrontrunnersClientProps {
  schoolName: string;
  items: PersonItem[];
}

export function FrontrunnersClient({ schoolName, items }: FrontrunnersClientProps) {
  const [selectedItem, setSelectedItem] = useState<PersonItem | null>(null);

  return (
    <>
      <section className="relative pt-48 pb-12 md:pt-64 md:pb-20 bg-slate-950 text-white overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950" />
        <div className="absolute top-0 w-full h-px bg-linear-to-r from-transparent via-slate-400 to-transparent opacity-20" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-linear-to-b from-white to-slate-400">
            Our Frontrunners
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-slate-400 font-medium tracking-tight">
            Hear from our proud alumni who carry the light of {schoolName} into the world.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {items.length === 0 ? (
          <div className="bg-white rounded-md shadow-sm border border-slate-200 p-10 text-center text-slate-500">
            Alumni frontrunner stories for {schoolName} will be published soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {items.map((item) => {
              const quote = item.quote ?? "";
              return (
                <div
                  key={item.id}
                  className="relative bg-white p-8 md:p-10 rounded-md shadow-xl shadow-slate-200/50 border border-slate-200 hover:border-blue-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="absolute top-6 right-8 text-slate-100 font-serif text-8xl leading-none select-none pointer-events-none">
                    &ldquo;
                  </div>

                  <div className="relative z-10 grow">
                    <p
                      className={`text-slate-700 text-lg md:text-xl font-medium leading-relaxed italic mb-4 ${
                        quote.length > 200 ? "line-clamp-4" : ""
                      }`}
                    >
                      &ldquo;{quote}&rdquo;
                    </p>
                    {quote.length > 200 && (
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="text-orange-500 font-bold hover:text-orange-600 transition-colors text-sm uppercase tracking-wider mb-8 flex items-center gap-1 cursor-pointer"
                      >
                        Read more
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="relative z-10 pt-6 border-t border-slate-100 mt-auto flex items-center gap-4">
                    {item.image && (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-orange-100">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-0.5">{item.name}</h3>
                      <p className="text-xs font-bold text-orange-500 uppercase tracking-wide mb-1">
                        {item.role}
                      </p>
                      {item.organization && (
                        <p className="text-sm text-slate-500 font-medium">{item.organization}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative bg-white rounded-md shadow-2xl max-w-3xl w-full p-6 sm:p-8 md:p-12 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedItem(null)}
              aria-label="Close modal"
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors p-2 bg-slate-100 rounded-full cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center gap-6 mb-8 border-b border-slate-100 pb-8">
              {selectedItem.image && (
                <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 border-4 border-orange-100 shadow-lg">
                  <Image src={selectedItem.image} alt={selectedItem.name} fill className="object-cover" />
                </div>
              )}
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-1">{selectedItem.name}</h3>
                <p className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-1">
                  {selectedItem.role}
                </p>
                {selectedItem.organization && (
                  <p className="text-base text-slate-500 font-medium">{selectedItem.organization}</p>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 text-slate-100 font-serif text-8xl leading-none select-none pointer-events-none z-0">
                &ldquo;
              </div>
              <p className="relative z-10 text-slate-700 text-lg md:text-xl font-medium leading-relaxed italic">
                &ldquo;{selectedItem.quote}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { TenantPageShell } from "@/components/TenantPageShell";
import { requireActiveSchool } from "@/lib/data/get-active-school";

export async function generateMetadata(): Promise<Metadata> {
  const school = await requireActiveSchool();
  return {
    title: "Principal's Desk",
    description: `Messages from the Principal and Vice Principal of ${school.name}.`,
  };
}

export default async function PrincipalDeskPage() {
  const school = await requireActiveSchool();
  const messages = school.leadershipMessages;

  return (
    <TenantPageShell school={school}>
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-10 bg-slate-950 text-white overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950" />
        <div className="absolute top-0 w-full h-px bg-linear-to-r from-transparent via-slate-400 to-transparent opacity-20" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-sm font-medium tracking-wide text-slate-300 uppercase">
              Leadership
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-linear-to-b from-white to-slate-400">
            From the Principal&apos;s Desk
          </h1>

          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-slate-400 font-medium tracking-tight">
            Guiding lights of {school.name}, nurturing young minds with wisdom, compassion, and holistic education.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-8 space-y-12">
        {messages.length === 0 ? (
          <div className="bg-white rounded-md shadow-sm border border-slate-200 p-10 text-center text-slate-500">
            Leadership messages for {school.name} will be published soon.
          </div>
        ) : (
          messages.map((person, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <React.Fragment key={person.id}>
                {index > 0 && (
                  <div className="flex items-center justify-center gap-4 py-4">
                    <div className="w-16 h-px bg-slate-200" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <div className="w-16 h-px bg-slate-200" />
                  </div>
                )}
                <div
                  className={`flex flex-col ${
                    isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                  } items-center gap-8 lg:gap-0 relative`}
                >
                  <div
                    className={`w-full lg:w-5/12 flex justify-center ${
                      isReversed ? "lg:justify-start" : "lg:justify-end"
                    } z-20`}
                  >
                    <div
                      className={`relative w-72 h-104 overflow-hidden shadow-2xl ring-8 ring-slate-50 transform transition-all hover:scale-105 hover:shadow-3xl duration-500 ${
                        isReversed ? "lg:-ml-8" : "lg:-mr-8"
                      }`}
                    >
                      <Image
                        src={person.image}
                        alt={`${person.role} ${person.name}`}
                        fill
                        className="object-cover object-top transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 border border-white/20 pointer-events-none" />
                    </div>
                  </div>
                  <div className="w-full lg:w-7/12 z-10">
                    <div
                      className={`relative bg-brand-blue-deep p-6 md:p-8 ${
                        isReversed ? "lg:pr-16" : "lg:pl-16"
                      } shadow-2xl shadow-blue-900/20 border border-blue-800 group hover:border-blue-700 transition-colors duration-300`}
                    >
                      <div className="relative z-10">
                        <h2 className="text-3xl font-extrabold tracking-tight text-orange-400 mb-1">
                          {person.name.replace(/^Mrs\s+/i, "").toUpperCase()}
                        </h2>
                        <h3 className="text-xs font-bold text-blue-300 mb-6 uppercase tracking-widest">
                          {person.role}
                        </h3>

                        <div className="prose prose-base text-slate-100 font-medium leading-relaxed space-y-4">
                          {person.greeting && (
                            <p className="font-bold text-white text-xl tracking-tight">
                              {person.greeting}
                            </p>
                          )}
                          {person.paragraphs.map((p, idx) => (
                            <p key={idx}>{p}</p>
                          ))}
                          {person.highlightQuote && (
                            <p className="font-semibold text-white border-l-4 border-orange-400 pl-4 py-1">
                              {person.highlightQuote}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })
        )}
      </section>
    </TenantPageShell>
  );
}

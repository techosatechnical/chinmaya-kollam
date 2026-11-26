import React from "react";
import { TenantPageShell } from "@/components/TenantPageShell";
import { requireActiveSchool } from "@/lib/data/get-active-school";
import { getSchoolPageContent } from "@/lib/data/school-repository";

export default async function SportsTeamPage() {
  const school = await requireActiveSchool();
  const page = await getSchoolPageContent(school.id, "activities-sports");
  const paragraphs = (page?.data?.paragraphs as string[] | undefined) ?? [
    `Our Vidyalaya at ${school.name} moulds excellent sportspersons with strong teams marking their presence in inter-school matches.`,
    "We believe that physical education is a vital part of holistic development, teaching our students the value of discipline, resilience, and teamwork.",
  ];

  return (
    <TenantPageShell school={school}>
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-10 bg-dark-surface text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src={page?.heroImage || "https://images.stockcake.com/public/b/2/b/b2b36ee9-429a-485b-bd61-7f6531cc6fee_large/sunset-soccer-team-stockcake.jpg"}
            alt="Sports background"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="py-2 text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            {page?.title || "Sports Team"}
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight drop-shadow-md">
            {page?.subtitle || "Moulding excellent sportspersons through dedication and teamwork."}
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-10">
        <div className="bg-white rounded-md shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Athletic Excellence</h2>
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop"
                alt="Football"
                className="w-full h-64 object-cover rounded-md shadow-lg hover:scale-105 transition-transform duration-500"
              />
              <img
                src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1000&auto=format&fit=crop"
                alt="Cricket"
                className="w-full h-64 object-cover rounded-md shadow-lg hover:scale-105 transition-transform duration-500 mt-8"
              />
            </div>
          </div>
        </div>
      </section>
    </TenantPageShell>
  );
}

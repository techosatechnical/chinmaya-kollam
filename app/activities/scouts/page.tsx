import React from "react";
import { TenantPageShell } from "@/components/TenantPageShell";
import { requireActiveSchool } from "@/lib/data/get-active-school";
import { getSchoolPageContent } from "@/lib/data/school-repository";

export default async function ScoutsGuidesPage() {
  const school = await requireActiveSchool();
  const page = await getSchoolPageContent(school.id, "activities-scouts");
  const paragraphs = (page?.data?.paragraphs as string[] | undefined) ?? [
    `The Scout and Guide unit at ${school.name} functions with energy, discipline, and community spirit.`,
    "Students participate in camps, leadership activities, and national service initiatives.",
  ];

  return (
    <TenantPageShell school={school}>
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-10 bg-dark-surface text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src={page?.heroImage || "https://twss.edu.in/wp-content/uploads/2024/11/Scout-Guides-1.webp"}
            alt="Scouts background"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="py-2 text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            {page?.title || "Scouts & Guides"}
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight drop-shadow-md">
            {page?.subtitle || "Building character, leadership, and a sense of service to the nation."}
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-10">
        <div className="bg-white rounded-md shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1000&auto=format&fit=crop"
                alt="Camping"
                className="w-full h-64 object-cover rounded-md shadow-lg hover:scale-105 transition-transform duration-500 mb-8"
              />
              <img
                src="https://jsspshsr.com/wp-content/uploads/2022/03/DSCN0059-scaled.jpg"
                alt="Scout activities"
                className="w-full h-64 object-cover rounded-md shadow-lg hover:scale-105 transition-transform duration-500 mt-8"
              />
            </div>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Be Prepared</h2>
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </TenantPageShell>
  );
}

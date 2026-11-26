import React from "react";
import { TenantPageShell } from "@/components/TenantPageShell";
import { requireActiveSchool } from "@/lib/data/get-active-school";
import { getSchoolPageContent } from "@/lib/data/school-repository";

export default async function ChinmayaBlossomsPage() {
  const school = await requireActiveSchool();
  const page = await getSchoolPageContent(school.id, "chinmaya-blossoms");
  const data = (page?.data ?? {}) as {
    heading?: string;
    paragraphs?: string[];
    image?: string;
  };

  return (
    <TenantPageShell school={school}>
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-10 bg-dark-surface text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src={page?.heroImage || "/image/chinmaya blossom.jpeg"}
            alt="Chinmaya Blossoms background"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="py-2 text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            {page?.title || "Chinmaya Blossoms"}
          </h1>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 lg:px-8 py-10">
        {data.paragraphs && data.paragraphs.length > 0 ? (
          <div className="bg-white rounded-md shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  {data.heading || "Initiating Tiny Buds"}
                </h2>
                {data.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {data.image && (
                <div className="relative group rounded-md overflow-hidden shadow-2xl">
                  <img
                    src={data.image}
                    alt="Chinmaya Blossom Kids"
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-md shadow-sm border border-slate-200 p-12 text-center text-slate-500">
            Early childhood program details for {school.name} will be published soon.
          </div>
        )}
      </section>
    </TenantPageShell>
  );
}

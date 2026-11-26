import React from "react";
import { TenantPageShell } from "@/components/TenantPageShell";
import { ImageLightboxGrid } from "@/components/pages/ImageLightboxGrid";
import { requireActiveSchool } from "@/lib/data/get-active-school";
import { getSchoolPageContent } from "@/lib/data/school-repository";

export default async function AiTeachersPage() {
  const school = await requireActiveSchool();
  const page = await getSchoolPageContent(school.id, "innovation-ai-teachers");
  const data = (page?.data ?? {}) as {
    heading?: string;
    description?: string;
    images?: Array<{ id: string; src: string; title: string }>;
  };

  return (
    <TenantPageShell school={school}>
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-10 bg-dark-surface text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src={page?.heroImage || "/image/ai trained teachers.jpeg"}
            alt="AI Trained Teachers background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-slate-700 bg-slate-900/50 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium tracking-wide text-white uppercase">
              {page?.badge || "Innovation Hub"}
            </span>
          </div>

          <h1 className="py-2 text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            {page?.title || "AI Trained Teachers"}
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight drop-shadow-md">
            {page?.subtitle ||
              `Educators at ${school.name} equipped with modern AI tools for a transformative learning experience.`}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {data.description && (
          <div className="bg-white rounded-md shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12 mb-10 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              {data.heading || "Empowering Educators"}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">{data.description}</p>
          </div>
        )}

        <ImageLightboxGrid
          items={data.images ?? []}
          variant="grid-3"
          aspectClass="aspect-4/3"
          emptyMessage={`AI Trained Teachers highlights for ${school.name} will be published soon.`}
        />
      </section>
    </TenantPageShell>
  );
}

import React from "react";
import { TenantPageShell } from "@/components/TenantPageShell";
import { ImageLightboxGrid } from "@/components/pages/ImageLightboxGrid";
import { requireActiveSchool } from "@/lib/data/get-active-school";
import { getSchoolAccolades } from "@/lib/data/school-repository";

export default async function AcademicResultsPage() {
  const school = await requireActiveSchool();
  const results = await getSchoolAccolades(school.id, "academic-result");

  return (
    <TenantPageShell school={school}>
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-10 bg-dark-surface text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="py-2 text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            Academic Results
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight drop-shadow-md">
            Celebrating the outstanding performance and hard work of {school.name} students.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <ImageLightboxGrid
          items={results.map((r) => ({ id: r.id, src: r.imageUrl, title: r.title }))}
          variant="grid-3"
          aspectClass="h-auto max-h-150 object-contain"
          emptyMessage={`Academic results for ${school.name} will be published soon.`}
        />
      </section>
    </TenantPageShell>
  );
}

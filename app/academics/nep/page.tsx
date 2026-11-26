import React from "react";
import { TenantPageShell } from "@/components/TenantPageShell";
import { ImageLightboxGrid } from "@/components/pages/ImageLightboxGrid";
import { requireActiveSchool } from "@/lib/data/get-active-school";
import { getSchoolPageContent } from "@/lib/data/school-repository";

export default async function NEPPage() {
  const school = await requireActiveSchool();
  const page = await getSchoolPageContent(school.id, "nep");
  const items = ((page?.data?.items as Array<{ id: string; src: string; alt: string }>) ?? []).map(
    (item) => ({
      id: item.id,
      src: item.src,
      title: item.alt,
    })
  );

  return (
    <TenantPageShell school={school}>
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-10 bg-dark-surface text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src={page?.heroImage || "/image/NEP1.jpeg"}
            alt="NEP background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="py-2 text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            {page?.title || "National Education Policy"}
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight drop-shadow-md">
            {page?.subtitle || "Innovating the future of education with modern teaching practices."}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <ImageLightboxGrid
          items={items}
          aspectClass="aspect-[4/3]"
          emptyMessage={`NEP highlights for ${school.name} will be published soon.`}
        />
      </section>
    </TenantPageShell>
  );
}

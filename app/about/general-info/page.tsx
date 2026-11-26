import React from "react";
import type { Metadata } from "next";
import { TenantPageShell } from "@/components/TenantPageShell";
import { requireActiveSchool } from "@/lib/data/get-active-school";
import { getSchoolDocuments } from "@/lib/data/school-repository";

export async function generateMetadata(): Promise<Metadata> {
  const school = await requireActiveSchool();
  return {
    title: "General Information",
    description: `General information and guidelines for ${school.name}.`,
  };
}

export default async function GeneralInfoPage() {
  const school = await requireActiveSchool();
  const docs = await getSchoolDocuments(school.id, "general-info");
  const primaryDoc = docs[0];

  return (
    <TenantPageShell school={school}>
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-10 bg-slate-950 text-white overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950" />
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-sm font-medium tracking-wide text-slate-300 uppercase">
              Information
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            General Information
          </h1>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 lg:px-8 py-8">
        {primaryDoc && primaryDoc.fileUrl !== "#" ? (
          <>
            <div className="bg-white p-2 rounded-md shadow-xl shadow-slate-200/50 border border-slate-200">
              <iframe
                src={primaryDoc.fileUrl}
                title={primaryDoc.title}
                className="w-full h-[75vh] min-h-[600px] rounded-md border border-slate-100"
                style={{ backgroundColor: "#e2e8f0" }}
              />
            </div>

            <div className="mt-8 flex justify-center lg:hidden">
              <a
                href={primaryDoc.fileUrl}
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors font-medium shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </a>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-md shadow-sm border border-slate-200 p-12 text-center text-slate-500">
            General information document for {school.name} will be available soon.
          </div>
        )}
      </section>
    </TenantPageShell>
  );
}

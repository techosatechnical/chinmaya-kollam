import React from "react";
import { TenantPageShell } from "@/components/TenantPageShell";
import { requireActiveSchool } from "@/lib/data/get-active-school";
import { getSchoolDocuments } from "@/lib/data/school-repository";

export default async function SchoolSafetyPolicyPage() {
  const school = await requireActiveSchool();
  const docs = await getSchoolDocuments(school.id, "safety-policy");
  const primaryDoc = docs[0];

  return (
    <TenantPageShell school={school}>
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-10 bg-dark-surface text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2000&auto=format&fit=crop"
            alt="School Safety Policy background"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="py-2 text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            School Safety Policy
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight drop-shadow-md">
            Our commitment at {school.name} to ensuring a safe, secure, and nurturing environment.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-10">
        {primaryDoc && primaryDoc.fileUrl !== "#" ? (
          <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 p-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3 text-white">
                <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h2 className="text-lg font-semibold tracking-wide text-white">{primaryDoc.title}</h2>
              </div>
              <a
                href={primaryDoc.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-md transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </a>
            </div>

            <div className="w-full h-[800px] bg-slate-100">
              <object data={primaryDoc.fileUrl} type="application/pdf" className="w-full h-full">
                <iframe
                  src={primaryDoc.fileUrl}
                  className="w-full h-full border-none"
                  title={primaryDoc.title}
                />
              </object>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-md shadow-sm border border-slate-200 p-12 text-center text-slate-500">
            School safety policy document for {school.name} will be published soon.
          </div>
        )}
      </section>
    </TenantPageShell>
  );
}
